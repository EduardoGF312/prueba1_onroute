import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Mapa() {

  const [origin, setOrigin] = React.useState({
    latitude: 33.640411,
    longitude: -84.419853,
  });

  React.useEffect(() => {
    getLocationPermission();
  }, [])
  async function getLocationPermission() {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    setOrigin(current);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        <Marker
          coordinate={origin}
        />
      </MapView>
    </View>
  );
}

Mapa.navigationOptions = {
  drawerLabel: 'Mapa',
  drawerIcon: () => (
    <FontAwesome name='map' size={30} color="red"/> 
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
  },
});