import React from "react";
import { View, Text, StyleSheet, Image, ImageBackground,StatusBar } from 'react-native';
import { Button } from "react-native-paper";
import Title from "./Title";
import LinearGradient from "react-native-linear-gradient";

const Home = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri: "https://as2.ftcdn.net/v2/jpg/02/24/12/21/1000_F_224122194_AR2rAEMPllhT2IV4O0K3BLuIFXgPIu2J.jpg" }}
      style={styles.backgroundImage}
    >
        <StatusBar hidden/>
      <View style={styles.overlay}>
        <Text style={styles.text}>Welcome To</Text>
        <Title />
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={['blue', 'blue', 'white']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Button onPress={() => {
              navigation.navigate('Signup', {});
            }}>
              <Text style={styles.buttonText}>Start</Text>
            </Button>
          </LinearGradient>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Home;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    color:'white'
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  button: {
    borderRadius: 10,
    height: 50,
    width: 190,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});
