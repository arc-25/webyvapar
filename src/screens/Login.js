import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserLoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const makeLoginRequest = async () => {
    try {
      const response = await fetch(
        "https://test.webyaparsolutions.com/auth/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        // Save token to local storage
        await AsyncStorage.setItem("token", responseData.token);
        // Navigate to home screen
        navigation.navigate("Home");
        Alert.alert("Success", responseData.message);
        // You may navigate to another page or perform any action upon successful login
      } else {
        Alert.alert("Error", responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Values missing", "Please fill in all fields.");
      return;
    }

    makeLoginRequest();
  };

  return (
    <ImageBackground
      source={require("../../assets/backg.jpg")} // Adjust the path and filename as needed
      style={styles.background}>
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Don't have an account?{" "}
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate("SignUp")}>
              Register
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeContainer: {
    flex: 0.2,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  welcomeText: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
    color: "#fff",
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 5,
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    color: "#fff",
  },
  registerLink: {
    color: "cyan",
    fontWeight: "bold",
  },
});

export default UserLoginPage;
