import React from 'react';
import pureRender from 'pure-render-decorator';

import {
    Text,
    Image,
    View,
    StyleSheet,
} from 'react-native';

import {
    MKSlider,
} from 'react-native-material-kit';

import Card from 'app/components/Common/Card/Card';
import CardHeader from 'app/components/Common/CardHeader/CardHeader';
import ModeSwitch from './ModeSwitch/ModeSwitch';

import styles from './styles';

const DEGREE_LABELS = [16, 18, 20, 22, 24, 26, 28, 30];

function AC ({
    item,
    onChange,
}) {
    return (
        <Card>
            <CardHeader
             label="AC"
             icon={require('app/assets/icon_ac.png')}
             isEnabled={item.isEnabled}
             onChange={(state) => onChange(item.set('isEnabled', state))} />

            <View
             style={styles.container}>

                <View
                 style={styles.sliderContaner}>
                    <View
                     style={styles.slider}>
                        <MKSlider
                         thumbRadius={7}
                         trackLength={52}
                         lowerTrackColor="rgb(83,45,62)"
                         upperTrackColor="rgb(83,45,62)"
                         style={{ flex: 20 }}
                         min={16}
                         max={30}
                         value={parseInt(item.temperature)}
                         onChange={(newValue) => onChange(item.set('temperature', newValue))} />
                    </View>

                    <View
                     style={styles.degreeLabelContainer}>
                        {DEGREE_LABELS.map((item) => {
                            return (
                                <View
                                 style={styles.degreeLabelItem}
                                 key={item}>
                                    <Text
                                     style={styles.degreeLabelText}>
                                        {item}°
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </View>

                <View
                 style={styles.modeSwitchContainer}>
                    <ModeSwitch
                     value={item.mode}
                     onChange={(state) => onChange(item.set('mode', state))} />
                </View>

            </View>
        </Card>
    );
};

export default pureRender(AC);
