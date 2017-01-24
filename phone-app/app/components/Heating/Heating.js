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
             label="Heating"
             icon={require('app/assets/icon_heat.png')}
             isEnabled={item.isEnabled}
             onChange={(newValue) => onChange(item.set('isEnabled', newValue))} />

            <MKSlider
             thumbRadius={7}
             trackLength={52}
             lowerTrackColor="rgb(83,45,62)"
             upperTrackColor="rgb(83,45,62)"
             style={{ flex: 20 }}
             min={0}
             max={100}
             value={parseInt(item.value)}
             onChange={(newValue) => onChange(item.set('value', newValue))} />
        </Card>
    );
};