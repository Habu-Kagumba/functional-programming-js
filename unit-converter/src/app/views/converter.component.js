import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import * as R from 'ramda';

import { measuresTitles, measureUnits } from '../services';

const { div, span, select, option, input } = hh(h);

const customColors = {
    'dark-navy': '#000b1b'
};

function converterOptions(selectedMeasure) {
    return R.map(
        unit => option({ value: unit, selected: selectedMeasure === unit }, unit),
        measuresTitles()
    );
}

function unitOptions(measure, selectedUnit) {
    return R.map(
        unit => option({ value: unit.singular, selected: selectedUnit === unit.singular }, unit.singular),
        measureUnits(measure)
    );
}

function measureComponent(currentMeasure) {
    return div(
        { className: 'w-100 fl relative mb3 center gold', style: `background-color: ${customColors['dark-navy']}` },
        [
            span({ className: 'absolute fa fa-caret-up', style: 'top: 1.1rem; right: 1rem;' }),
            span({ className: 'absolute fa fa-caret-down', style: 'top: 1.5rem; right: 1rem;' }),
            select(
                { className: 'w-100 input-reset pa2 bg-transparent gold ba b--navy f2 fw6' },
                converterOptions(currentMeasure)
            )
        ]
    );
}

function unitSection(dispatch, measure, value, unit, styles) {
    return div(
        { className: `w-50 fl pa4 ${styles}` },
        [
            div(
                { className: 'w-100 relative navy' }, [
                    input(
                        {
                            className: 'pa2 input-reset w-100 bg-transparent hover-bg-gold ba b--navy',
                            type: 'text',
                            required: true,
                            value
                        }
                    ),
                    span({ className: 'absolute right-1 fa fa-angle-down', style: 'bottom: .6rem;' }),
                    select(
                        { className: 'w-100 input-reset bg-transparent hover-bg-gold navy hover-navy pa2 mt2 bb br0 b--navy' },
                        unitOptions(measure, unit)
                    )
                ]
            )
        ]
    );
}

function converterComponent(dispatch, state) {
    const {
        measure,
        fromUnit,
        toUnit,
        fromValue,
        toValue
    } = state;

    return div(
        { className: 'w-90 center mt5 flex flex-wrap justify-center' },
        [
            measureComponent(state.measure),
            // unitSection(
            //     dispatch,
            //     measure,
            //     fromValue,
            //     fromUnit,
            //     'bg-near-white'
            // ),
            // unitSection(
            //     dispatch,
            //     measure,
            //     toValue,
            //     toUnit,
            //     'bg-light-gray'
            // )
        ]
    );
}

export default converterComponent;
