import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

const { pre, div, h1, } = hh(h);

import converterComponent from './converter.component';

export function appComponent(dispatch, state) {
    return div({ className: 'w-60 center' }, [
        h1(
            { className: 'f-subheadline lh-title tc white' },
            'Unit Converter'
        ),
        converterComponent(dispatch, state),
        // pre(
        //     { className: 'fixed top-0 left-1 bg-washed-yellow dark-pink pa3' },
        //     JSON.stringify(state, null, 2)
        // )
    ]);
}
