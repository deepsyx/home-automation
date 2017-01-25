import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
    container: {
        padding : 0,
        flexDirection: 'row',
        flex: 1,
    },

    iconContainer: {
        flex: 5,
        marginTop: 14,
    },

    labelContainer: {
        padding: 13,
        flex: 32,
    },

    switchContainer: {
        flex: 10,
    },

    icon: {
        height: 21,
    },

    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(83,45,62)',
    },

    activeTitle: {
        color: 'red',
    },

    switchButton: {
        padding: 0,
        marginBottom: 0,
        marginTop: 10,
    },
});
