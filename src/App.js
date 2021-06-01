import './App.css';
import TextField from '@material-ui/core/TextField'; //text field element from Material UI framework
import { useState, useEffect, classes } from 'react';
import { Button, Menu } from '@material-ui/core';
import { db } from "./firebase_config";
import TodoListItem from "./Todo";
import MenuItem from '@material-ui/core/MenuItem';

import MuiMenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import * as firebase from 'firebase/app'
import DateTimePicker from 'react-datetime-picker';

import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function App() {

  const [todos, setTodos] = useState([]); // setTodos function updates todos list
  /** variable: todoInput
   * function that updates variable: setTodoInput
   * useState(''): initial state */
  const [todoInput, setTodoInput] = useState("");
  const [noteInput, setNoteInput] = useState("");

  const [priorityInput, setPriorityInput] = useState("");
  //const [deadlineInput, setDeadlineInput] = useState("");

  const [deadlineInput, setDeadlineInput] = useState(new Date());

  const options = [
    'High',
    'Medium',
    'Low'
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const MenuItem = withStyles({
    root: {
      justifyContent: "flex-end"
    }
  })(MuiMenuItem);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    setPriorityInput(options[index]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getTodos();
  }, []); // blank to run only on first launch, when something happens to the value here -> calls inside of useEffect

  function convertTimestamp(timestamp) {
    let date = timestamp.toDate();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();

    date = mm + '/' + dd + '/' + yyyy;
    return date;
  }

  function getTodos() {
    db.collection("todo_tasks").onSnapshot(function (querySnapshot) { // reflected on real time database with onSnapshot
      setTodos(
        querySnapshot.docs.map((doc) => ({ //see all of the todos in this particular todo (map contains all these values, called later on to display)
          id: doc.id,
          inprogress: doc.data().inprogress,
          todo: doc.data().todo,
          notes: doc.data().notes,
          priority: doc.data().priority,
          deadline: convertTimestamp(doc.data().deadline)
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
      notes: noteInput,
      priority: priorityInput,
      deadline: deadlineInput
    });

    setTodoInput("");
    setNoteInput("");
    setPriorityInput("Medium");
    setDeadlineInput(new Date());
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

        <form style={{
          display: "flex",
          flexDirection: "row",
        }}>
          <TextField
            required
            id="standard-basic"
            label="Write a To-Do Task"

            // detects when there are changes in text-field for todo task
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}

            style={{ maxWidth: "300px", width: "90vw", marginRight: "10px" }}
          />

          <TextField
            id="standard-basic"
            label="Notes"

            // detects when there are changes in text-field for todo task
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}

            style={{ maxWidth: "300px", width: "90vw" }}
          />

          <List style={{ padding: "0px", margin: "0px", maxWidth: "150px", width: "45vw" }}>
            <ListItem
              button
              onClick={handleClickListItem}
            >
              <ListItemText primary="Priority Level" secondary={options[selectedIndex]} />
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            style={{ maxWidth: "150px", width: "45vw" }}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>


          <DateTimePicker
            onChange={setDeadlineInput}
            value={deadlineInput}
          />

          <Button
            type="submit"
            variant="contained"
            onClick={addTodo}
            style={{ margin: "20px" }}
          >
            Submit
          </Button>
        </form>

        <div style={{ width: "90vw", maxWidth: "90%", marginTop: "24px", flexDirection: "row" }}>
          {todos.map((todo) => (
            <TodoListItem
              todo={todo.todo}
              inprogress={todo.inprogress}
              id={todo.id}
              notes={todo.notes}
              priority={todo.priority}
              deadline={todo.deadline}
            /> // pass in value into this func in Todo.js
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;

// style {{}} format the elements
/**
 *    <TextField
            id="select" label="Priority" value="medium"
            select>
            <MenuItem value="high"
              onClick={(e) => setPriorityInput("High")}
            >High</MenuItem>
            <MenuItem value="medium"
              onClick={(e) => setPriorityInput("Medium")}
            >Medium</MenuItem>
            <MenuItem value="low"
              onClick={(e) => setPriorityInput("Low")}
            >Low</MenuItem>

          </TextField>

            <TextField
            id="datetime-local"
            label="Deadline"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            //className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            //onChange={(e) => setNoteInput(e.target.value)}
          />
 */
