import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';


const Button = ({ submitDrink }) => (
    <View style={styles.buttonContainer}>
        <TouchableHighlight
            underlayColor='#efefef'
            style={styles.button}
            onPress={submitDrink}>
            <Text style={styles.submit}>
                Submit
            </Text>
        </TouchableHighlight>
    </View>
)

export default Button;

// CSS
const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#007bff',
        marginRight: 20,
        marginTop: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    submit: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    }
})