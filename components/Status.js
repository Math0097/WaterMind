import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


const Status = ({ totalMl, quantity }) => {
    const isExceeded = totalMl >= quantity;

    // Applica uno stile diverso in base alla condizione
    const statusTextStyle = isExceeded ? styles.exceededText : styles.statusText;

    return (
        <View style={styles.status}>
            <Text style={statusTextStyle}>
                {totalMl}
            </Text>
            <Text style={styles.finalText}>/{quantity} ml</Text>
        </View>
    )
}

export default Status;

// CSS
const styles = StyleSheet.create({
    status: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    statusText: {
        textAlign: 'center',
        fontSize: 40,
        color: '#ffffff',
        fontWeight: 'normal',
    },
    exceededText: {
        textAlign: 'center',
        fontSize: 40,
        color: '#C2FFB9',
        fontWeight: 'normal',
    },
    finalText: {
        textAlign: 'center',
        fontSize: 40,
        color: '#BDF4FF',
        fontWeight: 'normal'
    }
});