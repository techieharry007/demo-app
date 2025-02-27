declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}
declare global {
  interface AuthState {
    user: string | null;
    isLoading: boolean;
    token:string | null;
  }
  
  interface AuthAction {
    type: 'SIGN_IN' | 'SIGN_OUT';
    payload?: {token: string,name:string};
  }

  interface AuthContextType {
    user: string | null;
    isLoading: boolean;
    token:string | null;
  }
  interface DataItem {
    _id: string;
    title: string;
    description: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
  }
}
export {};

