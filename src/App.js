import './App.css';
import TextField from '@material-ui/core/TextField'; //text field element from Material UI framework
import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import firebase from "firebase";
import { db } from "./firebase_config";
import TodoListItem from "./Todo";

function App() {

  const [todos, setTodos] = useState([]); // setTodos function updates todos list
  /** variable: todoInput
   * function that updates variable: setTodoInput
   * useState(''): initial state */
  const [todoInput, setTodoInput] = useState("");
  const [noteInput, setNoteInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []); // blank to run only on first launch, when something happens to the value here -> calls inside of useEffect

  function getTodos() {
    db.collection("todo_tasks").onSnapshot(function (querySnapshot) { // reflected on real time database with onSnapshot
      setTodos(
        querySnapshot.docs.map((doc) => ({ //see all of the todos in this particular todo (map contains all these values, called later on to display)
          id: doc.id,
          inprogress: doc.data().inprogress,
          todo: doc.data().todo,
          notes: doc.data().notes
        }))
      );
    });
  }

  function addTodo(e) {
    e.preventDefault(); // prevents the page from reloading (when you press button, it will default: reload)

    // collection in firestore of todos
    db.collection("todo_tasks").add({
      inprogress: false,
      //timestamp: firebase.firestore.FieldValue.serverTimeStamp(), // get server timestamp from firebase
      todo: todoInput,
      notes: noteInput
    });

    setTodoInput("");
    setNoteInput("");
  }

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
          <h1>To-Do List</h1>

          <form>
            <TextField
              id="standard-basic"
              label="Write a To-Do Task"

              // detects when there are changes in text-field for todo task
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}

              style={{ maxWidth: "300px", width: "90vw" }}
            />

          <TextField
              id="standard-basic"
              label="Notes"

              // detects when there are changes in text-field for todo task
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}

              style={{ maxWidth: "300px", width: "90vw" }}
            />

            <Button
              type="submit"
              variant="contained"
              onClick={addTodo}
              //style={{ display: "none" }}
              >
              Submit
          </Button>
          </form>

          <div style={{ width: "90vw", maxWidth: "90%", marginTop: "24px", flexDirection: "row"}}>
          {todos.map((todo) => (
            <TodoListItem
              todo={todo.todo}
              inprogress={todo.inprogress}
              id={todo.id} 
              notes={todo.notes}
              /> // pass in value into this func in Todo.js
          ))}

        </div>
      </div>
    </div>
  );
}

export default App;

// style {{}} format the elements