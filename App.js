import { Pressable, StyleSheet, Text, View, Button, Image } from 'react-native';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import { Quicksand_600SemiBold } from '@expo-google-fonts/quicksand';
import * as ImagePicker from 'expo-image-picker';

/* 

SOURCES:
- https://icanhazdadjoke.com/api for the API docs
- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch for using headers
- https://blog.logrocket.com/adding-custom-fonts-react-native/ for loading custom fonts
- https://docs.expo.dev/versions/latest/sdk/imagepicker/ for ImagePicker docs

*/

export default function App() {
  
  const [activeJoke, setActiveJoke] = useState("I dont have a joke in mind right now...");
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(null);

  const [fontsLoaded] = useFonts({
    Quicksand_600SemiBold,
  });

  const fetchAdvice = async () => {
    
    try {
      const jokeRequest = await fetch(`https://icanhazdadjoke.com/`, { headers: {Accept:  `application/json`} }); // add search?term=hipster
      const data = await jokeRequest.json();

      if (jokeRequest.ok) {
        setActiveJoke(data.joke);
      } else {
        setErrorMessage("Unable to fetch joke.");
      }

    }
    catch (err) {
      console.log(err);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  return (
    <View style={styles.container}>

      <View style={styles.jokeContainer}>
        <Text style={styles.jokeText}>{activeJoke}</Text>
      </View>

      {image && <Image source={{ uri: image }} style={styles.image} />}
      
      <Pressable style={styles.button} onPress={fetchAdvice}>
        <Text style={styles.buttonText}>
          Click for Joke 
        </Text>
      </Pressable>  

      <View>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jokeText : {
    fontSize: 16,
    fontFamily: "Quicksand_600SemiBold",
    textAlign: 'center',
  },
  jokeContainer: {
    width: '75%',
    borderColor: "#d9d9d9",
    padding: 32,
    borderWidth: 3,
    borderRadius: 50,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#363636',
    padding: 14,
    borderRadius: 50,
    marginBottom: 16,
  },
  buttonText : {
    fontSize: 14,
    fontFamily: "Quicksand_600SemiBold",
    textAlign: 'center',
    color: 'white',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
});
