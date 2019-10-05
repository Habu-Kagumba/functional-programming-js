import * as R from 'ramda';
import convert from 'convert-units';

export const MEASURES = {
    temperature: 'thermometer-three-quarters',
    mass: 'balance-scale',
    volume: 'cube',
    time: 'clock',
    digital: 'hdd',
    speed: 'tachometer-alt',
    voltage: 'bolt',
    power: 'power-off',
    angle: 'ruler-combined'
};

export function measuresTitles() {
    return R.map(
        R.compose(
            R.join(''),
            R.juxt([R.compose(R.toUpper, R.head), R.tail])
        ),
        R.keys(MEASURES)
    );
}

function processUnitDescription(unit) {
    return R.map(
        u => R.replace(/degree /, '', u),
        unit
    );
}

export function measureUnits(measure) {
    return R.compose(
        R.map(processUnitDescription),
        convert().list,
        R.toLower
    )(measure);
}

export function doUnitConversion(state) {
    const { leftValue, rightValue, leftUnit, rightUnit, sourceLeft } = state;

    const calcValue = sourceLeft ?
        convert(leftValue).from(leftUnit).to(rightUnit) :
        convert(rightValue).from(rightUnit).to(leftUnit);

    return sourceLeft ?
        { ...state, rightValue: calcValue } :
        { ...state, leftValue: calcValue };
}
