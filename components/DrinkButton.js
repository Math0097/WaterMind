import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';


const DrinkButton = ({ onPress, name }) => {
    return (
        <TouchableHighlight
            onPress={onPress}
            underlayColor='#efefef'
            style={styles.button}>
            <Text style={[
                styles.text,
                name === 'Delete' ? styles.deleteButton : null
            ]}>
                {name}
            </Text>
        </TouchableHighlight>
    )
}

export default DrinkButton;

// CSS
const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-end',
        padding: 7,
        borderColor: '#ededed',
        borderWidth: 1,
        borderRadius: 4,
        marginRight: 5
    },
    text: {
        color: '#666666'
    },
    deleteButton: {
        color: 'rgba:(175, 47, 47, 1)'
    }
})