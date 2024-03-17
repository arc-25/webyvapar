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

const UserSignupPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const makeSignupRequest = async () => {
    try {
      const response = await fetch(
        "https://test.webyaparsolutions.com/auth/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            name,
            password,
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        Alert.alert("Success", responseData.message);
        // You may navigate to another page or perform any action upon successful signup
      } else {
        Alert.alert("Error", responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  const handleSignup = () => {
    if (!email || !name || !password) {
      Alert.alert("Values missing", "Please fill in all fields.");
      return;
    }

    makeSignupRequest();
  };

  return (
    <ImageBackground
      source={require("../../assets/backg.jpg")} // Adjust the path and filename as needed
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.subHeading}>Let's get started..</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text
              style={styles.loginLink}
              onPress={() => navigation.navigate("Login")}>
              Login instead
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
  welcomeText: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  subHeading: {
    fontSize: 15,
    alignSelf: "center",
    marginBottom: "25%",
    color: "#fff",
  },
  input: {
    width: "80%",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 5,
  },
  button: {
    width: "80%",
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
  loginContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
  },
  loginLink: {
    color: "cyan",
    fontWeight: "bold",
  },
});

export default UserSignupPage;
