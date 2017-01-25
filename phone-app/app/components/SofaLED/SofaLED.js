import React from 'react';
import pureRender from 'pure-render-decorator';

import Slider from 'app/components/Common/Slider/Slider';
import Card from 'app/components/Common/Card/Card';
import CardHeader from 'app/components/Common/CardHeader/CardHeader';

function SofaLED ({
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

            <Slider
             value={parseInt(item.value)}
             onChange={(newValue) => onChange(item.set('value', newValue))} />
        </Card>
    );
};

export default pureRender(SofaLED);
