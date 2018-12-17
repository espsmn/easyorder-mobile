import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {Card, CardItem} from 'native-base';

const {width} = Dimensions.get('window');

class Product extends Component {
    addToCart = () => {
        this.props.addItemsToCart(this.props.item)
    }

    render() {
        const {product} = this.props;
        return (
            <Card>
                {this.props.typ === 'Getränkekarte' ? (
                    <View style={styles.container}>
                        <View style={styles.productDes}>
                            <CardItem cardBody style={{justifyContent: 'center', alignItems: 'center', width: width}}>

                                <Text style={styles.font}>{product.name}</Text>
                            </CardItem>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'RobotoCondensed-Light',
                                letterSpacing: 2,
                                color: '#5d5d5d',
                                lineHeight: 40
                            }}>{product.beschreibung}</Text>
                            <Text style={{
                                fontSize: 25,
                                fontFamily: 'Roboto-Light',
                                letterSpacing: 2,
                                color: '#5d5d5d',
                                lineHeight: 30
                            }}>€ {(product.preis).toFixed(2)}</Text>
                            <TouchableOpacity onPress={this.addToCart} style={styles.addBtn}>
                                <Text style={styles.text}>HINZUFÜGEN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={styles.container}>

                        <Image
                            source={product.bild ? {uri: 'data:image/jpeg;base64,' + product.bild} : require('../assets/images/speisen/placeholderFood1.png')}
                            style={{width: 400, height: 150}}/>
                        <View style={styles.productDes}>
                            <CardItem cardBody style={{justifyContent: 'center', alignItems: 'center'}}>

                                <Text style={styles.font}>{product.name}</Text>
                            </CardItem>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'RobotoCondensed-Light',
                                letterSpacing: 2,
                                color: '#5d5d5d',
                                lineHeight: 40
                            }}>{product.beschreibung}</Text>
                            <Text style={{
                                fontSize: 25,
                                fontFamily: 'Roboto-Light',
                                letterSpacing: 2,
                                color: '#5d5d5d',
                                lineHeight: 30
                            }}>€ {(product.preis).toFixed(2)}</Text>
                            <TouchableOpacity onPress={this.addToCart} style={styles.addBtn}>
                                <Text style={styles.text}>HINZUFÜGEN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Card>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    productDes: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    addBtn: {
        borderRadius: 30,
        margin: 10,
        backgroundColor: '#f98b00'
    },
    text: {
        color: '#fff',
        fontSize: 20,
        padding: 14,
        fontFamily: 'Roboto-Regular',
        letterSpacing: 2,
    },
    font: {
        fontSize: 30,
        fontFamily: 'Roboto-Regular',
        letterSpacing: 2
    }
});

export default Product;
