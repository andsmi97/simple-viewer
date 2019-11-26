import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Switch from "@material-ui/core/Switch";
import agent from "./agent";

const ActionComponents = {
  Button,
  Slider,
  Switch
};

const useStyles = makeStyles(theme => ({
  actionComponent: {
    margin: 8
  }
}));

const ActionComponent = props => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const Component = ActionComponents[props.action_type];
  const onChange = async (e, newValue) => {
    setValue(newValue);
    try {
      await agent.Actions.onChange(props.id, newValue);
    } catch (err) {
      console.error(err);
    }
  };
  const onClick = async e => {
    if (props.action_type !== "Switch") {
      try {
        await agent.Actions.onClick(props.id);
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <Component
      key={props.id}
      value={value}
      className={classes.actionComponent}
      {...props.props}
      onChange={onChange}
      onClick={onClick}
    >
      {props.name}
    </Component>
  );
};

export default ActionComponent;
