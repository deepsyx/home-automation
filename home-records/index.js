const Record = require('immutable').Record;

const LedFloor = Record({
    record: 'LedFloor',
    r: 0,
    g: 0,
    b: 0,
    isEnabled: false,
});

const LedSofa = Record({
    record: 'LedSofa',
    value: 100,
    isEnabled: false,
});

const AC = Record({
    record: 'AC',
    mode: 'heat',
    fanspeed: 'max',
    temperature: '30',
    isEnabled: false,
});

const Heating = Record({
    record: 'Heating',
    value: 0,
    isEnabled: false,
});

const Temperature = Record({
    record: 'Temperature',
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