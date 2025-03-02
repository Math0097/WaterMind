import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


const Logo = () => {
    return (
        <View style={styles.header}>
            <Image style={styles.imageLogo} source={require('./favicon-48.png')} />
            <Text style={styles.headerText}>
                WaterMind
            </Text>
        </View>
    )
}

export default Logo;

// CSS
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 80,
        marginBottom: 20
    },
    imageLogo: {
        width: 100,
        height: 100
    },
    headerText: {
        textAlign: 'center',
        fontSize: 45,
        color: '#ffffff',
        fontWeight: '300'
    }
})