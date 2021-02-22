import * as actionTypes from "../actions/actionTypes";
import { v4 as uuidv4 } from "uuid";
import {createData, putData, deleteData} from "../services/Api";

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
            const valueTodos = {
                id : uuidv4(),
                title : action.payload,
                status : false
            }
            createData(valueTodos)
            return {
                ...state, dataTodos : [...state.dataTodos, valueTodos]
            }

        case actionTypes.EDIT_ITEM:
            putData(action.payload.id, action.payload)
            return {
                ...state, dataTodos : state.dataTodos.map(todo => (todo.id === action.payload.id) ? action.payload : todo)
            }

        case actionTypes.DEL_ITEM:
            deleteData(action.payload.id)
            return {
                ...state, dataTodos : state.dataTodos.filter( item => item.id !== action.payload.id)
            }

        case actionTypes.EDIT_STATUS:
            const Item = {id : action.payload.id, title : action.payload.title, status : !action.payload.status}
            putData(Item.id, Item) 
            return {
                ...state, dataTodos : state.dataTodos.map((item) => (item.id === action.payload.id ? Item : item))
            }

        case actionTypes.DEL_ALL:
            state.dataTodos.filter( item => item.status === true).map(item => deleteData(item.id) )
            return {
                ...state, dataTodos : state.dataTodos.filter( item => item.status !== true)
            }

        case actionTypes.CHECK_ALL: 
            if(action.payload){
                state.dataTodos.map( item => putData(item.id, {title : item.title, id: item.id, status : false}) )
                return {
                    ...state, dataTodos : state.dataTodos.map( item => ({title : item.title, id: item.id, status: false}))
                }
            }
            else{
                state.dataTodos.map( item => putData(item.id, {title : item.title, id: item.id, status : true}))
                return {
                    ...state, dataTodos : state.dataTodos.map( item => ({title : item.title, id: item.id, status: true}))
                }
            }

        default:
            return state;
    }
}
export default reducerTodos;
