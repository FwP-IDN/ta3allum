import React, { 
  useState,
  useEffect } from "react";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./Game.css";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import hijaaiyyah from "../../data/hijaaiyyah";


// import hijaaiyyah from "../../data/hijaaiyyah";

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

  const answerMap = new Map(hijaaiyyah);

  const handleChooseAnswer = (questionNum, chosenAnswer) =>  {
    const question = props.quizzes[questionNum].question;
    const correctAnswer = answerMap.get(question)
    const answersState = [
      ...gameState.answers.slice(0, questionNum),
      {
        chosenOption: chosenAnswer,
        status: chosenAnswer === '' ? answerStatusEnum.EMPTY:
                chosenAnswer === correctAnswer? answerStatusEnum.CORRECT:
                answerStatusEnum.WRONG,
      },
      ...gameState.answers.slice(questionNum+1, gameState.answers.length),
    ]
    setGameState({
      status: answersState.some(q => q.status !== answerStatusEnum.CORRECT) ? LocalStatusEnum.ONGOING : LocalStatusEnum.FINISHED,
      answers: answersState,
    })
  }

  const classes = useStyles();

  const [gameState, setGameState] = useState({
    status: LocalStatusEnum.ONGOING,
    answers: props.quizzes.map(
      () => ({
        status: answerStatusEnum.EMPTY,
        chosenOption: '',
      })
    )
  });

  useEffect(() => {}, []);

  return (
    <div>
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
                  <StyledTableCell align="center">
                    <audio controls>
                      <source src={`/audio/${row.question}`} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  </StyledTableCell>
                  <StyledTableCell align="center">{gameState.answers[rowIdx].status}</StyledTableCell>
                  <StyledTableCell align="center">
                    <RadioGroup
                      aria-label="firstTurn"
                      name="firstTurn"
                      onChange={e => handleChooseAnswer(rowIdx, e.target.value)}
                      value={gameState.answers[rowIdx].chosenOption}
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
      data source: <a
        href="https://www.kaggle.com/datasets/jabirmuktabir/hijaiyah-fathah-dataset"
        target="_blank"
        rel="noopener noreferrer"
      >Jabir Muktabir's Kaggle</a>
    </div>
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
