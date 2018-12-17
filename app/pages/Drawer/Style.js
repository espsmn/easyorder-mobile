import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default {
    container: {
        height: height,
        width: width,
        backgroundColor: '#1b1b1b'
    },
    text2: {
        color: '#ffffff',
        fontSize: 25,
        fontFamily: 'Roboto-Light'
    },
    icon: {
        width: 24,
        height: 24,
        position: 'absolute'
    },
    images: {
        height: 180,
        width: 180,
        marginLeft: "7%",
        marginTop: "2%",

    },
};