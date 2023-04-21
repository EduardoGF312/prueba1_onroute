import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { RutaContext } from "./RutaContext";

const ScanCard = ({ scan, navigation }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleEditPress = (event) => {
    event.stopPropagation();
    navigation.navigate("EditSituacion", { scan: scan });
  };

  return (
    <View style={[styles.scanCard, expanded && styles.expandedCard]}>
      <TouchableWithoutFeedback onPress={toggleExpand}>
        <View style={{ flex: 1 }}>
          <Text style={styles.scanName}>{scan.situacion}</Text>
          <Text style={styles.scanDate}>{scan.fecha}</Text>
          {expanded && <Text style={styles.scanInfo}>{scan.descripcion}</Text>}
        </View>
      </TouchableWithoutFeedback>
      {expanded && (
        <View style={styles.editIconContainer}>
          <TouchableWithoutFeedback onPress={handleEditPress}>
            <FontAwesome name="edit" size={25} color="#ef5b5b"/>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
};

const Escaneos = ({ navigation }) => {
  const [situaciones, setSituaciones] = useState([]);
  const { ruta, setRuta, newSituationAdded, setNewSituationAdded } = useContext(RutaContext);

  useEffect(() => {
    const obtenerSituaciones = async () => {
      try {
        const response = await axios.get(
          `https://onroute.fly.dev/situaciones?ruta=${ruta}`
        )
        setSituaciones(response.data);
      } catch (error) {
        console.error("Error al obtener situaciones:", error);
      }
    }

    obtenerSituaciones();
    setNewSituationAdded(false);
  }, [ruta, newSituationAdded]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reportes Registrados</Text>
      <View style={styles.scanList}>
        {situaciones.map((scan, index) => (
          <ScanCard key={index} scan={scan} navigation={navigation} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scanList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  scanCard: {
    width: "47%",
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 10,
    borderColor: "#ef5b5b",
    borderEndWidth: 2,
    borderBottomWidth: 1,
  },
  scanName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#36311f",
    paddingTop: 10,
  },
  scanDate: {
    fontSize: 16,
    color: "#888",
  },
  expandedCard: {
    width: "97%",
    height: 140,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 10,
    borderColor: "#ef5b5b",
    borderEndWidth: 10,
    borderBottomWidth: 1,
  },
  expandedName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#003566",

  },
  expandedDate: {
    fontSize: 20,
    color: "#888",
    marginBottom: 20,
  },
  scanInfo: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  // Agrega este nuevo estilo
  editIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

});

export default Escaneos;
