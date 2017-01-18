import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import styles from './styles';

export default function ({
	children,
}) {
  	return (
        <View style={styles.container}>
            {children}
        </View>
  	);
};