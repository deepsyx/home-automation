import React from 'react';

import {
    MKSlider,
} from 'react-native-material-kit';

import Card from 'app/components/Common/Card/Card';
import CardHeader from 'app/components/Common/CardHeader/CardHeader';

export default function ({
    item,
    onChange,
}) {
    return (
        <Card>
            <CardHeader
             label="Sofa light"
             icon={require('app/assets/icon_bulb.png')}
             isEnabled={item.isEnabled}
             onChange={(state) => onChange(item.set('isEnabled', state))} />

            <MKSlider
             thumbRadius={7}
             trackLength={52}
             lowerTrackColor="rgb(83,45,62)"
             upperTrackColor="rgb(83,45,62)"
             min={0}
             max={100}
             value={parseInt(item.value)}
             onChange={(newValue) => onChange(item.set('value', newValue))} />
        </Card>
    );
};