import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    background: {
        backgroundColor: "rgb(193,179,185)",
        borderRadius: 15,
        width: 46,
        height: 22,
        margin: 5
    },

    circle: {
        width: 27,
        height: 27,
        backgroundColor: "rgb(117, 46, 62)",
        borderRadius: 20,
        margin: 2,
        position: 'absolute'
    },

    iconHot: {
        width: 14,
        position: 'absolute',
        marginTop: -14,
        marginLeft: 9
    },

    iconCold: {
        width: 14,
        position: 'absolute',
        marginTop: -2,
        marginLeft: 32
    },
});
