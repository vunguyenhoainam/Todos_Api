import * as actionTypes from "../actions/actionTypes";

const initialState = {
    dataTodos : []
};
 
const reducerTodos = (state = initialState , action) => {

    switch (action.type) {

        case actionTypes.DATA_APP:
            return {
                ...state, dataTodos : action.payload
            }

        case actionTypes.ADD_ITEM:
            return {
                ...state, dataTodos : [...state.dataTodos, action.payload]
            }

        case actionTypes.EDIT_ITEM:
            return {
                ...state, dataTodos : state.dataTodos.map(todo => (todo.id === action.payload.id) ? action.payload : todo)
            }

        case actionTypes.DEL_ITEM:
            return {
                ...state, dataTodos : state.dataTodos.filter( item => item.id !== action.payload)
            }

        case actionTypes.EDIT_STATUS:
            return {
                ...state, dataTodos : state.dataTodos.map((item) => (item.id === action.payload.id ? action.payload : item))
            }

        default:
            return state;
    }
}
export default reducerTodos;
