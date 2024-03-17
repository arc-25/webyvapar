import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RetrieveDataScreen = (props) => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);

  const fetchData = async () => {
    try {
      if (!props.route.params.token) {
        throw new Error("Token not found");
      }

      const response = await fetch("https://test.webyaparsolutions.com/data", {
        method: "GET",
        headers: {
          Authorization: props.route.params.token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const responseData = await response.json();
      const formattedData = responseData.data.map((item) => ({
        ...item,
        createdAt: formatDateString(item.createdAt), // Format the createdAt date
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem("token");
        setToken(userToken);
      } catch (error) {
        console.log("Error fetching token:", error);
      }
    };

    fetchToken().then(() => {
      fetchData();
    });
  }, []);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.createdAt}>{item.createdAt}</Text>
      <Image
        source={{ uri: "https://test.webyaparsolutions.com" + item.file }}
        style={styles.image}
      />
    </View>
  );

  return (
    <ImageBackground
      source={require("../../assets/backg.jpg")}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.heading}>Retrieve Data</Text>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  createdAt: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default RetrieveDataScreen;
