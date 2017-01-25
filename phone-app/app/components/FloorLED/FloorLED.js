import React from 'react';
import tinycolor from 'tinycolor2';
import pureRender from 'pure-render-decorator';

import {
    StyleSheet,
    Text,
    View,
    Image,
    PanResponder,
} from 'react-native';

import {
    MKSlider,
} from 'react-native-material-kit';

import Card from 'app/components/Common/Card/Card';
import CardHeader from 'app/components/Common/CardHeader/CardHeader';

import styles from './styles';
import panBoilerplate from './panBoilerplate';

import icon_bulb from 'app/assets/icon_bulb.png';

class FloorLighting extends React.Component {
    componentWillMount () {
        this.state = {
            elemWidth: 0
        };

        this._panResponder = PanResponder.create({
            ...panBoilerplate,
            onPanResponderMove: (e, gestureState) => this.onPanMove(e, gestureState)
        });
    }

    onPanMove (evt, gestureState) {
        const pos = gestureState.moveX - 35;
        if (pos < 0 || pos > this.state.elemWidth) {
            return;
        }

        const percentage = pos / this.state.elemWidth * 100;

        const colors = new tinycolor({
            h: parseInt(percentage / 100 * 360),
            s: 100,
            v: 100
        }).toPercentageRgb();

        const newState = this.props.item
            .set('r', parseInt(colors.r))
            .set('g', parseInt(colors.g))
            .set('b', parseInt(colors.b));

        this.props.onChange(newState);
    }

    measureSliderWidth () {
        this.refs.slider.measure((fx, fy, width) => {
            const SIDE_PADDING = 15;
            this.state.elemWidth = width - SIDE_PADDING * 2;
        });
    }

    componentDidMount () {
        setTimeout(() => this.measureSliderWidth(), 0);
    }

    render () {
        const { item } = this.props;

        // colors are in percentage, so 100 * 2.5 = 255
        const color = new tinycolor({
            r: item.r * 2.5,
            g: item.g * 2.5,
            b: item.b * 2.5,
        }).toHsv();

        // hue range is [0, 360]
        const pos = (color.h / 360) * this.state.elemWidth;

        return (
            <Card>
                <CardHeader
                 label="Floor light"
                 icon={icon_bulb}
                 isEnabled={item.isEnabled}
                 onChange={(state) => this.props.onChange(this.props.item.set('isEnabled', state))} />

                <View
                 ref="slider"
                 style={styles.sliderContainer}
                 {...this._panResponder.panHandlers}
                 collapsable={false}>

                    <Image
                     style={styles.colorsImage}
                     resizeMode="stretch"
                     source={require('app/assets/color_picker.png')} />

                    <View
                     style={[
                        styles.sliderPoint,
                        { left: 7 + pos }
                     ]} />

                </View>
            </Card>
        );
    }
}

export default pureRender(FloorLighting);
