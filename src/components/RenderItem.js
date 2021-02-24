import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { editItem, delItem, status } from "../actions/TodosAction";
import { putData, deleteData } from "../services/Api";

const ItemRender = (props) => {

  const dispatch = useDispatch();

  const [changeType, setChangeType] = useState(false);
  const editTypeItem = () => {
    setChangeType(true);
  };
 
  const editRef = useRef();
  const handleEditItem = (e) => {
    putData(props.item.id , {title : editRef.current.value}).then(res => dispatch(editItem(res.data)))
  }

  const handleDel = () => {
    deleteData(props.item.id).then(res => dispatch(delItem(res.data)))
  }

  const handleStatus = () => {
    putData(props.item.id, {status : !props.item.status}).then(res => dispatch(status(res.data)))
  }

  const callAll = (e) => {
    e.preventDefault();
    setChangeType(false);
    handleEditItem();
  }

  return (
    <>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          onClick={handleStatus}
          key={props.item.status}
          defaultChecked={props.item.status}
        />
      </div>
      
      {changeType ? (
        <form className="Item" onSubmit={callAll} onBlur={callAll}>
          <input
            autoFocus
            ref={editRef}
            type="input"
            defaultValue={props.item.title}
            autoComplete="off"
            spellCheck="false"
        />
        </form>
      ) : ( <button onClick={handleStatus} className={`${props.item.status ? "done" : ""}`}> {props.item.title} </button> )}

      <div className="btn-icon-list">
        <i className="fas fa-edit btn-icon-edit" onClick={editTypeItem} />
        <i className="fas fa-trash btn-icon-remove" onClick={handleDel} />
      </div>
    </>
  );
};

export default ItemRender;
