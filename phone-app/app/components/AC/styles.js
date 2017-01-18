import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        marginBottom: 15
    },

    sliderContaner: {
        flex: 12,
        flexDirection: 'column'
    },

    slider: {
        flex: 1
    },

    degreeLabelContainer: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        marginTop: 24,
        paddingLeft: 15
    },

    degreeLabelItem: {
        flex: 1
    },

    degreeLabelText: {
        fontSize: 10,
        color: "rgb(83,45,62)"
    },

    modeSwitchContainer: {
        flex: 3
    },
});
