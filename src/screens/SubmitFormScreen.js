import React, { useState , useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SubmitFormScreen = () => {
  const navigation = useNavigation();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setImage] = useState("");
  const [imageClicked, setImageClicked] = useState(false); // State to track if image is clicked
  const [token, setToken] = useState(null); // State to store token

  // Fetch token from AsyncStorage on component mount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem("token");
        setToken(userToken);
        console.log("fetched user token",userToken)
      } catch (error) {
        console.log("Error fetching token:", error);
      }
    };
    fetchToken();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!latitude || !longitude || !image) {
        throw new Error("Values missing");
      }

      if (!token) {
        throw new Error("Token not found");
      }

      const formData = new FormData();
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("file", {
        uri: image.uri,
        name: "photo.jpg",
        type: "image/jpeg", // Assuming the image is JPEG format, you may need to adjust this based on the image type
      });

      const response = await fetch("https://test.webyaparsolutions.com/form", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("here")

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Data registered successfully
      alert("Data registered");
    } catch (error) {
      // Handle errors\
      console.log(error)
      alert(error.message);
    }
  };



  // Function to handle image picker
  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result)
      setImage(result.assets[0]);
      setImageClicked(true); // Set imageClicked to true when an image is selected
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/homebg.jpg")} // Change the path to your background image
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.heading}>Submit Form Data</Text>
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          value={latitude}
          onChangeText={setLatitude}
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          value={longitude}
          onChangeText={setLongitude}
        />
        <Button
          title={image ? "Change Picture" : "Take Picture"} // Change button text based on whether image is present
          onPress={takePicture} // Call takePicture function when the button is pressed
          color="#FFC107" // Yellow color for the button
        />
        {imageClicked && ( // Render image only if it is clicked
          <Image source={{ uri: image.uri }} style={styles.image} />
        )}
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
          {/* Green color for the button */}
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  input: {
    width: "80%",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
  },
  buttonContainer: {
    width: "80%",
    marginTop: 20,
  },
  image: {
    marginTop: 10,
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
});

export default SubmitFormScreen;

