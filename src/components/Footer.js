import "../styles/Footer.css"

export default function Footer({allTodos}){

    let currTodos = allTodos;

    let unCompleted = currTodos.filter((todo) => {
        return todo.completed === false ? todo : false
    })

    return(
        <div className="footerCont">
            <div className="footMsg">
                You have {unCompleted.length} of {currTodos.length} undone todo{currTodos.length > 1 ? "s" : ""}
            </div>
        </div>
    )
}