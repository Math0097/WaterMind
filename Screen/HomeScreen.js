import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../components/Logo';
import Status from '../components/Status';
import Input from '../components/Input';
import Button from '../components/Button';
import Drink from '../components/Drink';
import CustomAlert from '../components/CustomAlert';

import * as Notifications from 'expo-notifications';

import uuid from 'react-native-uuid';


function Home({ quantitàConsigliata }) { // Accetta quantitàConsigliata come props
    // GESTIONE DATABASE ----------
    const saveData = async (key, data) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
            console.log('Array aggiornato!')
        } catch (error) {
            console.log('Errore nel salvataggio dei dati:', error);
        }
    };

    const getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return JSON.parse(value);
            } else {
                return null;
            }
        } catch (error) {
            console.log('Errore nel recupero dei dati:', error);
            return null;
        }
    };

    const clearDatabaseEveryday = async () => { // Per resettare il database ogni nuovo giorno
        try {
            const lastClearedDate = await AsyncStorage.getItem('lastClearedDate');
            const today = new Date().getDate();

            if (lastClearedDate !== today.toString()) {
                await AsyncStorage.removeItem('drinks');
                console.log('Elementi rimossi con successo!');
                await AsyncStorage.setItem('lastClearedDate', today.toString());
            }
        } catch (error) {
            console.log('Errore nella gestione del database:', error);
        }
    };
    // ----------

    // AVVIO DELL'APP: svuotamento/caricamento database + generazione notifica persistente
    useEffect(() => {
        const fetchDataAndClearDatabase = async () => {
            await clearDatabaseEveryday(); // Attendere il completamento della pulizia del database
            const data = await getData('drinks');
            const lastDay = await getData('lastClearedDate');
            console.log("Oggi è il " + lastDay);

            if (data) {
                setState(prevState => ({
                    ...prevState,
                    drinks: data,
                    sommaMl: sumMl(data)
                }));
            }
        };

        fetchDataAndClearDatabase();
        generateNotification();
        scheduleHourlyNotification();
    }, []);

    // HOMESCREEN
    const [justOne, setJustOne] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const createAlert = () => {
        setShowAlert(true);
    };

    const [state, setState] = useState({
        inputValue: '',
        inputMlValue: '',
        drinks: [],
        sommaMl: 0,
    });

    // NOTIFICA
    const IDnotify = 'ID';
    const IDhourlyNotify = 'ID_hourly'; // ID per la notifica oraria

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    const generateNotification = async () => {
        const data = await getData('drinks');

        Notifications.scheduleNotificationAsync({
            content: {
                title: 'WaterMind',
                body: sumMl(data) + '/' + quantitàConsigliata + ' ml', // Utilizza quantitàConsigliata fornita come props
            },
            trigger: null,
            identifier: IDnotify
        });
        // Ottieni l'ID della notifica appena programmata
        const notificationId = Notifications.identifier;
        console.log(notificationId)
    };

    const updateNotification = async (notificationId) => {
        try {
            const data = await getData('drinks'); // Ottieni i dati più recenti
            const content = {
                title: 'WaterMind',
                body: sumMl(data) + '/' + quantitàConsigliata + ' ml', // Utilizza quantitàConsigliata fornita come props
            };

            // Programma la notifica aggiornata utilizzando lo stesso ID della notifica esistente
            const updatedNotificationRequest = await Notifications.scheduleNotificationAsync({
                content: content,
                trigger: null,
                identifier: notificationId, // Usa l'ID della notifica esistente
                update: true,
            });

            console.log('Notifica aggiornata con successo:', updatedNotificationRequest);
        } catch (error) {
            console.log('Errore nell\'aggiornamento della notifica:', error);
        }
    };

    // Funzione per schedulare la notifica oraria
    const scheduleHourlyNotification = async () => {
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'BEVI!',
                    body: "Bere è fondamentale, migliora la vita!",
                },
                trigger: {
                    seconds: 3600, // 3600 secondi = 1 ora
                    repeats: true,
                },
                identifier: IDhourlyNotify
            });

        } catch (error) {
            console.log('Errore nella schedulazione della notifica oraria:', error);
        }
    };

    const deleteDrink = async (id) => {
        setState(prevState => {
            // Filtra gli elementi con id diverso dall'id passato
            const updatedDrinks = prevState.drinks.filter(drink => drink.id !== id);

            // Calcola la somma utilizzando l'array aggiornato
            const updatedSumMl = sumMl(updatedDrinks);

            // Salvataggio dei dati aggiornati
            saveData('drinks', updatedDrinks);

            // Restituisci il nuovo stato aggiornato
            return {
                ...prevState,
                drinks: updatedDrinks,
                sommaMl: updatedSumMl
            };
        });

        const listDrinks = await getData('drinks');
        console.log(listDrinks);
        const lastDay = await getData('lastClearedDate');
        console.log(lastDay);

        updateNotification(IDnotify);
    };

    const handleChangeInputValue = (inputValue) => {
        if (inputValue.length <= 10) {
            setState(prevState => ({ ...prevState, inputValue }));
        }
    };

    const handleChangeMlValue = (inputMlValue) => {
        if ((inputMlValue === '' || !isNaN(inputMlValue)) && inputMlValue.length <= 4) {
            setState(prevState => ({ ...prevState, inputMlValue }));
        }
    };

    const handleSubmit = async () => {
        if (state.inputValue.trim() === '' || state.inputMlValue.trim() === '') {
            return;
        }

        const currentTime = new Date();
        const day = currentTime.getDate();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const time = `${hours}:${minutes}`;

        const newDrink = {
            id: uuid.v4(),
            nome: state.inputValue,
            quantità: state.inputMlValue,
            time: time,
            day: day
        };

        const updatedDrinks = [...state.drinks, newDrink]; // Aggiungi il nuovo drink all'array esistente

        setState(prevState => ({
            ...prevState,
            drinks: updatedDrinks, // Aggiorna lo stato con il nuovo array di drink
            inputValue: '',
            inputMlValue: '',
            sommaMl: sumMl(updatedDrinks) // Calcola la somma utilizzando l'array aggiornato
        }));

        if (state.sommaMl + parseInt(state.inputMlValue, 10) >= quantitàConsigliata && !justOne) {
            setJustOne(true);
            createAlert();
        }

        saveData('drinks', updatedDrinks);

        const listDrinks = await getData('drinks');
        console.log(listDrinks);
        const lastDay = await getData('lastClearedDate');
        console.log(lastDay);

        updateNotification(IDnotify);
    };

    const sumMl = (drinks) => {
        let sommaMl = 0;
        try {
            drinks.forEach(drink => {
                sommaMl += parseInt(drink.quantità);
            });

            if (sommaMl < quantitàConsigliata) {
                setJustOne(false);
            }
            return sommaMl;
        } catch (error) {
            setJustOne(false);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <ImageBackground source={require('../components/sfondo2.jpg')} style={styles.background}>
                <View style={styles.container}>
                    <ScrollView style={styles.content} keyboardShouldPersistTaps='always'>
                        <Logo />
                        <View>
                            <Status totalMl={state.sommaMl} quantity={quantitàConsigliata} />
                        </View>
                        <Input
                            inputValue={state.inputValue}
                            inputChange={handleChangeInputValue}
                            maxLength={10}
                            inputMlValue={state.inputMlValue}
                            inputMlChange={handleChangeMlValue}
                        />
                        <Button submitDrink={handleSubmit} />
                        <View style={styles.containerSub}>
                            {state.drinks.map(drink => (
                                <View key={drink.id} style={styles.drinkItem}>
                                    <Drink nome={drink.nome} quantità={drink.quantità} timestamp={drink.timestamp} deleteDrink={() => deleteDrink(drink.id)} />
                                </View>
                            ))}
                        </View>
                        <CustomAlert
                            visible={showAlert}
                            title='Congratulazioni!'
                            message='Hai raggiunto la quantità giornaliera raccomandata.'
                            onPress={() => setShowAlert(false)}
                        />
                    </ScrollView>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView >
    );
}

export default Home;

// CSS
const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
    },
    containerSub: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
    },
    drinkItem: {
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    }
});