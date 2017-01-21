import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';

import Heating from 'app/components/Heating/Heating';
import AC from 'app/components/AC/AC';
import SofaLED from 'app/components/SofaLED/SofaLED';
import FloorLED from 'app/components/FloorLED/FloorLED';

import styles from 'app/styles';
const backgroundImage = require('./assets/background.png');

function getTemperatureString (temperature) {
    return parseFloat(temperature).toFixed(1);
}

export default function Home ({
    items,
    dispatch,
}) {
    return (
        <Image
         source={backgroundImage}
         style={styles.background}>
            <ScrollView>
                <View
                 style={styles.container}>

                    <Text
                     style={styles.temperatureText}>
                        {getTemperatureString(items.get('TEMPERATURE'))} °C
                    </Text>

                    <Heating
                     onChange={(newValue) => dispatch('HEATING', newValue)}
                     value={items.get('HEATING')} />

                    <AC
                     onChange={(newValue) => dispatch('AC', newValue)}
                     value={items.get('AC')} />

                    <FloorLED
                     onChange={(newValue) => dispatch('LED_FLOOR', newValue)}
                     value={items.get('LED_FLOOR')} />

                    <SofaLED
                     onChange={(newValue) => dispatch('LED_SOFA', newValue)}
                     value={items.get('LED_SOFA')}  />

                </View>
            </ScrollView>
        </Image>
    );
}