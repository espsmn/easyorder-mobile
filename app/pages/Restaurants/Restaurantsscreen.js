import React, {Component} from 'react'
import {View, ScrollView, TouchableOpacity, Image, Dimensions, ImageBackground, Picker, Alert} from 'react-native'
import {
    Container,
    Header,
    Content,
    Button,
    Item,
    Input,
    Text,
    Left,
    Right,
    Body,
    Icon,
    Thumbnail,
    Card,
    CardItem
} from 'native-base'
import styles from './Style'
import {PacmanIndicator} from 'react-native-indicators'
import CardFlip from 'react-native-card-flip';
import Modal from "react-native-simple-modal";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const {width, height} = Dimensions.get('window');

class Restaurantsscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            favoriten: [],
            data: [],
            searchInput: '',
            loading: 1,

            change: [],
            types1: [{label: 'Alle', value: 0}, {label: 'Italienisch', value: 1}, {label: 'International', value: 2}, {label: 'Deutsch', value: 3}, {label: 'Griechisch', value: 4}, {label: 'Albanisch', value: 5}, {label:'Türkisch', value:6}, {label:'Spanisch', value: 7}],
            value1: 0,
            value1Index: 0,
            value1_1: 0,
            value1_1Index: 0,

        };
        this.onSearch = this.onSearch.bind(this)
        this.onFilter = this.onFilter.bind(this)
        this.reload = this.reload.bind(this)
    }

    componentDidMount() {
        return fetch('http://193.174.80.157:3000/api/restaurant?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzc4OTgwOTksImV4cCI6MTU0MDQ5MDA5OSwiYXVkIjoiRWFzeU9yZGVyLUFQUCJ9.cmkDDDUkeRWhEqqmKur8SfwM9mIrR2qihpDoDUgSxbc')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson,
                    loading: 0
                })
            })
    }

    reload() {
        this.setState({
            loading: 1,
            searchInput: '',
            value1: 0
        })
        return fetch('http://193.174.80.157:3000/api/restaurant?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzc4OTgwOTksImV4cCI6MTU0MDQ5MDA5OSwiYXVkIjoiRWFzeU9yZGVyLUFQUCJ9.cmkDDDUkeRWhEqqmKur8SfwM9mIrR2qihpDoDUgSxbc')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson,
                    loading: 0
                })
            })
    }

    onSearch() {
        if (this.state.searchInput === '') {
            return fetch('http://193.174.80.157:3000/api/restaurant?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzc4OTgwOTksImV4cCI6MTU0MDQ5MDA5OSwiYXVkIjoiRWFzeU9yZGVyLUFQUCJ9.cmkDDDUkeRWhEqqmKur8SfwM9mIrR2qihpDoDUgSxbc')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        data: responseJson,
                        loading: 0,
                        type: ''
                    })
                }).catch(() => {
                    this.setState({
                        data: [{'r_id': 1, 'restaurant_name': 'Emmas Steakhaus'},
                            {'r_id': 2, 'restaurant_name': 'Brückeneck'},
                            {'r_id': 3, 'restaurant_name': 'Megis Nudelhaus'}],
                        loading: 0
                    })
                })
        } else {
            console.log(this.state.searchInput)
            return fetch('http://193.174.80.157:3000/api/restaurant/search/' + this.state.searchInput.toString() + '?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzc4OTgwOTksImV4cCI6MTU0MDQ5MDA5OSwiYXVkIjoiRWFzeU9yZGVyLUFQUCJ9.cmkDDDUkeRWhEqqmKur8SfwM9mIrR2qihpDoDUgSxbc')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        data: responseJson
                    })
                }).catch((error) => {
                    console.error(error)
                })
        }
    }

    onFilter() {
        this.setState({
            searchInput: ''
        })
        this.closeModal();
        if (this.state.value1 === 0) {
            return fetch('http://193.174.80.157:3000/api/restaurant?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzc4OTgwOTksImV4cCI6MTU0MDQ5MDA5OSwiYXVkIjoiRWFzeU9yZGVyLUFQUCJ9.cmkDDDUkeRWhEqqmKur8SfwM9mIrR2qihpDoDUgSxbc')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        data: responseJson,
                        loading: 0
                    })

                }).catch(() => {

                })
        } else {
            return fetch('http://193.174.80.157:3000/api/restaurant/filter/' + this.state.value1.toString() + '?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzc4OTgwOTksImV4cCI6MTU0MDQ5MDA5OSwiYXVkIjoiRWFzeU9yZGVyLUFQUCJ9.cmkDDDUkeRWhEqqmKur8SfwM9mIrR2qihpDoDUgSxbc')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        data: responseJson
                    })
                }).catch((error) => {
                    console.error(error)
                })
        }
    }

    openModal = () => this.setState({open: true});

    closeModal = () => this.setState({open: false});

    onClose() {
        this.componentDidMount();
        this.closeModal();
        this.setState({
            value1Index: 0
        })

    }


    render() {
        const restaurantData = this.state.data ? this.state.data : []

        return (
            <Container style={styles.container}>
                <Header androidStatusBarColor='#383838' style={{backgroundColor: '#545454'}} searchBar rounded>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{fontSize: 35, color: '#FFFFFF'}} active name="arrow-back"/>
                        </Button>
                    </Left>

                    <Item style={{flex: 3}}>
                        <Icon name="search" onPress={this.onSearch}/>
                        <Input placeholder="Restaurant suchen" value={this.state.searchInput}
                               onChangeText={(text) => this.setState({searchInput: text})}/>
                        <Icon name="funnel" onPress={this.openModal}/>
                    </Item>


                </Header>

                {this.state.loading ? (
                    <View style={styles.loader}>
                        <View>
                            <PacmanIndicator color='#4A4A4A'/>
                        </View>
                    </View>
                ) : (
                    <View style={{flex: 1}}>
                        <Content>

                            <ScrollView contentContainerStyle={{paddingBottom: 10, alignItems: 'center'}}>
                                {restaurantData[0] ? restaurantData.map((item, index) => (
                                    <Card style={{width: '98%'}}>
                                        <CardFlip style={styles.cardContainer}
                                                  ref={(card) => this['card' + index] = card}>
                                            <TouchableOpacity style={styles.card}
                                                              onPress={() => this.props.navigation.navigate('Details', {
                                                                  restaurantID: item.r_id,
                                                                  logo: item.bild_name ? {uri: 'data:image/jpeg;base64,' + item.bild} : 0
                                                              })}>
                                                <ImageBackground style={{flex: 1, width: undefined, height: undefined}}
                                                                 source={item.bild_name ? {uri: 'data:image/jpeg;base64,' + item.bild} : require('../../../images/placeholder.png')}
                                                                 resizeMode="contain">
                                                    <View style={{
                                                        backgroundColor: 'rgba(255, 255, 255,0.8)',
                                                        height: 50,
                                                        position: 'absolute',
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        height: 50,
                                                        flexDirection: 'row'
                                                    }}>
                                                        <Text style={{
                                                            color: '#5d5d5d',
                                                            fontFamily: "Amatic-Bold",
                                                            fontSize: 40,
                                                            alignSelf: 'center',
                                                            justifyContent: 'center',
                                                            letterSpacing: 2,
                                                        }}>{item.restaurant_name}</Text>
                                                        <Right>
                                                            <View style={{flexDirection: 'row'}}>
                                                                <View style={{
                                                                    width: 20,
                                                                    height: 20,
                                                                    borderRadius: 10,
                                                                    marginTop: 13,
                                                                    backgroundColor: item.geschlossen ? '#B43104' : '#31B404'
                                                                }}/>
                                                                <Button transparent>
                                                                    <Icon style={{fontSize: 40, color: '#f98b00',}}
                                                                          name="ios-information-circle-outline"
                                                                          onPress={() => this['card' + index].flip()}/>
                                                                </Button>
                                                            </View>
                                                        </Right>
                                                    </View>
                                                </ImageBackground>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.card}
                                                              onPress={() => this.props.navigation.navigate('Details', {restaurantID: item.r_id})}>
                                                <View style={{width: width, marginTop: 40, alignItems: 'center'}}>
                                                    <Text>
                                                        <Text style={{
                                                            fontFamily: 'Roboto-Thin',
                                                            color: '5d5d5d',
                                                            fontSize: 20,
                                                            lineHeight: 30
                                                        }}>Adresse: </Text><Text style={{
                                                        fontFamily: 'Roboto-Light',
                                                        color: '5d5d5d',
                                                        fontSize: 20,
                                                        letterSpacing: 2
                                                    }}> {item.adresse}</Text>
                                                    </Text>
                                                    <Text>
                                                        <Text style={{
                                                            fontFamily: 'Roboto-Thin',
                                                            color: '5d5d5d',
                                                            fontSize: 20,
                                                            lineHeight: 30
                                                        }}>Ort : </Text><Text style={{
                                                        fontFamily: 'Roboto-Light',
                                                        color: '5d5d5d',
                                                        fontSize: 20,
                                                        letterSpacing: 2
                                                    }}>{item.plz} {item.ort_name}</Text>
                                                    </Text>
                                                    <Text>
                                                        <Text style={{
                                                            fontFamily: 'Roboto-Thin',
                                                            color: '5d5d5d',
                                                            fontSize: 20,
                                                            lineHeight: 30
                                                        }}>{item.geschlossen ? 'Geschlossen' : 'Geöffnet bis: '}</Text><Text
                                                        style={{
                                                            fontFamily: 'Roboto-Light',
                                                            color: '5d5d5d',
                                                            fontSize: 20,
                                                            letterSpacing: 2,
                                                        }}>{!item.geschlossen ? item.bis + ' Uhr' : ''}</Text>
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    backgroundColor: 'rgba(255, 255, 255,0.8)',
                                                    height: 50,
                                                    position: 'absolute',
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    height: 50,
                                                    flexDirection: 'row'
                                                }}>
                                                    <Text style={{
                                                        color: '5d5d5d',
                                                        fontFamily: "Amatic-Bold",
                                                        fontSize: 40,
                                                        flex: 2,
                                                        alignSelf: 'center',
                                                        marginLeft: 6
                                                    }}>{item.restaurant_name}</Text>
                                                    <Right>
                                                        <Button transparent>
                                                            <Icon style={{fontSize: 40, color: '#f98b00'}}
                                                                  name="ios-information-circle-outline"
                                                                  onPress={() => this['card' + index].flip()}/>
                                                        </Button>
                                                    </Right>
                                                </View>
                                            </TouchableOpacity>
                                        </CardFlip>

                                    </Card>
                                )) : (
                                    < View style={{flex: 1, alignItems: 'center', height: height, textAlign: 'center'}}>
                                        <Text style={{
                                            fontFamily: 'Roboto-Light',
                                            fontSize: 25,
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            color: '5d5d5d',
                                            marginTop: height / 3
                                        }}>
                                            Keine Restaurants gefunden
                                        </Text>
                                        <Button style={{
                                            backgroundColor: '#f98b00',
                                            alignItems: 'center',
                                            marginTop: 20,
                                            padding: 30,
                                            height:60
                                        }}
                                                onPress={this.reload}>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: 20,
                                                fontFamily: 'Roboto-Regular',
                                                letterSpacing: 8,
                                            }}>
                                                Trotzdem Hunger</Text>
                                        </Button>
                                    </View>
                                )}
                            </ScrollView>
                        </Content>
                    </View>
                )}

                <Modal
                    open={this.state.open}
                    modalDidOpen={this.modalDidOpen}
                    modalDidClose={this.modalDidClose}
                      closeOnTouchOutside={false}

                    modalStyle={{
                        borderRadius: 2,

                        padding: -20,

                        backgroundColor: "#F5F5F5",
                        height: height/1.8
                    }}

                >
                    <View style={{backgroundColor: '#424242', flexDirection: 'row', height: 50}}>

                        <Icon style={{fontSize: 30, color: '#fff', marginLeft: 10, marginTop: 10, flex: 1}} name="close"
                              onPress={this.closeModal}/>

                        <Text style={{
                            color: '#fff',
                            fontFamily: 'Roboto-Light',
                            letterSpacing: 2,
                            alignSelf: 'center',
                            fontSize: 30,
                            flex: 2
                        }}> Filter </Text>

                    </View>

                    <View style={{
                        marginTop: 15, marginLeft: 20, flex: 1,
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                    }}>

                        <RadioForm
                            ref="radioForm"
                            radio_props={this.state.types1}
                            initial={this.state.value1Index}
                            style={{alignItems: 'flex-start'}}
                            labelHorizontal={true}
                            buttonColor={'#f98b00'}
                            selectedButtonColor={'#f98b00'}
                            labelColor={'#000'}
                            animation={true}
                            onPress={(value, index) => {
                                this.setState({
                                    value1: value,
                                    value1Index: index
                                })
                            }}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', flex: 1, marginTop: 170}}>
                        <Button block onPress={() => {
                            this.onClose()
                        }}
                                style={{
                                    backgroundColor: '#d32f2f',
                                    width: '40%',
                                    margin: 25,
                                    height: 50,
                                    borderRadius: 10,
                                    flex: 1
                                }}>
                            <Text style={{
                                fontSize: 25,
                                fontFamily: 'Roboto-Regular',
                                letterSpacing: 2,
                                textAlign: 'center'
                            }}> RESET </Text>
                        </Button>
                        <Button block onPress={() => this.onFilter()}
                                style={{
                                    backgroundColor: '#f98b00',
                                    width: '40%',
                                    margin: 25,
                                    height: 50,
                                    borderRadius: 10,
                                    flex: 1
                                }}>
                            <Text style={{
                                fontSize: 25,
                                fontFamily: 'Roboto-Regular',
                                letterSpacing: 2,
                                textAlign: 'center'
                            }}> OKAY </Text>
                        </Button>

                    </View>

                </Modal>
            </Container>
        );


    }
}

export default Restaurantsscreen;

