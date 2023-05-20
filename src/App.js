import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import ListItems from './components/ListItems';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  /* userName funtions */
  let [userName, setUserName] = useState(localStorage.getItem('reactUser') || "User");
  let [greeting, setGreeting] = useState("Welcome Back")
  let [bool, setBool] = useState(false)


  useEffect(
    () => {
      setTimeout((userName) => {
        setGreeting(() => "Take a look")
      }, 2500)

      setBool(
        (oldBool) => true
      )

    },[])

  function changeName(ev){

    let {value} = ev.target;
    setUserName(
      (oldName) => {
        return value
      }
    )

    setBool(
      () => false
    )

    setGreeting(
      (oldheet) => {
        return ""
      }
    )

    localStorage.setItem("reactUser", value);
  }




  /* todo app functions and state*/
  let [currentEntry, setCurrentEntry] = useState({
    newTodoEntry: "",
    completed: false,
    type: "",
    justRead: true,
    id: "",
  });

  let [currentTodos, setTodos] = useState(JSON.parse(localStorage.getItem("myTodos")) || []);

  function handleEntry(event){
    const {name, value} = event.target;
    setCurrentEntry(
      (oldEntry) => {
        return {
          ...oldEntry,
          [name]: value,
          id: (currentTodos.length + 1)
        }
      }
    )
  }


  function handleForm(e){
    e.preventDefault();

    if(currentEntry.newTodoEntry === "" || currentEntry.type === "")return;


    setTodos(
      (oldTodos) => {
        return [currentEntry, ...oldTodos];
      }
    )

    setCurrentEntry(
      () => {
        return {
          newTodoEntry: "",
          completed: false,
          type: "",
          justRead: true,
          id: "",
        }
      }
    );

  }

  /* generate and edit new content */

  function getNewContent(ev){
    const {value} = ev.target;
    let numId = parseFloat(ev.target.attributes["data-id"].nodeValue);
    
    setTodos(
      (oldTodos) => {
        return oldTodos.map((todo) => {
          return todo.id === numId ? {...todo, newTodoEntry: value} : todo;
        })
      }
    )
  }

  /* edit and save functions */

  function changeContent(id, e){
      let numId = parseFloat(id);
      let initialValue = (e.target.id);

      let checkFilter = currentTodos.filter((todo)  => {
        return todo.id === numId
      })

      console.log(checkFilter, initialValue)

      if(checkFilter[0].completed === true)return;
      
      if(initialValue === "edit"){

        setTodos(
          (oldTodos) => {
            return oldTodos.map((todo) => {
              return todo.id === numId ? {...todo, justRead: false} : todo
            })
          }
        )
      }

    }

    function saveContent(id, e){
      let numId = parseFloat(id);
      let initialValue = (e.target.id)
      
      if(initialValue === "save"){

        setTodos(
          (oldTodos) => {
            return oldTodos.map((todo) => {
              return todo.id === numId ? {...todo, justRead: true} : todo
            })
          }
        )
      }
    }

    /* edit and save functions */

  /* delete function */

  function deleteTodo(id){
    
    setTodos(
      (oldTodos) => {
        return oldTodos.filter((todo) => {
          return todo.id !== parseFloat(id) ? todo : false;
        })
      }
    )

  }

  /* delete function */
  

  /* completed function */

  function handleDone(event){
    let {id, checked} = event.target;
    let numId = parseFloat(id);
    setTodos((oldTodos) => {
      return oldTodos.map((item) => {
        return item.id === numId ? {...item, completed: checked} : item;
      })
    })
  }

  /* completed function */

  localStorage.setItem("myTodos", JSON.stringify(currentTodos))

  let todoList = currentTodos.map((todo) => {
    return <ListItems content={todo.newTodoEntry} handleCheck={handleDone} isDone={todo.completed} readAndWrite={todo.justRead} category={todo.type} key={todo.id} id={todo.id} handleDelete={deleteTodo} handleContent={changeContent} handleWrite={getNewContent} handleSave={saveContent} />
  })




  return (
    <div className="App">
      <Header user={userName} handleName={changeName} openGreet={greeting} myBool={bool} />
      <Form handleTodo={handleEntry} formInput={currentEntry} handleSubmit={handleForm} formEntries={currentEntry} />
      <div className="todosCont">
        <div className="contHead">TodoList</div>
        {currentTodos.length < 1 && <div className="noTodos">You currently have no todo!</div> }
        {todoList}
      </div>
      <Footer allTodos={currentTodos} />
    </div>
  );
}

export default App;
