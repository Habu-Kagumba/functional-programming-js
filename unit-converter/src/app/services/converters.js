import * as R from 'ramda';
import convert from 'convert-units';

const MEASURES = [
    'temperature',
    'mass',
    'area',
    'volume',
    'time',
    'digital',
    'speed',
    'voltage',
    'power',
    'angle'
];

export function measuresTitles() {
    return R.map(
        R.compose(
            R.join(''),
            R.juxt([R.compose(R.toUpper, R.head), R.tail])
        ),
        MEASURES
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
