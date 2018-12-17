import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, Image, View, Alert, ImageBackground, StatusBar} from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import {
    Button,
    Header,
    Right,
    Left,
    Body,
    Title,
    Icon,
    Container,
    Content,
    List,
    ListItem,
    Thumbnail
} from 'native-base';

import styles from "./Style";

class SideMenu extends Component {

    render() {
        return (
            <Container style={styles.container}>
                <Text style={{
                    fontSize: 20,
                    margin: 10,
                    color: '#f98b00',
                    fontFamily: 'ABOVE  - PERSONAL USE ONLY'
                }}>EasyOrder</Text>
                <Content>
                    <List>
                        <ListItem icon>
                            <Left>
                                <Icon style={{fontSize: 25,color: "#f98b00"}} name="home"/>
                            </Left>
                            <Body>
                            <Text style={styles.text2}
                                  onPress={() => this.props.navigation.navigate('Home')}>Home</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon style={{fontSize: 25,color: "#f98b00"}} name="pricetags"/>
                            </Left>
                            <Body>
                            <Text style={styles.text2}
                                  onPress={() => this.props.navigation.navigate('Angebot')}>Angebote</Text>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}


export default SideMenu;