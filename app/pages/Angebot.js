import React, {Component} from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    Image,
    View,
    Alert,
    StatusBar,
    TouchableHighlight,
    Dimensions
} from 'react-native';
import {
    Container,
    Header,
    Title,
    Button,
    IconNB,
    DeckSwiper,
    Card,
    CardItem,
    Icon,
    Thumbnail,
    Left,
    Right,
    Body
} from 'native-base';
import {PacmanIndicator} from 'react-native-indicators'
import axios from 'axios'

const {width, height} = Dimensions.get('window');


class Angebot extends Component {
    constructor() {
        super()
        this.state = {
            loading: 1,
            data: []
        }
    }

    componentWillMount () {
        axios.get('http://193.174.80.157:3000/api/restaurant/speisekarte/specials?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzc4OTgwOTksImV4cCI6MTU0MDQ5MDA5OSwiYXVkIjoiRWFzeU9yZGVyLUFQUCJ9.cmkDDDUkeRWhEqqmKur8SfwM9mIrR2qihpDoDUgSxbc')
            .then((result) => {
                this.setState({
                    data: result.data,
                    loading: 0
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <Container>
                <Header androidStatusBarColor='#383838' style={{backgroundColor: '#545454'}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{fontSize: 35}} active name="md-arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title style={{
                        fontSize: 25,
                        textAlign: "center",
                        fontFamily: 'Roboto-Light',
                        letterSpacing: 2
                    }}>Angebote</Title>
                    </Body>
                </Header>
                {this.state.loading ? (
                    <View style={styles.loader}>
                        <View>
                            <PacmanIndicator color='#4A4A4A'/>
                        </View>
                    </View>
                ) : (
                    <View>

                        <View style={{padding: 12, width: width, height: height}}>
                            <DeckSwiper
                                ref={mr => (this._deckSwiper = mr)}
                                dataSource={this.state.data}
                                looping={true}
                                renderEmpty={() =>
                                    <View style={{alignSelf: 'center'}}>
                                        <Text style={{
                                              fontFamily: 'Roboto-Light',
                                              fontSize: 25,
                                              alignItems: 'center',
                                              textAlign: 'center',
                                              marginTop: height / 3
                                          }}>
                                          Leider gibt es heute keine Angebote :(
                                          </Text>
                                    </View>}
                                renderItem={product =>
                                    <Card style={{height: height - 110}}>
                                        <CardItem style={{height: 100}}>
                                            <Left>
                                                <Thumbnail
                                                    style={{width: 80, marginTop: 20, height: 80, borderRadius: 40,}}
                                                    source={product.restaurantbild ? {uri: 'data:image/jpeg;base64,' + product.restaurantbild} : require('../../images/placeholder.png')}/>
                                                <Body>
                                                <Text style={{
                                                    fontSize: 30,
                                                    fontFamily: 'Amatic-Bold',
                                                    color: '#f98b00',
                                                    letterSpacing: 2
                                                }}>
                                                    {product.restaurantname}
                                                </Text>

                                                </Body>
                                            </Left>
                                        </CardItem>
                                        <TouchableHighlight
                                            onPress={() => this.props.navigation.navigate('Products', {menuId: product.sk_id})}>
                                            <CardItem
                                                style={{height: 80, alignItems: 'center', justifyContent: 'center'}}>
                                                <Body style={{
                                                    height: 60,
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                <Text style={{
                                                    fontSize: 30,
                                                    fontFamily: 'Roboto-Regular',
                                                    letterSpacing: 2
                                                }}>{product.speisenname}</Text>
                                                </Body>
                                            </CardItem>
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                            onPress={() => this.props.navigation.navigate('Products', {menuId: product.sk_id})}>
                                            <CardItem cardBody>
                                                <Image
                                                    source={product.bild ? {uri: 'data:image/jpeg;base64,' + product.bild} : require('../assets/images/speisen/placeholderFood1.png')}
                                                    style={{width: width - 40, height: 350}} resizeMode="contain"/>
                                            </CardItem>
                                        </TouchableHighlight>
                                        <CardItem style={{
                                            width: width,
                                            height: 70,
                                            foignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{
                                                fontSize: 35,
                                                marginBottom: 40,
                                                marntFamily: 'Roboto-Light',
                                                letterSpacing: 2,
                                                color: '#5d5d5d',
                                            }}>
                                                {(product.preis)} €
                                            </Text>

                                        </CardItem>
                                    </Card>}
                            />
                        </View>
                    </View>
                )}
            </Container>
        );
    }
}

export default Angebot;

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        backgroundColor: '#424242',
        width: width,
        justifyContent: 'flex-start'
    },

    container: {
        width: width,
        height: height,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgr: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '30%',
    },

    textname: {
        position: 'absolute',
        color: 'white',
        fontSize: 24,
        top: '10%',
        left: '2%',
    },

    textdes: {
        position: 'absolute',
        color: 'white',
        fontSize: 17,
        top: '10%',
        left: '2%',
    },


    pic: {
        position: 'absolute',
        height: height / 2
    },
});