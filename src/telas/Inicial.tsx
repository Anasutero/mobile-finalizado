import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../componentes/AuthContext.js';
import axios from 'axios';
import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');


export function Inicial() {
    const navigation = useNavigation();

    const [sensorProximo, setSensorProximo] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [distance1, setDistance1] = useState(null); // Distância até o ponto fixo 1
    const [distance2, setDistance2] = useState(null); // Distância até o ponto fixo 2
    const [temp, setTemp] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [sensores, setSensores] = useState<Sensor[]>([]);
    const [fixedPoints, setFixedPoints] = useState([]);

    interface Sensor {
        id: number;
        tipo: string;
        mac_address: string | null;
        latitude: number;
        longitude: number;
        localizacao: string;
        responsavel: string;
        unidade_medida: string;
        status_operacional: boolean;
        observacao: string;
    }

    const initialRegion = {
        latitude: -22.9140639,
        longitude: -47.068686,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axios.get<Sensor>('http://10.0.2.2:8000/api/sensores/1');
                const response2 = await axios.get<Sensor>('http://10.0.2.2:8000/api/sensores/5');
                setSensores([response1.data, response2.data]);
                setFixedPoints([
                    {
                        id: response1.data.id,
                        latitude: response1.data.latitude,
                        longitude: response1.data.longitude,
                        tipo: response1.data.tipo,
                        localizacao: response1.data.localizacao,
                        responsavel: response1.data.responsavel,
                        unidade_medida: response1.data.unidade_medida,
                        status_operacional: response1.data.status_operacional,
                        observacao: response1.data.observacao
                    },
                    {
                        id: response2.data.id,
                        latitude: response2.data.latitude,
                        longitude: response2.data.longitude,
                        tipo: response2.data.tipo,
                        localizacao: response2.data.localizacao,
                        responsavel: response2.data.responsavel,
                        unidade_medida: response2.data.unidade_medida,
                        status_operacional: response2.data.status_operacional,
                        observacao: response2.data.observacao
                    }
                ]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
    
                const locationSubscription = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.High,
                        timeInterval: 1000,
                        distanceInterval: 1,
                    },
                    (newLocation) => {
                        setLocation(newLocation.coords);
                    }
                );
    
                return () => {
                    locationSubscription.remove();
                };
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        if (sensores.length > 0 && location) {
            const distanceToFixedPoint1 = haversine(location.latitude, location.longitude, fixedPoints[0].latitude, fixedPoints[0].longitude);
            const distanceToFixedPoint2 = haversine(location.latitude, location.longitude, fixedPoints[1].latitude, fixedPoints[1].longitude);
            setDistance1(distanceToFixedPoint1);
            setDistance2(distanceToFixedPoint2);
            if (distanceToFixedPoint1 <= distanceToFixedPoint2) {
                const sensor = fixedPoints[0];
                setSensorProximo(sensor);
            } else {
                const sensor = fixedPoints[1];
                setSensorProximo(sensor);
            }
        }
    }, [sensores, location, sensorProximo]);

    const haversine = (lat1, lon1, lat2, lon2) => {
        const toRad = (value) => (value * Math.PI) / 180;

        const R = 6371000; // Raio da Terra em metros
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distância em metros

        return d;
    };

    let text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
            >
                <Marker coordinate={{ latitude: -22.915, longitude: -47.0678 }} />
                {fixedPoints.map(point => (
                    <Marker
                        key={point.id}
                        coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                        pinColor="blue" // Cor do marcador para os pontos fixos
                    />
                ))}
                {location && (
                    <Marker
                        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                        pinColor="red" // Cor do marcador para a localização atual
                    />
                )}
            </MapView>

            <View style={styles.cxs}>
                <View style={styles.cx}><Text style={styles.cxTxt}>Latitude: </Text><Text style={styles.cxTxt}>{location && location.latitude}</Text></View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Longitude: </Text><Text style={styles.cxTxt}>{location && location.longitude}</Text></View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Distância até o ponto fixo 1: </Text>{distance1 !== null && <Text style={styles.cxTxt}>{distance1.toFixed(1)} metros</Text>}</View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Distância até o ponto fixo 2: </Text>{distance2 !== null && <Text style={styles.cxTxt}>{distance2.toFixed(2)} metros</Text>}</View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Temperatura:</Text><Text style={styles.cxTxt}>{temp}ºC</Text></View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Details</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.modalContainer}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    {sensorProximo && (
                        <View style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>ID: {sensorProximo['id']}</Text>
                                <Text style={styles.modalText}>TIPO: {sensorProximo['tipo']}</Text>
                                <Text style={styles.modalText}>LATITUDE: {sensorProximo['latitude']}</Text>
                                <Text style={styles.modalText}>LONGITUDE: {sensorProximo['longitude']}</Text>
                                <Text style={styles.modalText}>LOCALIZAÇÃO: {sensorProximo['localizacao']}</Text>
                                <Text style={styles.modalText}>RESPONSAVEL: {sensorProximo['responsavel']}</Text>
                                <Text style={styles.modalText}>UNIDADE: {sensorProximo['unidade_medida']}</Text>
                                <Text style={styles.modalText}>STATUS: {sensorProximo['status_operacional']}</Text>
                                <Text style={styles.modalText}>OBS: {sensorProximo['observacao']}</Text>
                                <TouchableOpacity
                                    style={styles.openButton}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                    }}
                                >
                                    <Text style={styles.textStyle}>Close Modal</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Modal>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      width: '100%',
      height: 80,
      alignItems: 'center',
      justifyContent: 'center'
    },
    map: {
      width: width - 40,
      height: height / 2,
      borderRadius: 10,
    },
    button: {
      width: "70%",
      height: 40,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonText: {
      color: 'white'
    },
    cxs: {
      width: '80%'
    },
    cx: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
      marginBottom: 8,
      borderWidth: 1,
      padding: 5,
      borderColor: '#999'
    },
    cxTxt: {
      fontSize: 12,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'flex-start',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    openButton: {
      backgroundColor: '#787878',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
  
    },
    modalText: {
      
      marginBottom: 15,
      textAlign: 'center',
    },
  });
  


