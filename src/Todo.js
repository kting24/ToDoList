import React from 'react'
import { ListItem, ListItemText, Button, ButtonBase } from "@material-ui/core";
import { db } from "./firebase_config";
import Collapse from '@material-ui/core/Collapse';

export default function TodoListItem({todo, inprogress, id, notes, priority, deadline}) {

    function toggleInProgress() {
        db.collection("todo_tasks").doc(id).update({
            inprogress: !inprogress, // sets inprogress to false (indicates completed)
            if (!inprogress) { // if task is marked complete
              this.setState({color:'green'});
            } else { // if task is marked incomplete
              this.setState({color:'red'});
            }
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

        <div style={{ width: "190%" }}>
        <ListItem>
          <ListItemText
            primary={"notes: " + notes}
          />
        </ListItem>
        </div>

        <ListItem>
          <ListItemText
            primary={priority}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary={"deadline: " + deadline}
          />
        </ListItem>

        <Button onClick={toggleInProgress} style={{marginLeft: "100px"}}>
            {inprogress? "Completed" : "In Progress"}
        </Button>
        <Button onClick={deleteTodo}>
          X
          </Button>
        </div>
    );
}
