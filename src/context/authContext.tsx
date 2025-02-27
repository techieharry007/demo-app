import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";
import { storage } from "../utils/helper";
import httpClient from "../networking/httpClient";
import { httpRoutes } from "../utils/constants";

// Define TypeScript interfaces
interface AuthState {
  user: string | null;
  token: string | null;
  isLoading: boolean;
}

type AuthAction =
  | { type: "SIGN_IN"; payload: { token: string; user: string } }
  | { type: "SIGN_OUT" };

// Define AuthContext type
interface AuthContextType {
  user: string | null;
  token: string | null;
  isLoading: boolean;
  signIn: (user: any,type: boolean) => void;
  signOut: () => void;
}

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isLoading: false,
      };
    case "SIGN_OUT":
      return { ...state, user: null, token: null, isLoading: false };
    default:
      return state;
  }
};

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    isLoading: true,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = storage.getString("token");
        const user = storage.getString("user");
        console.log("TOKEN--------",token,'user',user)

        if (token && user) {
          dispatch({ type: "SIGN_IN", payload: {token:token, user:user } });
        } else {
          dispatch({ type: "SIGN_OUT" });
        }
      } catch (error) {
        console.error("Error retrieving user token", error);
      }
    };

    bootstrapAsync();
  }, []);

  // Sign-in function
  const signIn = async (user: any, type: boolean):Promise<any> => {
    try {
      const route = type ? httpRoutes.signup : httpRoutes.login;
      const payload = type
        ? { name: user.name, email: user.email, password: user.password }
        : { email: user.email, password: user.password };
      const reponse = await httpClient.post(route,payload);
      console.log("reponse.datareponse.data",reponse.data?.data)
      if (reponse.data?.data?.token) {
        storage.set("token", reponse.data?.data?.token);
        storage.set("user", reponse.data?.data?.name);
        dispatch({
          type: "SIGN_IN",
          payload: { token: reponse.data?.data?.token, user: "Harish" },
        });
      }
      return 'signup'
    } catch (err) {
      return err
    }
  };

  // Sign-out function
  const signOut = () => {
    storage.delete("token");
    storage.delete("user");
    dispatch({ type: "SIGN_OUT" });
  };

  const authContextValue: AuthContextType = {
    user: state.user,
    token: state.token,
    isLoading: state.isLoading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access the auth context
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
