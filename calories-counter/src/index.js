import { diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

import { initState, reducer } from './app/state';
import { appComponent } from './app/views';

const localState = window.localStorage.getItem('mealApp');

const appState = localState ?
    JSON.parse(localState) :
    initState;

function app(reducer, view, node) {
    let state = appState;
    let currentView = view(dispatch, state);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);

    function dispatch(action) {
        state = reducer(action, state);
        window.localStorage.setItem('mealApp', JSON.stringify(state));
        const updatedView = view(dispatch, state);
        const patches = diff(currentView, updatedView);
        rootNode = patch(rootNode, patches);
        currentView = updatedView;
    }
}

const node = document.getElementById('app');

app(reducer, appComponent, node);
