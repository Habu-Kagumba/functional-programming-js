import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import { showMealForm, mealInput, caloriesInput, saveMeal } from '../state';

const { div, a, form, fieldset, label, input } = hh(h);

function inputField(labelText, inputValue, oninput) {
    return div(
        { className: 'mt3' },
        [
            label({ className: 'db fw6 f6 lh-copy purple' }, labelText),
            input(
                {
                    className: 'pa2 input-reset ba bg-transparent purple hover-bg-purple hover-washed-yellow w-100',
                    type: 'text',
                    value: inputValue,
                    required: true,
                    oninput
                }
            )
        ]
    );
}

function buttonSet(dispatch) {
    return div(
        { className: 'mb3' },
        [
            input(
                {
                    className: 'input-reset f6 ba b--purple ph3 pv2 mb2 dib washed-yellow bg-purple pointer grow',
                    type: 'submit'
                },
                'Save Meal'
            ),
            a(
                {
                    className: 'f6 link dim ba ph3 pv2 ml2 mb2 dib dark-pink pointer grow',
                    onclick: () => dispatch(showMealForm(false))
                },
                'Cancel'
            )
        ]);
}

function formComponent(dispatch, model) {
    const { description, calories, showForm } = model;

    if (showForm) {
        return form(
            {
                className: 'center w-90 animated fadeIn',
                onsubmit: e => {
                    e.preventDefault();

                    dispatch(saveMeal);
                }
            },
            [
                fieldset(
                    { className: 'ba b--transparent ph0 mh0' },
                    [
                        inputField('Meal', description,
                            e => dispatch(mealInput(e.target.value))),
                        inputField('Calories', calories || '',
                            e => dispatch(caloriesInput(e.target.value)))
                    ]
                ),
                buttonSet(dispatch)
            ]
        );
    }

    return a(
        {
            className: 'f6 link dim ba ph3 pv2 ml2 mb2 dib purple pointer grow',
            onclick: () => dispatch(showMealForm(true))
        },
        'Add Meal'
    );
}

export default formComponent;
