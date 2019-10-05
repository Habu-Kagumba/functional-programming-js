import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import * as R from 'ramda';

import { MEASURES, measuresTitles, measureUnits } from '../services';
import { selectedMeasure, inputValue, inputUnit } from '../state';

const { div, span, select, option, input, i } = hh(h);

const customColors = {
    'dark-navy': '#011535'
};

function converterOptions(selectedMeasure) {
    return R.map(
        unit => option({
            value: unit,
            selected: selectedMeasure === unit
        }, unit),
        measuresTitles()
    );
}

function unitOptions(measure, selectedUnit) {
    return R.map(
        unit => option({
            value: unit.abbr,
            selected: selectedUnit === unit.abbr,

        }, unit.singular),
        measureUnits(measure)
    );
}

function measureComponent(dispatch, currentMeasure) {
    return div(
        { className: 'w-100 fl relative mb5 center gold', style: `background-color: ${customColors['dark-navy']}` },
        [
            i({ className: `absolute f2 fa fa-${MEASURES[R.toLower(currentMeasure)]} gold`, style: 'left: 2rem; top: 1.8rem;' }),
            span({ className: 'absolute right-1 f7 fa fa-caret-up gold', style: 'bottom: 2.5rem;' }),
            span({ className: 'absolute right-1 f7 fa fa-caret-down gold', style: 'bottom: 2.1rem;' }),
            select(
                {
                    className: 'w-100 input-reset bg-transparent gold pa2 mt2 ba b--transparent f3 lh-copy',
                    style: 'height: 80px; text-indent: 40%',
                    onchange: (e) => dispatch(selectedMeasure(e.target.value))
                },
                converterOptions(currentMeasure)
            )
        ]
    );
}

function unitSection(dispatch, data, oninput, onchange) {
    return div(
        {
            className: `ph4 pv6 ${data.styles}`,
            style: `width: 49%; background: ${customColors['dark-navy']}`
        },
        [
            div(
                { className: 'w-100 relative' }, [
                    input(
                        {
                            className: 'f2 white mb4 pa2 input-reset w-100 bg-transparent outline-0 bt-0 br-0 bl-0 bb-2 b--gold',
                            type: 'text',
                            required: true,
                            value: data.value,
                            oninput
                        }
                    ),
                    span({ className: 'absolute right-1 f7 fa fa-caret-up gold', style: 'bottom: .8rem;' }),
                    span({ className: 'absolute right-1 f7 fa fa-caret-down gold', style: 'bottom: .4rem;' }),
                    select(
                        {
                            className: 'w-100 input-reset bg-transparent gold pa2 mt2 ba b--transparent',
                            onchange
                        },
                        unitOptions(data.measure, data.unit)
                    )
                ]
            )
        ]
    );
}

function converterComponent(dispatch, state) {
    const {
        measure,
        leftUnit,
        rightUnit,
        leftValue,
        rightValue
    } = state;

    return div(
        { className: 'w-90 center mt5 flex flex-wrap justify-center' },
        [
            measureComponent(dispatch, state.measure),
            div(
                { className: 'w-100 flex flex-row flex-wrap justify-between' },
                [
                    unitSection(
                        dispatch,
                        {
                            measure,
                            value: leftValue,
                            unit: leftUnit,
                            styles: 'fl'
                        },
                        e => dispatch(inputValue(e.target.value, 'left')),
                        e => dispatch(inputUnit(e.target.value, 'left'))
                    ),
                    unitSection(
                        dispatch,
                        {
                            measure,
                            value: rightValue,
                            unit: rightUnit,
                            styles: 'fr'
                        },
                        e => dispatch(inputValue(e.target.value, 'right')),
                        e => dispatch(inputUnit(e.target.value, 'right'))
                    )
                ]
            )
        ]
    );
}

export default converterComponent;
