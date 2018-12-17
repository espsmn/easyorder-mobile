import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    ListView,
    ixelRatio,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Alert
} from 'react-native';
import {
    List,
    ListItem,
    Button,
    Header,
    Right,
    Left,
    Body,
    Title,
    Icon,
    Container,
    Label,
    Content,
    Form,
    Item,
    Input,
    Card,
    Thumbnail,
    CardItem
} from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {Buffer} from 'safe-buffer'
import styles from './Style.js'
import Cart from '../../components/Cart.component';
import SwiperComponent from '../../components/Swiper.component';
import {emptyCart} from '../../redux/actions/cartActions';
import {connect} from 'react-redux';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {PacmanIndicator} from 'react-native-indicators'

const {width} = Dimensions.get('window');

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSource: require('../../../images/Restaurant1.jpg'),
            data: {
                restaurant: {},
                menu: [],
                showForm: 0,
                speisen: [],
                getraenke: [],
                selected: [],
                hinzugefügt: 0,
                active: 'true',
                times: {}
            },
            loading: 1,
            pictures: []
        };
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        const restaurantID = params ? params.restaurantID : null;
        fetch('http://193.174.80.157:3000/api/restaurant/overview/' + restaurantID + '?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzc4OTgwOTksImV4cCI6MTU0MDQ5MDA5OSwiYXVkIjoiRWFzeU9yZGVyLUFQUCJ9.cmkDDDUkeRWhEqqmKur8SfwM9mIrR2qihpDoDUgSxbc')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: {
                        restaurant: responseJson.restaurant[0],
                        menu: responseJson.menu
                    }
                })
            }).then(() => {
            let times = {
                Montag: '',
                Dienstag: '',
                Mittwoch: '',
                Donnerstag: '',
                Freitag: '',
                Samstag: '',
                Sonntag: ''
            }
            this.state.data.restaurant.öffnungszeiten.map((tag) => {
                if (tag.tag === 1) {
                    times.Montag = tag
                } else if (tag.tag === 2) {
                    times.Dienstag = tag
                } else if (tag.tag === 3) {
                    times.Mittwoch = tag
                } else if (tag.tag === 4) {
                    times.Donnerstag = tag
                } else if (tag.tag === 5) {
                    times.Freitag = tag
                } else if (tag.tag === 6) {
                    times.Samstag = tag
                } else if (tag.tag === 0) {
                    times.Sonntag = tag
                }
            })
            fetch('http://193.174.80.157:3000/api/restaurant/bilder/' + restaurantID + '?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzc4OTgwOTksImV4cCI6MTU0MDQ5MDA5OSwiYXVkIjoiRWFzeU9yZGVyLUFQUCJ9.cmkDDDUkeRWhEqqmKur8SfwM9mIrR2qihpDoDUgSxbc')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        pictures: responseJson,
                        times: times,
                        loading: 0
                    })
                })
        })
    }

    render() {
        const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']
        const {params} = this.props.navigation.state
        const bestellung = params ? params.bestellung : []
        const {navigation} = this.props
        const {
            onScroll = () => {
            }
        } = this.props;
        const menus = this.state.data.menu[0] ? this.state.data.menu : []
        onPressBack = () => {
            this.props.emptyCart();
            navigation.goBack();
        }
        onPressButton = () => {
            const {cartItems} = this.props;
            if ((cartItems).length !== 0) {
                Alert.alert(
                    'Info',
                    'Alle Speisen werden aus dem Warenkorb entfernt!',
                    [
                        {text: 'Oh nein, bitte nicht!', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'Fortfahren', onPress: () => onPressBack()},
                    ],
                    {cancelable: true}
                )
            } else {
                navigation.goBack();
            }
        }
        const mapStateToProps = (state) => ({
            cartItems: state.cart.cart
        });
        return (
            <Container>
                {this.state.loading ? (
                    <View style={styles.loader}>
                        <View>
                            <PacmanIndicator color='#4A4A4A'/>
                        </View>
                    </View>
                ) : (
                    <ParallaxScrollView
                        onScroll={onScroll}
                        backgroundColor='#545454'
                        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                        backgroundScrollSpeed={5}
                        outputScaleValue={10}
                        renderForeground={() => (
                            <View style={{
                                top: 0,
                                width: window.width,
                                height: PARALLAX_HEADER_HEIGHT
                            }}>
                                <SwiperComponent state={this.props.navigation.state} pictures={this.state.pictures}/>
                            </View>
                        )}
                        renderStickyHeader={() => (
                            <View key="sticky-header" style={styles.stickySection}>
                                <Text
                                    style={styles.stickySectionText}>{this.state.data.restaurant.restaurant_name}</Text>
                            </View>
                        )}
                        renderFixedHeader={() => (
                            <View key="fixed-header" style={styles.fixedSection}>
                                <Left style={{marginTop: 5}}>
                                    <Button transparent onPress={onPressButton}>
                                        <Icon style={{fontSize: 35, color: '#ffffff'}} active name="md-arrow-back"/>
                                    </Button>
                                </Left>
                                <Right style={{right: 20, marginTop: 5}}>
                                    <Cart navigation={navigation}/>
                                </Right>
                            </View>
                        )}
                    >
                        <View style={{backgroundColor: '#f7f7f7', alignItems: 'center'}}>
                            <Card style={{width: width}}>
                                <View style={{
                                    backgroundColor: 'white',
                                    marginTop: 10,
                                    marginBottom: 10,
                                    flexDirection: 'row',
                                    flex: 1
                                }}>
                                <View>
                                     <Thumbnail
                                        style={{width: 80, marginTop: 20,marginLeft:20, height: 80, borderRadius: 40,}}
                                        source={this.props.navigation.state.params.logo ? this.props.navigation.state.params.logo : require('../../../images/placeholder.png')}/>
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 50,
                                        fontFamily: 'Amatic-Bold',
                                        color: '#f98b00',
                                        letterSpacing: 2,
                                        marginLeft: 30
                                    }}>{this.state.data.restaurant.restaurant_name}</Text>
                                    <Text style={{
                                        fontSize: 20,
                                        fontFamily: 'Roboto-Light',
                                        letterSpacing: 2,
                                        color: '#5d5d5d',
                                        marginLeft: 30
                                    }}>{this.state.data.restaurant.plz} {this.state.data.restaurant.ort_name}</Text>
                                    <Text style={{
                                        fontSize: 20,
                                        fontFamily: 'Roboto-LightItalic',
                                        lineHeight: 30,
                                        letterSpacing: 2,
                                        marginLeft: 30,
                                        color: this.state.data.restaurant.geschlossen ? '#B43104' : '#31B404'
                                    }}>{this.state.data.restaurant.geschlossen ? 'geschlossen' : 'geöffnet'}</Text>
                                </View>
                                </View>
                            </Card>
                            <View style={{alignItems: 'center'}}>
                                {menus.map((item) => {
                                    return (
                                        <Card style={{width:width}}>
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('Products', {
                                                    menuId: item.sk_id,
                                                    typ: item.typ,
                                                    restaurantID: params.restaurantID
                                                }, {bestellung})}>
                                                <CardItem cardBody
                                                          style={{justifyContent: 'center', alignItems: 'center'}}>
                                                    <Text style={styles.textdes}> {item.typ} </Text>

                                                </CardItem>
                                            </TouchableOpacity>
                                        </Card>
                                    )
                                })}

                                <Card style={{width: width}}>
                                    <View style={{backgroundColor: 'white', marginTop: 10, marginBottom: 10}}>
                                        <Text style={{
                                            fontSize: 20,
                                            fontFamily: 'Roboto_medium',
                                            marginLeft: 15,
                                            lineHeight: 50,
                                            letterSpacing: 2,
                                            color: '#5d5d5d'
                                        }}> Adresse </Text>
                                        <Text style={{
                                            fontSize: 15,
                                            fontFamily: 'Roboto-Light',
                                            marginLeft: 20,
                                            letterSpacing: 2,
                                            color: '#5d5d5d'
                                        }}>{this.state.data.restaurant.adresse}</Text>
                                        <Text style={{
                                            fontSize: 15,
                                            fontFamily: 'Roboto-Light',
                                            marginLeft: 20,
                                            letterSpacing: 2,
                                            color: '#5d5d5d',
                                            marginBottom: 20
                                        }}>{this.state.data.restaurant.plz} {this.state.data.restaurant.ort_name}</Text>
                                        <View style={styles.container}>
                                            <MapView
                                                style={styles.map}
                                                region={{
                                                    latitude: this.state.data.restaurant.geolat ? this.state.data.restaurant.geolat : params.lat ? params.lat : 49.795087,
                                                    longitude: this.state.data.restaurant.geolong ? this.state.data.restaurant.geolong : params.long ? params.long : 9.936269,
                                                    latitudeDelta: 0.015,
                                                    longitudeDelta: 0.0121,
                                                }}>
                                                <Marker coordinate={{
                                                    latitude: this.state.data.restaurant.geolat ? this.state.data.restaurant.geolat : params.lat ? params.lat : 49.795087,
                                                    longitude: this.state.data.restaurant.geolong ? this.state.data.restaurant.geolong : params.long ? params.long : 9.936269
                                                }}
                                                        title={this.state.data.restaurant.restaurant_name}
                                                        description={this.state.data.restaurant.geschlossen ? 'Geschlossen' : 'Geöffnet'}
                                                />
                                            </MapView>
                                        </View>
                                        <Text style={{
                                            fontSize: 20,
                                            fontFamily: 'Roboto_medium',
                                            marginLeft: 15,
                                            lineHeight: 50,
                                            letterSpacing: 2,
                                            color: '#5d5d5d'
                                        }}> Öffnungszeiten </Text>
                                        {days.map((tag) => (
                                            <Text style={{
                                                fontSize: 15,
                                                fontFamily: 'Roboto-Light',
                                                letterSpacing: 2,
                                                marginLeft: 20,
                                                color: '#5d5d5d'
                                            }}>{this.state.times[tag] ? !this.state.times[tag].geschlossen ? tag + ': ' + this.state.times[tag].von + ' - ' + this.state.times[tag].bis + ' Uhr' : tag + ': geschlossen' : 'Error'}</Text>
                                        ))}
                                    </View>
                                </Card>
                            </View>
                        </View>
                    </ParallaxScrollView>
                )}
            </Container>
        );
    }
}

const STICKY_HEADER_HEIGHT = 55;

const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = 250;

const mapStateToProps = (state) => ({
    cartItems: state.cart.cart
})
export default connect(mapStateToProps, {emptyCart})(Details);