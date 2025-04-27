import React, { useState } from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import hijaaiyyah from "../../data/hijaaiyyah";


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// this complexity is O(arr.length)
function pickRandomKVPairs(arr, count) {
  if (count > arr.length) {
    throw new Error("Not enough entries in the array to pick from.");
  }

  // Copy the array to avoid mutating the original
  const entries = arr.slice();

  // Partial Fisher-Yates shuffle
  for (let i = 0; i < count; i++) {
    const randomIndex = i + Math.floor(Math.random() * (entries.length - i));
    [entries[i], entries[randomIndex]] = [entries[randomIndex], entries[i]];
  }

  // Take the first 'count' entries
  return entries.slice(0, count);
}

// this complexity is O(arr.length)
function pickRandomKVPairsWithPreselected(arr, count, preSelectedKey) {
  if (count > arr.length) {
    throw new Error("Not enough entries in the array to pick from.");
  }

  // Copy the array to avoid mutating the original
  const entries = arr.slice();
  
  for (let i = 0; i < entries.length; i++) {
    if (entries[i][0] === preSelectedKey) {
        const preSelectedIdx = i;
        const preSelectedEntry = entries[preSelectedIdx];
        return pickRandomKVPairs(
          entries.slice(0, preSelectedIdx).concat(entries.slice(preSelectedIdx+1, entries.length)),
          count-1,
        ).concat([preSelectedEntry]);
    }
  }

  throw new Error("Pre Selected Key not Found");
}

const useStyles = makeStyles({
  root: {
    width: "90%",
    marginTop: "5%",
    marginBottom: "5%",
    marginLeft: "5%",
    marginRight: "5%",
    display: "flex",
    flexDirection: "column",
  },
});

const Config = (props) => {
  const config = props.config;
  const [numberOfQuiz, setNumberOfQuiz] = useState(config.quizzes.length);
  const [numberOfOption, setNumberOfOption] = useState(config.quizzes[0].options.length);
  const styles = useStyles();


  const handleNumberOfQuizSelection = (newValue) => {
    setNumberOfQuiz(
      Math.min(Math.max(parseInt(newValue) || 3, 3), hijaaiyyah.length),
    )
  };

  const handleNumberOfOptionsSelections = (newValue) => {
    setNumberOfOption(
      Math.min(Math.max(parseInt(newValue) || 3, 3), hijaaiyyah.length),
    )
  };

  const onSubmit = () => {
    const qnas = pickRandomKVPairs(hijaaiyyah, numberOfQuiz);

    const config = {
      quizzes: qnas.map(
        qna => {
          const options = shuffleArray(pickRandomKVPairsWithPreselected(hijaaiyyah, numberOfOption, qna[0]));
          return {
            question: qna[0],
            options: options.map(option => option[1]),
          };
        }
      )
    };
    props.onSubmit(config);
  };

  return (
    <Grid
      container
      className={styles.root}
      alignItems="center"
    >
      <FormControl component="fieldset">
        <FormLabel component="legend">
          Set number of quiz (3 - {hijaaiyyah.length})
        </FormLabel>
        <TextField
          value={numberOfQuiz}
          onChange={(event) => 
            handleNumberOfQuizSelection(event.target.value)
          }
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          style={{
            margin: "12.5px",
            marginLeft: "0px",
            textAlign: "center",
            width: "60px",
          }}
        />

        <br/>

        <FormLabel component="legend">
          Set number of option per quiz (3 - {hijaaiyyah.length})
        </FormLabel>
        <TextField
          value={numberOfOption}
          onChange={(event) =>
            handleNumberOfOptionsSelections(event.target.value)
          }
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          style={{
            margin: "12.5px",
            marginLeft: "0px",
            textAlign: "center",
            width: "60px",
          }}
        />
        
      </FormControl>
      <div row>
        <Button
          style={{ margin: "10px" }}
          onClick={onSubmit}
          variant="outlined"
          color="primary"
        >
          start
        </Button>
      </div>
    </Grid>
  );
};

Config.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  config: PropTypes.object,
};

Config.defaultProps = {
  config: {},
};

export default Config;
