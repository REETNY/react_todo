import "../styles/ListItems.css";
import {CiEdit, CiSaveDown1} from "react-icons/ci"
import {AiFillDelete} from "react-icons/ai"

export default function ListItems({content, isDone, readAndWrite, category, handleCheck, id, handleDelete, handleContent, handleWrite, handleSave}){

    let changeText = {
        textDecoration: 'line-through'
    }

    // <input type="button" id="save" onClick={(e) => handleSave(id, e)} data-id={id} value="save" />
    // <button id="delete"  data-id={id} onClick={ () => handleDelete(id)} >delete</button>
    // <input type="button" id="edit" onClick={(e) => handleContent(id, e)} data-id={id} value="edit" />

    return (
        <div className="eachTodo">
            <label htmlFor={id} className="checker">
                <input type="checkbox" className="checkerIn" onChange={handleCheck} name="todoCompleted" id={id} checked={isDone} />
                <div className={category === "Personal" ? "Personal realCheck": "Business realCheck"}></div>
            </label>
            <span className="todoContent">
                <input onChange={(e) => handleWrite(e)} readOnly={readAndWrite} style={isDone ? changeText : null} type="text" value={content} name="eachContent" id="eachContent" data-id={id} />
            </span>
            <span className="controls">
                {readAndWrite === true && <CiEdit role="button" tabIndex="0" onClick={(e) => handleContent(id, e)} data-id={id} id="edit" />}
                {readAndWrite === false && <CiSaveDown1 role="button" tabIndex="0"  onClick={(e) => handleSave(id, e)} id="save" data-id={id} />}
                
                <AiFillDelete id="delete"  data-id={id} onClick={ () => handleDelete(id)} role="button" tabIndex="0" />
            </span>
        </div>
    )
}