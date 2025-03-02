import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';


const Input = ({ inputValue, inputChange, inputMlValue, inputMlChange }) => {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
                <TextInput
                    value={inputValue}
                    style={styles.inputText}
                    placeholder='What did you drink?'
                    placeholderTextColor='#CACACA'
                    selectionColor='#666666'
                    onChangeText={inputChange}
                />
                <TextInput
                    value={inputMlValue}
                    style={styles.inputMlText}
                    placeholder='ml'
                    placeholderTextColor='#CACACA'
                    selectionColor='#666666'
                    onChangeText={inputMlChange}
                />
            </View>
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputText: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        backgroundColor: '#ffffff',
    },
    inputMlText: {
        width: 50,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#ffffff',
    },
});