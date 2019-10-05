import * as R from 'ramda';

import { MEASURES, measuresTitles, measureUnits } from '../services';

const measure = R.head(measuresTitles());
const initUnit = R.head(measureUnits(measure)).abbr;

export const initState = {
    measure,
    leftUnit: initUnit,
    rightUnit: initUnit,
    leftValue: 0,
    rightValue: 0,
    iconTitle: MEASURES[R.toLower(measure)],
    sourceLeft: true
};

export const MSGS = {
    SELECT_MEASURE: 'SELECT_MEASURE',
    INPUT_LEFT_VALUE: 'INPUT_LEFT_VALUE',
    INPUT_RIGHT_VALUE: 'INPUT_RIGHT_VALUE',
    INPUT_LEFT_UNIT: 'INPUT_LEFT_UNIT',
    INPUT_RIGHT_UNIT: 'INPUT_RIGHT_UNIT'
};

export function selectedMeasure(measure) {
    return {
        type: MSGS.SELECT_MEASURE,
        measure
    };
}

export function inputValue(value, where) {
    return where === 'left' ?
        {
            type: MSGS.INPUT_LEFT_VALUE,
            value
        } :
        {
            type: MSGS.INPUT_RIGHT_VALUE,
            value
        };
}

export function inputUnit(value, where) {
    return where === 'left' ?
        {
            type: MSGS.INPUT_LEFT_UNIT,
            value
        } :
        {
            type: MSGS.INPUT_RIGHT_UNIT,
            value
        };
}
