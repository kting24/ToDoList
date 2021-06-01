import React from 'react'
import { ListItem, ListItemText, Button, ButtonBase } from "@material-ui/core";
import { db } from "./firebase_config";
import Collapse from '@material-ui/core/Collapse';

export default function TodoListItem({todo, inprogress, id, notes, priority, deadline}) {

    function toggleInProgress(event) {
        db.collection("todo_tasks").doc(id).update({
            inprogress: !inprogress // sets inprogress to false (indicates completed)
        });
    }

    function deleteTodo() {
        db.collection("todo_tasks").doc(id).delete();
      }

    return (
        <div style={{ display: "flex"}}>

        <ListItem>
          <ListItemText
            style={{ width: "190%", display: "flex", flexDirection: "column" }}
            primary={todo}
            // if true, print "completed", else "in progress"
            secondary={inprogress ? "Completed" : "In progress"}
          />
        </ListItem>

        <div style={{ width: "190%", display: "flex", flexDirection: "column" }}>
        <ListItem>
          <ListItemText 
            style={{ width: "190%", display: "flex", flexDirection: "column"}}
            primary={"notes: " + notes}
          />
        </ListItem>
        </div>

        <ListItem>
          <ListItemText
            primary={"priority: " + priority}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary={"deadline: " + deadline}
          />
        </ListItem>

        <Button id="progress" onClick={toggleInProgress} style={{}}>
            {inprogress? "Completed" : "In Progress"}
        </Button>

        <Button onClick={deleteTodo}>
          X
        </Button>
        </div>
    );
}

