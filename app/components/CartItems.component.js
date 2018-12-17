import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';
import Swipeout from 'react-native-swipeout';

import {removeItem} from '../redux/actions/cartActions';

class CartItems extends Component {

    state = {
        activeRowKey: null
    }

    render() {
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                this.setState({activeRowKey: null})
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({activeRowKey: this.props.item.id})
            },
            right: [
                {
                    onPress: () => {
                        const deleteRow = this.state.activeRowKey;
                        Alert.alert(
                            'Info',
                            'Bist du sicher, dass du es entfernen möchtest?',
                            [
                                {text: 'Nein', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                {
                                    text: 'Ja', onPress: () => {
                                        this.props.removeItem({index: this.props.index, item: this.props.item})
                                    }
                                },
                            ],
                            {cancelable: true}
                        )
                    },
                    text: 'Entfernen', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        }
        const {item, index} = this.props;
        return (
            <Swipeout {...swipeSettings}>
                <View style={styles.container}>
                    <View style={styles.productDes}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>€ {(item.preis).toFixed(2)}</Text>
                    </View>
                </View>
            </Swipeout>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    productDes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },
    text: {
        fontSize: 25,
        padding: 5,
        fontFamily: 'Roboto-Light',
        letterSpacing: 2
    }
});

export default connect(null, {removeItem})(CartItems);
