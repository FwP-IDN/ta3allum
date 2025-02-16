import React from "react";
import Home from "./components/Home";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppBar, Toolbar, Typography, Link } from "@material-ui/core";

import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100vw",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.root}>
            <Link color="inherit" href="/">
              Home
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/" exact component={Home} />
        {/* add more route */}
      </Switch>
    </Router>
  );
}
