import * as actionTypes from "./actionTypes";
import { createData, putData, deleteData, getData } from "../services/Api";


export const dataAppThunk = () => async (dispatch) => {
    const data = await getData().then(res => res.data);
    dispatch(dataApp(data));
}
export const dataApp = (data) => {
    return {
        type : actionTypes.DATA_APP,
        payload : data
    }
}

export const addItemThunk = (item) => async (dispatch) => {
    const data = await createData(item).then(res => res.data);
    dispatch(addItem(data));
}
export const addItem = (data) => {
    return {
        type : actionTypes.ADD_ITEM,
        payload : data
    }
}

export const editItemThunk = (item) => async (dispatch) => {
    const data = await putData(item.id,item).then(res => res.data);
    dispatch(editItem(data));
}
export const editItem = (data) => {
    return {
        type : actionTypes.EDIT_ITEM,
        payload : data
    }
}

export const delItemThunk = (item) => async (dispatch) => {
    const data = await deleteData(item);
    dispatch(delItem(item))
}
export const delItem = (data) => {
    return {
        type : actionTypes.DEL_ITEM,
        payload : data
    }
}

export const statusThunk = (item) => async (dispatch) => {
    const data = await putData(item.id,item).then(res => res.data);
    dispatch(status(data))
}
export const status = (data) => {
    return {
        type : actionTypes.EDIT_STATUS,
        payload : data
    }
}
