import React from 'react';

import Slider from 'app/components/Common/Slider/Slider';
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

            <Slider
             value={parseInt(item.value)}
             onChange={(newValue) => onChange(item.set('value', newValue))} />
        </Card>
    );
};