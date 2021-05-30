import React from 'react'
import { ListItem, ListItemText, Button, ButtonBase } from "@material-ui/core";
import { db } from "./firebase_config";
import Collapse from '@material-ui/core/Collapse';

export default function TodoListItem({todo, inprogress, id, notes}) {

    function toggleInProgress() {
        db.collection("todo_tasks").doc(id).update({
            inprogress: !inprogress, // sets inprogress to false (indicates completed)
        });
    }

    function deleteTodo() {
        db.collection("todo_tasks").doc(id).delete();
      }

    return (
        <div style={{ display: "flex" }}>

        <ListItem
        >
          <ListItemText
            primary={todo}
            // if true, print "completed", else "in progress"
            secondary={inprogress ? "Completed" : "In progress"}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary={"notes: " + notes}
          />
        </ListItem>

        <Button onClick={toggleInProgress}>
            {inprogress? "Completed" : "In Progress"} 
        </Button>
        <Button onClick={deleteTodo}>X</Button>
        </div>
    );
}
