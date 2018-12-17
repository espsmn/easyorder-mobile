import {Dimensions, Image, ListView, StyleSheet, Text, View, TouchableOpacity, ImageBackground,} from 'react-native';

const {width} = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 250;
const STICKY_HEADER_HEIGHT = 55;

export default {
    container: {
        width: width,
        height: 200,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: window.width,
        justifyContent: 'center',
        backgroundColor: '#545454',
    },
    stickySectionText: {
        color: 'white',
        fontSize: 25,
        textAlign: "center",
        fontFamily: 'Roboto-Light',
        letterSpacing: 2
    },
    textdes: {
        color: '#5d5d5d',
        fontSize: 50,
        fontFamily: 'PoiretOne-Regular',
        letterSpacing: 2,
        lineHeight: 80
    },
    fixedSection: {
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: 'rgba(66, 66, 66,0.1)'
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 25,
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 80
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 30,
        paddingVertical: 5,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 25,
        paddingVertical: 5,

    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    },
    btn: {
        backgroundColor: '#7D7D7D',
        top: '152%'
    },
    text: {
        color: '#ffffff',
        fontSize: 35,
        fontWeight: 'bold',
    },
    imagebackground: {
        height: 150,
        width: null,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    loader: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}


