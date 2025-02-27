import React, { useState, useRef } from "react";
import { View, StyleSheet, Animated, Alert } from "react-native";
import { TextInput, Button, Text, HelperText, useTheme } from "react-native-paper";
import { useAuth } from "../context/authContext";
import { colors } from "../assets/colors";

const SignupScreen = () => {
  const theme = useTheme();
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  // Animation setup
  const formHeight = useRef(new Animated.Value(isSignup ? 56 : 0)).current;

  const {signIn}=useAuth()

  const toggleForm = () => {
    Animated.timing(formHeight, {
      toValue: isSignup ? 0 : 56,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsSignup(!isSignup);
  };

  const isEmailValid = (email:string) => /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = (password:string) => password.length >= 6;
  const isNameValid = (name:string) => name.length > 0;

  const handleAuth = async() => {
    if (isSignup && !isNameValid(name)) {
      alert("Please enter your name.");
      return;
    }
    if (!isEmailValid(email)) {
      alert("Enter a valid email.");
      return;
    }
    if (!isPasswordValid(password)) {
      alert("Password must be at least 6 characters.");
      return;
    }
    let params=isSignup?{name:name,password:password,email:email}:{password:password,email:email}
    const response=await signIn(params,isSignup)
    console.log("responseresponse-------",response)
    if(response==='singup')
    {
      Alert.alert('Signup success')
      setIsSignup(false)
      setEmail('')
      setPassword('')
      setName('')
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignup ? "Sign Up" : "Login"}</Text>

      {/* Animated Name Field */}
      <Animated.View style={{ height: formHeight, overflow: "hidden" }}>
        {isSignup && (
          <View style={styles.inputContainer}>
            <TextInput
              label="Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
              error={!isNameValid(name) && name.length > 0}
            />
            {!isNameValid(name) && name.length > 0 && (
              <HelperText type="error" visible style={styles.errorText}>
                Name is required
              </HelperText>
            )}
          </View>
        )}
      </Animated.View>

      <View style={styles.inputContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
          error={email.length > 0 && !isEmailValid(email)}
        />
        {email.length > 0 && !isEmailValid(email) && (
          <HelperText type="error" visible style={styles.errorText}>
            Enter a valid email address
          </HelperText>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry={secureText}
          right={
            <TextInput.Icon 
              icon={secureText ? "eye-off" : "eye"} 
              onPress={() => setSecureText(!secureText)} 
            />
          }
          style={styles.input}
          error={password.length > 0 && !isPasswordValid(password)}
        />
        {password.length > 0 && !isPasswordValid(password) && (
          <HelperText type="error" visible style={styles.errorText}>
            Password must be at least 6 characters
          </HelperText>
        )}
      </View>

      <Button mode="contained" onPress={handleAuth} style={styles.authButton}>
        {isSignup ? "Sign Up" : "Login"}
      </Button>

      <Button 
        mode="outlined"
        onPress={toggleForm}
        style={[
          styles.toggleButton,
          { borderColor:colors.primary, backgroundColor:colors.white }
        ]}
        labelStyle={{ color:colors.primary }}
      >
        {isSignup ? "Switch to Login" : "Switch to Signup"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  
  input: {
    marginBottom: 5
    },
  errorText: {
    position: "absolute",
    bottom: -18,
    left: 0,
  },
  authButton: {
    marginTop: 10,
    paddingVertical: 5,
    backgroundColor:colors.primary
  },
  toggleButton: {
    marginTop: 10,
    paddingVertical: 5,
    borderWidth: 0.5,
  },
});

export default SignupScreen;
