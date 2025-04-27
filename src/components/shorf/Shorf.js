import React, { useState } from "react";
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

import tashrif from "../../data/tashrif";


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

export default function Shorf() {
  const classes = useStyles();

  const [answerStatus, setAnswerStatus] = useState({});

  function inputText(subCellKey, input, answer) {
    let newStatus;
    console.log("input", input);
    console.log("answer", answer);
    if (input === "") {
      newStatus = answerStatusEnum.EMPTY;
    } else if(input === answer) {
      newStatus = answerStatusEnum.CORRECT;
    } else {
      newStatus = answerStatusEnum.WRONG
    }
    
    let updatedAnswerStatus = {...answerStatus}

    updatedAnswerStatus[subCellKey] = newStatus
    
    setAnswerStatus(updatedAnswerStatus)
  }

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader={true} className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {
              tashrif.columns.map((column) => (
                <StyledTableCell fontSize={100} align="center">{column}</StyledTableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            tashrif.data.map((row, rowIdx) => (
              <StyledTableRow key={rowIdx}>
                {
                  row.map((cell, cellIdx) => (
                    cellIdx >= row.length-tashrif.metadata.numOfKey[rowIdx] ?
                    <StyledTableCell align="center">
                      {/* this is used for showing, not quiz*/}
                      <Box display="flex" justifyContent="center">
                        {
                          cell.length === 0 ?
                          <StyledTableCell fontSize={35} align="center">—</StyledTableCell> :
                          cell.map((subcell) => (
                            <StyledTableCell align="center">{subcell}</StyledTableCell>
                          ))
                          
                        }
                      </Box>
                    </StyledTableCell> :
                    <StyledTableCell align="center">
                      {/* this is used for quiz*/}
                      <Box display="flex" justifyContent="center">
                        {
                          cell.length === 0 ?
                          <StyledTableCell fontSize={35} align="center">—</StyledTableCell> :
                          cell.map((subcell, subcellIdx) => (
                            <StyledTableCell  align="center">
                              <TextField id="standard-basic" label="الجواب" onBlur={(e) => inputText(`${rowIdx},${cellIdx},${subcellIdx}`, e.target.value, subcell)} />
                              <br/>
                              {answerStatus.hasOwnProperty(`${rowIdx},${cellIdx},${subcellIdx}`)?answerStatus[`${rowIdx},${cellIdx},${subcellIdx}`]:answerStatusEnum.EMPTY}
                            </StyledTableCell>
                          ))
                        }
                      </Box>
                    </StyledTableCell>
                  )
                  )
                }
                
              </StyledTableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}