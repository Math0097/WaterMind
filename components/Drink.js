import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const Drink = ({ nome, quantità, timestamp, deleteDrink }) => {
    return (
        <View style={styles.containerSub}>
            <View style={styles.cellTitle}>
                <Text style={styles.nome}>{nome}</Text>
            </View>
            <View style={styles.cellQuantity}>
                <Text style={styles.quantità}>{quantità} ml</Text>
            </View>
            <View style={styles.cellTime}>
                <Text style={styles.quantità}>{timestamp}</Text>
            </View>
            <TouchableOpacity onPress={deleteDrink}>
                <View style={styles.touchableOpacity}>
                    <Text style={styles.deleteButtonText}>Elimina</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default Drink;

// CSS
const styles = StyleSheet.create({
    containerSub: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    cellTitle: {
        width: 88,
        marginRight: 5,
    },
    cellQuantity: {
        width: 60,
        marginRight: 5,
        marginLeft: 5,
    },
    cellTime: {
        width: 40,
        marginRight: 5,
        marginLeft: 5,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#63C7DA',
    },
    quantità: {
        fontSize: 16,
        color: '#000000',
        textAlign: 'right',
    },
    touchableOpacity: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        borderColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginLeft: 10,
    },
    deleteButtonText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    }
});