import "../styles/Form.css"
import { useState } from "react";

export default function Form({handleTodo, handleSubmit, formInput, formEntries}){

    let {newTodoEntry, type} = formEntries;

    let [styles, setStyles] = useState({
        transform: 'translateX(0px)'
    })

    function handleOut(ev){
        setStyles(
            () => {
                return {
                    transform: 'translateX(0px)'
                }
            }
        )
    }

    function handleMove(ev){
        if(newTodoEntry === "" || type === ""){

            let randomNum = Math.floor(Math.random() * 19 + 12);
            let sign = ["+", "-"];
            let anyNum = Math.floor(Math.random() * 2);

            let figure = (sign[anyNum]+randomNum);


            setStyles(
                () => {
                    return {
                        transform: `translateX(${figure}px)`
                    }
                }
            )
        }
    }

    return(
        <form action="" onSubmit={handleSubmit}>
            
            <span className="formCont">
                <input onChange={handleTodo} type="text" name="newTodoEntry" id="todoEntry" placeholder="Enter Todo" value={formInput.newTodoEntry}/>
                <span className="category">
                    <label htmlFor="cate1">
                        <input onChange={handleTodo} type="radio" name="type" id="cate1" value="Personal" checked={formInput.type === "Personal"} />
                        <span className="bubble personal"></span>
                        Personal
                    </label>
                    <label htmlFor="cate2">
                        <input onChange={handleTodo} type="radio" name="type" id="cate2" value="Business" checked={formInput.type === "Business"} />
                        <span className="bubble business"></span>
                        Business
                    </label>
                </span>
                <button style={styles} onMouseOut={(e) => handleOut(e)} onClick={(e) => handleMove(e)} type="submit" className="submitTodo">Checked</button>
            </span>

        </form>
    )

}