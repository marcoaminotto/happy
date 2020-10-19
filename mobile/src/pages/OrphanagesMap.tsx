import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';


import mapMarker from '../images/map-marker.png';

export default function OrphanagesMap() {
  const navigation = useNavigation();

  function handleNavigationToOrphanageDetails() {
    navigation.navigate('OrphanageDetails');
  }

  function handleNavigationToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 51.090114,
          longitude: 17.016391,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
      >
        <Marker
          icon={mapMarker}
          calloutAnchor={{
            x: 2.7,
            y: 0.8,
          }}
          coordinate={{
            latitude: 51.090114,
            longitude: 17.016391,
          }}
        >
          <Callout tooltip onPress={handleNavigationToOrphanageDetails}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>New Orphanage</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>something</Text>
        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigationToCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },

  calloutText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5',
    fontSize: 14,
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 10,
  },

  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3',
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
