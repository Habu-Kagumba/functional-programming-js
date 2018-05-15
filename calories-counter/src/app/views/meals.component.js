import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import * as R from 'ramda';

import { deleteMeal, editMeal } from '../state';

const { div, table, thead, th, tbody, tr, td, i } = hh(h);

function mealTableHeader() {
    return thead([
        tr({ className: 'bg-purple' },
            [
                th(
                    { className: 'washed-yellow fw2 tl pa3' },
                    'Meal'
                ),
                th(
                    { className: 'washed-yellow fw2 tr pa3' },
                    'Calories'
                ),
                th()
            ])
    ]);
}

function mealTableBody(dispatch, meals) {
    const mealRow = meal => {
        return tr(
            { className: 'purple bg-washed-yellow hover-bg-washed-blue' },
            [
                td({ className: 'pa3 tl' }, meal.description),
                td({ className: 'pa3 tr' }, meal.calories),
                td(
                    {
                        className: 'pa3 tc pointer'
                    },
                    [
                        i({
                            className: 'mr2 dim far fa-edit',
                            onclick: () => dispatch(editMeal(meal.id))
                        }),
                        i({
                            className: 'dim far fa-trash-alt',
                            onclick: () => dispatch(deleteMeal(meal.id))
                        })
                    ])
            ]
        );
    };

    return tbody('', R.map(mealRow, meals));
}

function mealTableFooter(meals) {
    const total = R.compose(
        R.sum,
        R.map(R.prop('calories'))
    )(meals);

    return tr(
        { className: 'washed-yellow bg-purple f1 lh-title' },
        [
            td({ className: 'tl pa3' }, 'Total:'),
            td({ className: 'tr pa3' }, total),
            td()
        ]
    );
}

function mealComponent(dispatch, meals) {
    if (meals.length === 0) {
        return div(
            { className: 'w-80 center mt5 pa5 bg-washed-yellow purple tc f2 lh-copy' },
            'No meals present...'
        );
    }
    return div(
        { className: 'pa2' },
        [
            table(
                { className: 'w-100 center', cellSpacing: 0 },
                [
                    mealTableHeader(),
                    mealTableBody(dispatch, meals),
                    mealTableFooter(meals)
                ]
            )
        ]
    );
}

export default mealComponent;
