import { diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

import { initState, reducer } from './app/state';
import { appComponent } from './app/views';

function app(reducer, view, node) {
    let state = initState;
    let currentView = view(dispatch, state);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);

    function dispatch(action) {
        state = reducer(action, state);
        const updatedView = view(dispatch, state);
        const patches = diff(currentView, updatedView);
        rootNode = patch(rootNode, patches);
        currentView = updatedView;
    }
}

const node = document.getElementById('app');

app(reducer, appComponent, node);
