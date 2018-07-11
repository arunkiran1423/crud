import React from 'react';

const Listitem= (props) =>{
    return(
        <li className="list-item"><button className="btn-sm mr-4 tn btn-info" onClick={props.editTodo}>U </button>{props.todo.name}
          <button className=" btn-sm ml-4 btn btn-danger" onClick={props.deleteTodo}>X </button> </li>
    )
}

export default Listitem;