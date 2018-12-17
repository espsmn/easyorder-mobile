import React, {Component} from 'react';
import {View, StyleSheet, FlatList, StatusBar, ScrollView, Content} from 'react-native';
import {Button, Header, Right, Left, Body, Title, Icon, Container} from 'native-base';
import {connect} from 'react-redux';
import {PacmanIndicator} from 'react-native-indicators'
import Product from '../components/Product.component';
import {addToCart} from '../redux/actions/cartActions';
import {fetchProducts} from '../redux/actions/productAction';
import Cart from '../components/Cart.component';
import styles from "./Home/Style";
import axios from 'axios'

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: 1
        };
    }

    componentWillMount () {
        axios.get('http://193.174.80.157:3000/api/restaurant/speisekarte/speise/' + this.props.navigation.state.params.menuId + '?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzc4OTgwOTksImV4cCI6MTU0MDQ5MDA5OSwiYXVkIjoiRWFzeU9yZGVyLUFQUCJ9.cmkDDDUkeRWhEqqmKur8SfwM9mIrR2qihpDoDUgSxbc')
            .then((result) => {
                this.setState({
                    data: result.data,
                    loading: 0
                })
                this.props.fetchProducts(result.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }
    addItemsToCart = (product) => {
        this.props.addToCart(product);
    }

    render() {
        const {navigation} = this.props
        return (
            <Container>
                <Header androidStatusBarColor='#383838' style={{backgroundColor: '#545454'}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{fontSize: 35, color: 'white'}} active name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title style={{
                        fontSize: 25,
                        fontFamily: 'Roboto-Light',
                        letterSpacing: 2
                    }}>{navigation.state.params.typ}</Title>
                    </Body>
                    <Right style={{position: 'absolute', right: 20}}>
                        <Cart restaurantID={navigation.state.params.restaurantID} navigation={navigation}/>
                    </Right>
                </Header>
                {this.state.loading ? (
                    <View style={styles.loader}>
                        <View>
                            <PacmanIndicator color='#4A4A4A'/>
                        </View>
                    </View>
                ) : (
                    <View style={{flex: 1}}>
                        <ScrollView contentContainerStyle={{paddingBottom: 10, alignItems: 'center'}}>
                            <FlatList
                                data={this.state.data}
                                renderItem={({item}) => <Product item={item} typ={navigation.state.params.typ}
                                                                 addItemsToCart={this.addItemsToCart} product={item}/>}
                                keyExtractor={(item) => item.id}
                            />
                        </ScrollView>
                    </View>

                )}
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    products: state.products.items
})
export default connect(mapStateToProps, {addToCart, fetchProducts})(Products);
