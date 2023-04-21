import { Picker } from "@react-native-picker/picker";
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RutaContext } from "./RutaContext";
import axios from "axios";
import { useRoute } from '@react-navigation/native'

const EditSituacion = () => {
  const route = useRoute();
  const { scan } = route.params;

  const [situation, setSituation] = useState(scan.situacion);
  const [description, setDescription] = useState(scan.descripcion);

  const [date, setDate] = useState(scan ? new Date(scan.fecha) : new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState(scan.fecha);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "Android");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + "/" + (tempDate.getMonth(), 1) + "/" + tempDate.getFullYear();
    let fTime =
      "Hours: " + tempDate.getHours() + "| Minutes: " + tempDate.getMinutes();
    setText(fDate + "\n" + fTime);
    console.log(fDate + "(" + fTime + ")");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const sendFormData = () => {
    if (!situation || !description || !date) {
      alert("Por favor, completa todos los campos");
      return;
    }

    const formData = {
      situacion: situation,
      descripcion: description,
      fecha: date,
    };

    axios
      .put(`https://onroute.fly.dev/situaciones/${scan._id}`, formData)
      .then((response) => {
        console.log(response);
        alert('Situacion modificada');
        setNewSituationAdded(true);
      })
      .catch((error) => {
        console.log(error);
        alert('Error al modificar la situacion');
      });

  };

  const handleSubmit = () => {
    sendFormData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Situacion:</Text>
          <View style={styles.pickerContainer}>
            <TextInput
              style={styles.textInput}
              value={situation}
              onChangeText={(value) => setSituation(value)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Descripcion:</Text>
          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={4}
            value={description}
            onChangeText={(value) => setDescription(value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{text}</Text>
          <Text style={styles.label}>Date:</Text>
          {/* Fecha ---------------------------------------------------*/}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => showMode("date")}
          >
            <Text style={styles.submitButtonText}>Fecha</Text>
          </TouchableOpacity>
          {/* Hora ------------------------------------------------*/}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => showMode("time")}
          >
            <Text style={styles.submitButtonText}>Hora</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <Text>{scan._id}</Text>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EditSituacion

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#003566",
    padding: 16,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  form: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    textAlignVertical: "top",

  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#003566",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  datepicker: {
    width: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});