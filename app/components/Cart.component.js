import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Animated, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {Button, Header, Right, Left, Body, Title, Icon, Container} from 'native-base';

export class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(1)
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cartItems !== this.props.cartItems) {
            this.startAnimation();
        }
    }

    startAnimation() {
        Animated.timing(this.state.opacity,
            {
                toValue: 0,
                duration: 500
            }).start(() => {
            setTimeout(() => {
                this.endAnimation()
            }, 100);
        })
    }

    endAnimation() {
        Animated.timing(this.state.opacity,
            {
                toValue: 1,
                duration: 500
            }).start()
    }

    onPress = () => {
        this.props.navigation.navigate('Checkout', {restaurantID: this.props.restaurantID});
    }

    render() {
        const {cartItems} = this.props;
        let animatedStyle = {opacity: this.state.opacity}
        return (
            <Animated.View style={[styles.container, animatedStyle]}>
                <TouchableOpacity onPress={this.onPress} style={{flexDirection: 'row'}}>
                    <Icon style={{fontSize: 32, color: '#FFFFFF'}} active name="md-cart"/>
                    <Text style={styles.cart}> {(cartItems).length}</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.cart
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    cart: {
        color: 'white',
        fontSize: 25
    }
})

export default connect(
    mapStateToProps
)(Cart);
