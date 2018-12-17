import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default {
    container: {
        height: height,
        width: width,
        backgroundColor: '#f7f7f7'
    },
    loader: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContainer: {
        width: width,
        height: height / 3.5,
    },
    card: {
        flex: 1,
        backgroundColor: '#ffffff',
        height: height / 3.5,
        width: width
    },
}
