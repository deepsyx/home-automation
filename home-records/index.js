import Immutable, { Record } from 'immutable';

class LedFloor extends Record({
    record: 'LedFloor',
    r: 0,
    g: 0,
    b: 0,
    isEnabled: false,
}) {}

class LedSofa extends Record({
    record: 'LedSofa',
    value: 100,
    isEnabled: false,
}) {}

class AC extends Record({
    record: 'AC',
    mode: 'heat',
    fanspeed: 'max',
    temperature: '30',
    isEnabled: false,
}) {}

class Heating extends Record({
    record: 'Heating',
    value: 0,
    isEnabled: false,
}) {}

class Temperature extends Record({
    record: 'Temperature',
    value: 0,
}) {}

const Modules = {
    LedFloor,
    LedSofa,
    AC,
    Heating,
    Temperature
};

class Data extends Immutable.Record({
    temperature: new Temperature(),
    ledFloor: new LedFloor(),
    ledSofa: new LedSofa(),
    AC: new AC(),
    heating: new Heating(),
}) {}

module.exports = {
    Modules,
    Data
};