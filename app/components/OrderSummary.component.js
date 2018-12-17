import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

class OrderSummary extends Component {

    render() {
        const {item} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.productDes}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>€ {(item.preis).toFixed(2)}</Text>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    productDes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
    },
    text: {
        margin: 5,
        fontSize: 20,
        fontFamily: 'Roboto-Light',
        letterSpacing: 2
    }
});

export default OrderSummary;
