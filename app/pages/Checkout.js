import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Header, Left, Body, Button, Icon} from 'native-base';
import CheckoutItems from '../components/CheckoutItems.component';
import styles from "./Home/Style";

export class Checkout extends Component {
    render() {
        const {cartItems, navigation, cartTotal} = this.props;
        return (
            <Container style={{backgroundColor: '#f7f7f7'}}>
                <Header androidStatusBarColor='#1b1b1b' style={styles.header}>
                    <Left style={{flex: 1}}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{fontSize: 35, color: 'white'}} active name="arrow-back"/>
                        </Button>
                    </Left>
                </Header>
                <CheckoutItems restaurantID={navigation.state.params.restaurantID} cartItems={cartItems}
                               cartTotal={cartTotal} navigation={navigation}/>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.cart,
    cartTotal: state.cart.total
});


export default connect(
    mapStateToProps
)(Checkout);
