import React from 'react';
import pureRender from 'pure-render-decorator';

import {
  StyleSheet,
  View,
} from 'react-native';

import styles from './styles';

function Card ({
    children,
}) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

export default pureRender(Card);
