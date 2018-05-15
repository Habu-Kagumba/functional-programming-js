import * as R from 'ramda';

import { MSGS } from './actions';

function add(action, state) {
    const { nextId, description, calories } = state;
    const meal = { id: nextId, description, calories };
    const meals = [...state.meals, meal];

    return {
        ...state,
        nextId: nextId + 1,
        showForm: false,
        description: '',
        calories: 0,
        meals
    };
}

function edit(action, state) {
    const { editId, description, calories } = state;
    const meals = R.map(meal => {
        return meal.id === editId ?
            { ...meal, description, calories } :
            meal;
    }, state.meals);

    return {
        ...state,
        editId: null,
        showForm: false,
        description: '',
        calories: 0,
        meals
    };
}

export function reducer(action, state) {
    switch (action.type) {
        case MSGS.SHOW_FORM: {
            const { showForm } = action;

            return {
                ...state,
                showForm,
                description: '',
                calories: 0
            };
        }
        case MSGS.MEAL_INPUT: {
            const { description } = action;

            return {
                ...state,
                description
            };
        }
        case MSGS.CALORIES_INPUT: {
            const calories = R.pipe(
                parseInt,
                R.defaultTo(0)
            )(action.calories);

            return {
                ...state,
                calories
            };
        }
        case MSGS.SAVE_MEAL: {
            const { editId } = state;
            return editId !== null ?
                edit(action, state) :
                add(action, state);
        }
        case MSGS.DELETE_MEAL: {
            const { id } = action;
            const meals = R.filter(
                meal => meal.id !== id,
                state.meals
            );

            return {
                ...state,
                meals
            };
        }
        case MSGS.EDIT_MEAL: {
            const { editId } = action;
            const meal = R.find(
                meal => meal.id === editId,
                state.meals
            );

            const { description, calories } = meal;

            return {
                ...state,
                editId,
                description,
                calories,
                showForm: true
            };
        }
    }

    return state;
}
