import React from 'react';
import pureRender from 'pure-render-decorator';

import {
    Image,
    Text,
    View,
    StyleSheet,
} from 'react-native';

import {
    MKButton,
    MKColor,
    MKSwitch,
    MKIconToggle,
    getTheme,
} from 'react-native-material-kit';

import styles from './styles';

function CardHeader ({
    isEnabled,
    label,
    icon,
    onChange,
}) {
    return (
        <View
         style={styles.container}>
            <View
             style={styles.iconContainer}>
                <Image
                 style={styles.icon}
                 resizeMode="contain"
                 source={icon} />
            </View>

            <View
             style={styles.labelContainer}>
                <Text
                 style={styles.label}>
                    {label}
                </Text>
            </View>

            <View
             style={styles.switchContainer}>
                <MKSwitch
                 style={styles.switchButton}
                 onColor="rgb(83,45,62)"
                 offColor="rgb(83,45,62)"
                 thumbOnColor="rgb(255,255,255)"
                 thumbOffColor="rgb(255,255,255)"
                 thumbRadius={7}
                 trackLength={36}
                 checked={isEnabled}
                 onCheckedChange={(e) => onChange(e.checked)}/>
            </View>
        </View>
    );
}

export default pureRender(CardHeader);
