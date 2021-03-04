import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { editItemThunk, statusThunk, delItemThunk } from "../actions/TodosAction";

const ItemRender = (props) => {

  const dispatch = useDispatch();

  const [changeType, setChangeType] = useState(false);
  const editTypeItem = () => {
    setChangeType(true);
  };
 
  const editRef = useRef();
  const handleEditItem = (e) => {
    dispatch(editItemThunk({id : props.item.id, title : editRef.current.value, status : props.item.status}))
  }

  const handleDel = () => {
    dispatch(delItemThunk(props.item.id))
  }

  const handleStatus = () => {
    dispatch(statusThunk({id : props.item.id, title : props.item.title ,status : !props.item.status}))
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
