import * as R from 'ramda';

import { MSGS } from './actions';
import { MEASURES, measureUnits, doUnitConversion } from '../services';

export function reducer(action, state) {
    switch (action.type) {
        case MSGS.SELECT_MEASURE: {
            const { measure } = action;
            const unit = R.head(measureUnits(measure)).abbr;

            return doUnitConversion({
                ...state,
                measure,
                leftUnit: unit,
                rightUnit: unit,
                iconTitle: MEASURES[R.toLower(measure)]
            });
        }
        case MSGS.INPUT_LEFT_VALUE: {
            const leftValue = R.compose(
                R.defaultTo(0),
                parseFloat
            )(action.value);

            return doUnitConversion({
                ...state,
                leftValue,
                sourceLeft: true
            });
        }
        case MSGS.INPUT_RIGHT_VALUE: {
            const rightValue = R.compose(
                R.defaultTo(0),
                parseFloat
            )(action.value);

            return doUnitConversion({
                ...state,
                rightValue,
                sourceLeft: false
            });
        }
        case MSGS.INPUT_LEFT_UNIT: {
            const { value: leftUnit } = action;

            return doUnitConversion({
                ...state,
                leftUnit
            });
        }
        case MSGS.INPUT_RIGHT_UNIT: {
            const { value: rightUnit } = action;

            return doUnitConversion({
                ...state,
                rightUnit
            });
        }
    }

    return state;
}
