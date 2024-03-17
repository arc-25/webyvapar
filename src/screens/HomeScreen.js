import React, { useEffect, useState } from "react";
import { View, Text, Button, ImageBackground, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem("token");
        setToken(userToken);
      } catch (error) {
        console.log("Error fetching token:", error);
      }
    };
    fetchToken();
  }, []);


  const handleSubmitForm = () => {
    navigation.navigate("Submit Form");
  };

  const handleShowResults = () => {
    navigation.navigate("Show Results", {
      token: token,
    });
  };

  return (
    <ImageBackground
      source={require("../../assets/homebg.jpg")}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome to My App</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Submit Form"
            onPress={handleSubmitForm}
            color="#4CAF50"

          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Show Results"
            onPress={handleShowResults}
            color="#FFC107"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
    justifyContent: "center",
  },
  heading: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
    marginBottom: '20%',
  },
  buttonContainer: {
    marginVertical: 10,
    width: "70%",
  },
});

export default HomeScreen;
