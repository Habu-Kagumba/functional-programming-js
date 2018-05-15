import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import formComponent from './form.component';
import mealComponent from './meals.component';

const { pre, div, h1, } = hh(h);

export function appComponent(dispatch, model) {
    return div({ className: 'w-third center' }, [
        h1(
            { className: 'f-subheadline lh-title bb purple' },
            'Calorie Counter'
        ),
        formComponent(dispatch, model),
        mealComponent(dispatch, model.meals),
        pre(
            { className: 'fixed top-0 left-1 bg-navy washed-yellow pa3' },
            JSON.stringify(model, null, 2)
        )
    ]);
}
