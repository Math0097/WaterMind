import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text } from 'react-native';
import Logo from '../components/Logo';

function ChangeQuantity({ onQuantitySelect }) { // Accetta la funzione di callback come props
    const [selectedQuantity, setSelectedQuantity] = useState(null);

    const handlePress = (quantity) => {
        setSelectedQuantity(quantity);
        onQuantitySelect(quantity); // Chiama la funzione di callback con la quantità selezionata
    };

    return (
        <ImageBackground source={require('../components/sfondo2.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Logo />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, selectedQuantity === 1500 ? styles.selectedButton : styles.unselectedButton]}
                        onPress={() => handlePress(1500)}
                    >
                        <Text style={[styles.buttonText, selectedQuantity === 1500 ? styles.selectedButtonText : styles.unselectedButtonText]}>1500 ml</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, selectedQuantity === 2000 ? styles.selectedButton : styles.unselectedButton]}
                        onPress={() => handlePress(2000)}
                    >
                        <Text style={[styles.buttonText, selectedQuantity === 2000 ? styles.selectedButtonText : styles.unselectedButtonText]}>2000 ml</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, selectedQuantity === 2500 ? styles.selectedButton : styles.unselectedButton]}
                        onPress={() => handlePress(2500)}
                    >
                        <Text style={[styles.buttonText, selectedQuantity === 2500 ? styles.selectedButtonText : styles.unselectedButtonText]}>2500 ml</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

export default ChangeQuantity;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginVertical: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        width: 200,
    },
    unselectedButton: {
        backgroundColor: '#ffffff',
    },
    selectedButton: {
        backgroundColor: '#007bff',
    },
    unselectedButtonText: {
        fontSize: 16,
        color: 'grey',
        textAlign: 'center',
    },
    selectedButtonText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
});
