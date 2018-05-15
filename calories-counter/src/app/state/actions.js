export const initState = {
    description: '',
    calories: 0,
    showForm: false,
    nextId: 0,
    editId: null,
    meals: []
};

export const MSGS = {
    SHOW_FORM: 'SHOW_FORM',
    MEAL_INPUT: 'MEAL_INPUT',
    CALORIES_INPUT: 'CALORIES_INPUT',
    SAVE_MEAL: 'SAVE_MEAL',
    DELETE_MEAL: 'DELETE_MEAL',
    EDIT_MEAL: 'EDIT_MEAL'
};

export function showMealForm(showForm) {
    return {
        type: MSGS.SHOW_FORM,
        showForm
    };
}

export function mealInput(description) {
    return {
        type: MSGS.MEAL_INPUT,
        description
    };
}

export function caloriesInput(calories) {
    return {
        type: MSGS.CALORIES_INPUT,
        calories
    };
}

export const saveMeal = { type: MSGS.SAVE_MEAL };

export function deleteMeal(id) {
    return {
        type: MSGS.DELETE_MEAL,
        id
    };
}

export function editMeal(editId) {
    return {
        type: MSGS.EDIT_MEAL,
        editId
    };
}
