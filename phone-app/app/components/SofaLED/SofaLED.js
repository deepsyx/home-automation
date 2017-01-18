import React from 'react';

import {
  MKSlider,
} from 'react-native-material-kit';

import Card from 'app/components/Common/Card/Card';
import CardHeader from 'app/components/Common/CardHeader/CardHeader';

export default function ({
  value,
  onChange,
}) {
  return (
    <Card>
      <CardHeader
       label="Sofa light"
       icon={require('app/assets/icon_bulb.png')}
       isEnabled={value.get('isEnabled')}
       onChange={(state) => onChange(value.set('isEnabled', state))} />

      <MKSlider
       thumbRadius={7}
       trackLength={52}
       lowerTrackColor="rgb(83,45,62)"
       upperTrackColor="rgb(83,45,62)"
       min={0}
       max={100}
       value={parseInt(value.get('value'))}
       onChange={(newValue) => onChange(value.set('value', newValue))} />
    </Card>
  );
};