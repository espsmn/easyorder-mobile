import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Dimensions} from 'react-native';
import {Button, Header, Left, Right, Body, Title, Icon, Container} from 'native-base';
import {connect} from 'react-redux';
import OrderSummary from '../components/OrderSummary.component';

const {width, height} = Dimensions.get('window');

class Receipt extends Component {
    getTotal() {
        let total = 0;
        const {items} = this.props;
        for (let i = 0; i < items.length; i++) {
            total = total + items[i].preis
        }
        return <Text style={styles.totText}>Insgesamt: € {(total).toFixed(2)}</Text>
    }

    render() {
        const {customer, items} = this.props;
        return (
            <View style={styles.container}>
                <Header androidStatusBarColor='#383838' style={{backgroundColor: '#545454'}}>
                    <Left style={{flex: 1}}>
                        <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
                            <Icon style={{fontSize: 35, color: 'white'}} active name="home"/>
                        </Button>
                    </Left>
                </Header>
                <View style={styles.headings}>
                    <Text style={{fontSize: 20, color: '#ffffff', fontFamily: 'Roboto-Regular', letterSpacing: 2}}>Beleg
                        für deine Bestellung</Text>
                </View>
                <View style={styles.billings}>
                    <Text style={styles.billtext}>Deine Angaben</Text>
                    <Text style={styles.text}>{customer.name}</Text>
                    <Text style={styles.text}>{customer.phone}</Text>
                    <Text style={styles.text}>{customer.tischnummer}</Text>
                    <Text style={styles.text}>{customer.ankunftszeit}</Text>
                    <Text style={styles.text}>{customer.abholzeit}</Text>
                </View>
                <View style={{marginTop: 100, flex: 1, margin: 10}}>
                    <Text style={styles.billtext}>Deine Bestellung</Text>
                    <FlatList
                        data={items}
                        renderItem={({item}) => <OrderSummary item={item}/>}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={() => <View style={{height: 0.5, backgroundColor: '#34495e90'}}/>}
                    />
                    {this.getTotal()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        flex: 1,
        backgroundColor: '#ffffff'
    },
    headings: {
        backgroundColor: '#f98b00',
        padding: 12,
        borderRadius: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderSumm: {
        flex: 1,
        margin: 10
    },
    billtext: {
        padding: 6,
        borderWidth: 3,
        borderRadius: 3,
        borderColor: '#f7f7f7',
        justifyContent: 'center',
        fontSize: 25,
        fontFamily: 'Roboto-Thin',
    },
    text: {
        margin: 5,
        fontSize: 20,
        fontFamily: 'Roboto-Light',
        letterSpacing: 2
    },
    billings: {
        height: 130,
        margin: 10
    },
    totText: {
        textAlign: 'center',
        color: '#f98b00',
        fontSize: 30,
        fontFamily: 'RobotoCondensed-Light',
        letterSpacing: 2
    }
});

const mapStateToProps = (state) => ({
    customer: state.order.order.customer,
    items: state.order.order.items
})
export default connect(mapStateToProps)(Receipt);