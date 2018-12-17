'use strict';
import React, {Component} from 'react';
import {Text, View, StatusBar, Image, TouchableOpacity} from 'react-native';
import {Button, Header, Left, Right, Body, Title, Icon, Container} from 'native-base';
import styles from "./Style";
import SideMenu from "../Drawer/SideMenu";
import {DrawerNavigator} from 'react-navigation';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {Dimensions} from 'react-native';

class Homescreen extends Component {
    constructor() {
        super()
        this.state = {
            isVisible: true,
            long: 0,
            lat: 0,
            data: []
        }
    }

    Hide_Splash_Screen = () => {
        this.setState({
            isVisible: false
        });
    }

    componentDidMount() {
        fetch('http://193.174.80.157:3000/api/locations/map?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzc4OTgwOTksImV4cCI6MTU0MDQ5MDA5OSwiYXVkIjoiRWFzeU9yZGVyLUFQUCJ9.cmkDDDUkeRWhEqqmKur8SfwM9mIrR2qihpDoDUgSxbc')
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    data: result
                })
            }).catch((error) => {
            console.log(error)
        })
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            let lat = (position.coords.latitude)
            let long = (position.coords.longitude)
            this.setState({long: long})
            this.setState({lat: lat})
        }, (error) => alert('GPS ist ausgeschaltet. Ihnen wird nicht die passende Auswahlregion angezeigt.'), {
            enableHighAccuracy: true,
            timeout: 5000
        })
        var that = this;
        setTimeout(function () {
            that.Hide_Splash_Screen();
        }, 2000);
    }

    render() {
        const coordinates = this.state.data[0] ? this.state.data : []
        let Splash_Screen = (
            <View style={styles.containerSplash}>
                <StatusBar barStyle="light-content" backgroundColor="#1b1b1b"/>
                <Text style={styles.welcome}> EasyOrder.</Text>
            </View>
        )
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon style={{fontSize: 35, color: 'white'}} active name="menu"/>
                        </Button>
                    </Left>
                    <Body>
                    <Text style={{
                        fontSize: 30,
                        textAlign: 'center',
                        margin: 10,
                        color: '#f98b00',
                        fontFamily: 'ABOVE  - PERSONAL USE ONLY'
                    }}>EasyOrder</Text>
                    </Body>
                </Header>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: this.state.lat ? this.state.lat : 49.795087,
                        longitude: this.state.long ? this.state.long : 9.936269,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}>
                    {coordinates.map((restaurant) => (
                        <Marker coordinate={{latitude: restaurant.geolat, longitude: restaurant.geolong}}
                                title={restaurant.restaurant_name}
                                description={restaurant.geschlossen ? 'Geschlossen' : 'Geöffnet'}
                                onCalloutPress={() => this.props.navigation.navigate('Details', {
                                    restaurantID: restaurant.r_id,
                                    long: restaurant.geolong,
                                    lat: restaurant.geolat
                                })}
                        />
                    ))}
                </MapView>
                <StatusBar backgroundColor="#383838" translucent={false}/>
                {(this.state.isVisible === true) ? Splash_Screen : null}
                <View style={styles.buttonsContainer}>
                    <Button style={styles.btn} onPress={() => this.props.navigation.navigate('Restaurantsscreen')}>
                        <Text style={styles.text}>HUNGER</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

export default DrawerNavigator(
    {
        Home: {screen: Homescreen}
    },
    {
        drawerBackgroundColor: 'hsla(350,50%,50%,0)',
        initialRouteName: 'Home',
        contentComponent: SideMenu,
        drawerWidth: 300,
    },
);