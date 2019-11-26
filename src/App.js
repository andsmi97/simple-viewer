import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ActionComponent from "./ActionComponent";
import agent from "./agent";
const useStyles = makeStyles(theme => ({
  paper: {
    margin: 24,
    padding: 16
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  actionComponent: {
    margin: 8
  }
}));
const App = () => {
  const classes = useStyles();
  const [actionGroups, setActionGroups] = useState([]);

  useEffect(() => {
    (async () => {
      const actions = await agent.Actions.getAll();
      setActionGroups(actions);
    })();
    //setActionGroups
  }, []);

  return (
    <div className="App">
      {actionGroups.map(actionGroup => {
        return (
          <Paper key={actionGroup.id} className={classes.paper}>
            <h2>{actionGroup.name}</h2>
            <div className={classes.actions}>
              {actionGroup.actions.map(action => {
                return (
                  <ActionComponent
                    key={action.id}
                    className={classes.actionComponent}
                    {...action}
                  >
                    {action.name}
                  </ActionComponent>
                );
              })}
            </div>
          </Paper>
        );
      })}
    </div>
  );
};

export default App;
