import React from 'react';
import pureRender from 'pure-render-decorator';

import {
    MKSlider,
} from 'react-native-material-kit';

function Slider (props) {
    return (
        <MKSlider
         thumbRadius={7}
         trackLength={52}
         lowerTrackColor="rgb(83,45,62)"
         upperTrackColor="rgb(83,45,62)"
         min={0}
         max={100}
         {...props} />
    );
};

export default pureRender(Slider);
