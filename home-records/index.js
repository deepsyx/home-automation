const Record = require('immutable').Record;

// @todo: separate records to different files

const LedFloor = Record({
    r: 0,
    g: 0,
    b: 0,
    isEnabled: false,
});

const LedSofa = Record({
    value: 100,
    isEnabled: false,
});

const AC = Record({
    mode: 'heat',
    fanspeed: 'max',
    temperature: '30',
    isEnabled: false,
});

const Heating = Record({
    value: 0,
    isEnabled: false,
});

const Temperature = Record({
    temperature: 0,
});

const Data = Record({
    Temperature: new Temperature(),
    LedFloor: new LedFloor(),
    LedSofa: new LedSofa(),
    AC: new AC(),
    Heating: new Heating(),
});

module.exports = {
    Modules: {
        LedFloor,
        LedSofa,
        AC,
        Heating,
        Temperature,
    },
    Data,
};
