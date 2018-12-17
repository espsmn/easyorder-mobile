import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default {
    header: {
        backgroundColor: '#545454',
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
    buttonsContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: width,
    },
    map: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        bottom: 0,
    },
    btn: {
        backgroundColor: '#f98b00',
        width: width - 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: height / 10,
        borderRadius: 10,
        marginBottom: 5,
        marginLeft: 5
    },

    text: {
        color: 'white',
        fontSize: 45,
        fontFamily: 'Roboto-Regular',
        letterSpacing: 8,

    },
    bodyProducts: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f7f7f7'
    },
    MainContainer:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },

    SplashScreen_RootView:
        {
            justifyContent: 'center',
            flex: 1,
            margin: 10,
            position: 'absolute',
            width: '100%',
            height: '100%',

        },

    SplashScreen_ChildView:
        {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00BCD4',
            flex: 1,
            margin: 20,
        },
    loader: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        heigt: height,
        width: width,
    },

    TouchableOpacity_Style: {

        width: 25,
        height: 25,
        top: 9,
        right: 9,
        position: 'absolute'

    },
    containerSplash: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#424242',
        width: width,
        height: height * 2
    },
    welcome: {
        fontSize: 40,
        textAlign: 'center',
        color: '#f98b00',
        fontFamily: 'ABOVE  - PERSONAL USE ONLY'
    },
};