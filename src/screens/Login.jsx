import React, { useState, useContext  } from "react";
import axios from "axios";
import { useFonts } from "expo-font";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {RutaContext} from "./RutaContext";

const Login = ({ onLogin }) => {
  const { ruta, setRuta } = useContext(RutaContext);
  const [password, setPass] = useState("");
  const [fontsLoaded] = useFonts({
    ProductBold: require("../assets/fonts/ProductBold.ttf"),
    ProductRegular: require("../assets/fonts/ProductRegular.ttf"),
  });
  if (!fontsLoaded) return null;
  const handleRutaChange = (texto) => {
    setRuta(texto);
  };

  const handlePassChange = (texto) => {
    setPass(texto);
  };

  const handleSubmit = () => {
    if (ruta === "" || password === "") {
      alert("Por favor, completa todos los campos");
    } else {
      axios
        .post("https://onroute.fly.dev/userLogin", { ruta, password })
        .then((response) => {
          alert(response.data);
        
          onLogin();
        })
        .catch((error) => {
         alert(error.response.data);
       
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>OnRoute</Text>
      </View>

      {/* <Text style={[styles.label, styles.ruta]}>RUTA</Text> */}
      <TextInput
        placeholder="Ruta"
        value={ruta}
        onChangeText={handleRutaChange}
        style={styles.input}
        required
      />

      {/* <Text style={[styles.label, styles.pass]}>CONTRASEÑA</Text> */}
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={handlePassChange}
        style={styles.input}
        secureTextEntry={true}
        required
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link}>
        <Text style={styles.textLink}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 40,
    marginBottom: 70,
  },
  title: {
    marginTop: 100,
    fontSize: 50,
    color: "#023047",
    marginBottom: 10,
    fontFamily: "ProductBold",
  },
  label: {
    fontSize: 22,
    marginBottom: 5,
    fontWeight: 700,
    lineHeight: 30,
    color: "black",
  },
  ruta: {
    marginTop: 50,
    marginRight: 150,
    width: 164,
    height: 41,
  },
  pass: {
    marginTop: 5,
    marginRight: 120,
    width: 200,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
    borderRadius: 1,
    padding: 10,
    marginBottom: 20,
    width: "100%",
    fontSize: 20,
    color: "black",
    fontFamily: "ProductRegular",
  },
  button: {
    backgroundColor: "#003566",
    width: "100%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: 500,
    fontFamily: "ProductRegular",
  },
  link: {
    marginTop: 30,
  },
  textLink: {
    color: "#000",
    fontFamily: "ProductRegular",
    fontSize: 20,
  },
});

export default Login;
