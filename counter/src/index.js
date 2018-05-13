import hh from 'hyperscript-helpers';
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

const { article, div, a }  = hh(h);

const initModel = 0;

function view(dispatch, model) {
    return article(
        { className: 'db w-25-ns w-90 h5 center mt6 pa3 pa4-ns tc mid-gray bg-light-gray' },
        [
            div({ className: 'f-subheadline lh-title' }, `Count: ${model}`),
            a(
                {
                    className: 'f6 link dim ba ph3 pv2 mb2 dib dark-green grow pointer mr4',
                    onclick: () => dispatch(MSGS.ADD)
                }, '+'),
            a(
                {
                    className: 'f6 link dim ba ph3 pv2 mb2 dib dark-pink grow pointer',
                    onclick: () => dispatch(MSGS.SUBTRACT)
                }, '-')
        ]
    );
}

const MSGS = {
    ADD: 'ADD',
    SUBTRACT: 'SUBTRACT'
};

function update(msg, model) {
    switch (msg) {
    case MSGS.ADD:
        return model + 1;
    case MSGS.SUBTRACT:
        return model - 1;
    default:
        return model;
    }
}

function app(initModel, update, view, node) {
    let model = initModel;
    let currentView = view(dispatch, model);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);

    function dispatch(msg) {
        model = update(msg, model);
        const updatedView = view(dispatch, model);
        const patches = diff(currentView, updatedView);
        rootNode = patch(rootNode, patches);
        currentView = updatedView;
    }
}

const rootNode = document.getElementById('app');

app(initModel, update, view, rootNode);
