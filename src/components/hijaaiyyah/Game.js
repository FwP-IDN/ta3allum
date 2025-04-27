import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Alert from "@material-ui/lab/Alert";
import "./Game.css";
import { Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';


import hijaaiyyah from "../../data/hijaaiyyah";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: (props) => ({
    fontSize: props.fontSize || 20,
  }),
}))((props) => <TableCell {...props} />);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: 0,
  },
  table: {
    minWidth: 700,
  },
});

const answerStatusEnum = {
  CORRECT: "✅",
  WRONG: "❌",
  EMPTY: "⚪",
};

const LocalStatusEnum = {
  ONGOING: "ONGOING",
  FINISHED: "FINISHED",
};


const Game = (props) => {

  const handleChooseAnswer = () =>  {

  }

  const classes = useStyles();

  const [status, setStatus] = useState(LocalStatusEnum.ONGOING);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  useEffect(() => {}, []);

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader={true} className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell fontSize={100} align="center">Question</StyledTableCell>
            <StyledTableCell fontSize={100} align="center">Status</StyledTableCell>
            <StyledTableCell fontSize={100} align="center">Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.quizzes.map((row, rowIdx) => (
              <StyledTableRow key={rowIdx}>
                <StyledTableCell align="center">{row.question}</StyledTableCell>
                <StyledTableCell align="center">Biawak</StyledTableCell>
                <StyledTableCell align="center">
                  <RadioGroup
                    aria-label="firstTurn"
                    name="firstTurn"
                    onChange={e => handleChooseAnswer()}
                  >
                    {
                      row.options.map(
                        option => <FormControlLabel value={option} control={<Radio />} label={option} />
                      )
                    }
                    
                  </RadioGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

Game.propTypes = {
  onReset: PropTypes.func,
  config: PropTypes.object,
};

Game.defaultProps = {
  onReset: () => {},
};

export default Game;
