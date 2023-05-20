import "../styles/Header.css"


export default function Header({user, handleName, openGreet, myBool}){

    let boolGreet;

    if(myBool === true && user === "User"){
        boolGreet = true
    }

    let openGreeting;

    if(user !== "User" && myBool === true){
        openGreeting = true
    }

    return(
        <div className="mainHead">
            <div className="title">Todo App</div>
            <div className="welcomeMsg">
                {openGreeting && <span className="message">{openGreet}</span>}
                {openGreet === "" && <span className="message">{user === "User" || user === "" ? "Welcome" : "look Around"}</span>}
                {boolGreet === true ? <span className="welcome">Welcome</span> : ""}
                <input type="text" value={user} placeholder="Kindly enter your name" onChange={(e) => handleName(e)} className="userName" />
            </div>
        </div>
    )
}