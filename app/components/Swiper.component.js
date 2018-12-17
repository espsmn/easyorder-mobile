import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image
} from 'react-native';
import Swiper from 'react-native-swiper';

const {width} = Dimensions.get('window')
import {Buffer} from 'safe-buffer'
import {PacmanIndicator} from 'react-native-indicators'

const renderPagination = (index, total, context) => {
    return (
        <View style={styles.paginationStyle}>
            <Text style={{color: 'grey'}}>
                <Text style={styles.paginationText}>{index + 1}</Text>/{total}
            </Text>
        </View>
    )
}

export default class SwiperComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            logo: ''
        }
    }

    render() {
        const pictures = this.props.pictures || []
        let content = pictures.map((picture) => (
              <View style={styles.slide}>
                  <Image style={styles.image}
                         source={{uri: 'data:image/jpeg;base64,' + Buffer.from(picture.file.data, 'binary').toString('base64')}}/>
              </View>
          ))
        return (
            <Swiper
                style={styles.wrapper}
                renderPagination={renderPagination}
                loop={false}
            >

                {content}
            </Swiper>
        )
    }
}

const styles = {
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
    width,
        flex: 1
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    paginationText: {
        color: 'white',
        fontSize: 20
    },
    loader: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}