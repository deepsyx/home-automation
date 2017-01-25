import React, {
    Component,
} from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
    MKSpinner,
} from 'react-native-material-kit';

import styles from './styles';

export default function Loading () {
    return (
        <View style={styles.container}>
            <View>
                <MKSpinner
                 strokeWidth={5}
                 style={styles.spinner}
                />

                <Text style={{ fontSize: 20, marginTop: 30 }}>Connecting...</Text>
            </View>
        </View>
    );
}
