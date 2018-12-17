import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, ScrollView, Dimensions} from 'react-native';
import CartItems from './CartItems.component';
import CustomerForm from './CustomerForm.component';

const {height} = Dimensions.get('window');

class CheckoutItems extends Component {
    render() {
        const {cartItems, navigation, cartTotal} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.annouc}>
                    <Text style={styles.anncText}>Bitte überprüfe deine Bestellung und gib deine Daten ein.</Text>
                </View>
                <View style={styles.ckitems}>
                    <FlatList
                        data={cartItems}
                        renderItem={({item, index}) => <CartItems item={item} index={index}/>}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={() => <View style={{height: 0.3, backgroundColor: '#34495e90'}}/>}
                    />
                    <Text style={styles.text}>Insgesamt: € {(cartTotal).toFixed(2)}</Text>
                </View>
                <View style={styles.custForm}>
                    <ScrollView>
                        <CustomerForm restaurantID={this.props.restaurantID} navigation={navigation}/>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    custForm: {
        flex: 1,

    },
    ckitems: {
        height: height / 3
    },
    annouc: {
        padding: 12,
        borderRadius: 5,
        backgroundColor: '#f98b00',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        color: '#f98b00',
        fontSize: 30,
        fontFamily: 'RobotoCondensed-Light',
        letterSpacing: 2,
        marginBottom: -60,
        marginTop: 10

    },
    anncText: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Roboto-Regular',
        fontSize: 14
    }
});

export default CheckoutItems;