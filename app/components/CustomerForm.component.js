import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList, Alert, Dimensions} from 'react-native';
import {CheckBox, ListItem, Body, Input, InputGroup, Icon} from 'native-base';
import {connect} from 'react-redux';
import {addOrder} from '../redux/actions/orderAction';
import {emptyCart} from '../redux/actions/cartActions';
import axios from 'axios';

class CustomerForm extends Component {
    state = {
        name: '',
        phone: '',
        tischnummerSelected: true,
        abholzeitSelected: false,
        ankunftszeitSelected: false,
        tischnummer: '',
        abholzeit: '',
        ankunftszeit: '',

    }

    renderCheckBox() {
        return (
            <ListItem>
                <CheckBox color='green' onPress={() => this.setState({
                    tischnummerSelected: true,
                    abholzeitSelected: false,
                    ankunftszeitSelected: false,
                    ankunftszeit: '',
                    tischnummer: '',
                    abholzeit: ''
                })} checked={this.state.tischnummerSelected}/>
                <Body><Text> Inhaus</Text></Body>
                <CheckBox color='green' onPress={() => this.setState({
                    tischnummerSelected: false,
                    abholzeitSelected: false,
                    ankunftszeitSelected: true,
                    ankunftszeit: '',
                    tischnummer: '',
                    abholzeit: ''
                })} checked={this.state.ankunftszeitSelected}/>
                <Body><Text> Besuchen</Text></Body>
                <CheckBox color='green' onPress={() => this.setState({
                    tischnummerSelected: false,
                    abholzeitSelected: true,
                    ankunftszeitSelected: false,
                    ankunftszeit: '',
                    tischnummer: '',
                    abholzeit: ''
                })} checked={this.state.abholzeitSelected}/>
                <Body><Text> Abholen</Text></Body>
            </ListItem>
        )
    }

    renderTextfield(options) {
        return (
            <InputGroup borderType='underline'>

                <Input style={styles.textField} onChangeText={(value) => this.setState({[options.name]: value})}
                       placeholder={options.label} value={this.state[options.name]}
                       keyboardType={options.keyboard || 'default'}/>
            </InputGroup>
        );
    }

    onPressButton = () => {
        const {name, phone, street, abholzeitSelected, ankunftszeitSelected, tischnummerSelected, ankunftszeit, abholzeit, tischnummer} = this.state;
        const {cartItems, navigation, addOrder, emptyCart} = this.props;
        if (name === '') {
            return Alert.alert('Namen eingeben')
        }
        if (phone === '') {
            return Alert.alert('Telefonnummer eingeben')
        }
        if (tischnummerSelected) {
            if (tischnummer === '') {
                return Alert.alert('Bitte Tischnummer eingeben')
            }
        } else if (ankunftszeitSelected) {
            if (ankunftszeit === '') {
                return Alert.alert('Bitte Ankunftszeit eingeben')
            }
        } else if (abholzeitSelected) {
            if (abholzeit === '') {
                return Alert.alert('Bitte Abholzeit eingeben')
            }
        }
        let mealArray = []
        let gesamtpreis = 0
        cartItems.map((meal) => {
            mealArray.push({name: meal.name, preis: meal.preis})
            gesamtpreis += meal.preis
        })
        const options = {
            besteller: name,
            tischnummer: tischnummer,
            abholzeit: abholzeit,
            ankunftszeit: ankunftszeit,
            gesamtpreis: gesamtpreis,
            telefonnummer: phone
        }
        let customer = {
            name: name,
            phone: phone,
            tischnummer: tischnummer,
            ankunftszeit: ankunftszeit,
            abholzeit: abholzeit
        }
        addOrder({cartItems: cartItems, customer: customer});
        emptyCart();
        this.setState({name: ''});
        this.setState({phone: ''});
        this.setState({street: ''});
        axios.post('http://193.174.80.157:3000/api/order?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzc4OTgwOTksImV4cCI6MTU0MDQ5MDA5OSwiYXVkIjoiRWFzeU9yZGVyLUFQUCJ9.cmkDDDUkeRWhEqqmKur8SfwM9mIrR2qihpDoDUgSxbc', {
            restaurantid: this.props.restaurantID,
            mealarray: mealArray,
            options: options
        })
            .then((result) => {
                navigation.navigate('Receipt', {response: result})
            })
            .catch((error) => {
                console.log(error)
                return Alert.alert('Uuups, hier hat etwas nicht funktioniert :(')
            })
    }

    renderButton() {
        return (
            <TouchableOpacity style={styles.btn} onPress={this.onPressButton}>
                <Text style={styles.btnText}>BESTELLEN</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.panel}>
                {this.renderTextfield({name: 'name', label: 'Dein Name'})}
                {this.renderTextfield({name: 'phone', label: 'Deine Telefonnummer', keyboard: 'phone-pad'})}
                {this.state.tischnummerSelected ? this.renderTextfield({
                    name: 'tischnummer',
                    label: 'Deine Tischnummer',
                    keyboard: 'phone-pad'
                }) : <View/>}
                {this.state.ankunftszeitSelected ? this.renderTextfield({
                    name: 'ankunftszeit',
                    label: 'Deine Ankunftszeit',
                    keyboard: 'phone-pad'
                }) : <View/>}
                {this.state.abholzeitSelected ? this.renderTextfield({
                    name: 'abholzeit',
                    label: 'Gewünschte Abholzeit',
                    keyboard: 'phone-pad'
                }) : <View/>}
                {this.renderCheckBox()}
                {this.renderButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    panel: {
        backgroundColor: '#fff',
        borderRadius: 3,
        padding: 10,
        margin: 10,
        height: 300,
        marginTop: 65


    },
    textField: {
        height: 40,
        margin: 8
    },
    btn: {
        backgroundColor: '#f98b00',
        borderRadius: 3,
        padding: 12,
        flex: 1,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 30,
        fontFamily: 'Roboto-Regular',
        letterSpacing: 2,

    }
});

const mapStateToProps = (state) => ({
    cartItems: state.cart.cart
})
export default connect(mapStateToProps, {addOrder, emptyCart})(CustomerForm);