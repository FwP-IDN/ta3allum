import React from 'react'
import Card from "./Card";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: 0,
  },
});

export default function Home() {
  const styles = useStyles();
  return (
    <Grid container className={styles.root} justify="center" spacing={2}>
      <Card
        title="Shorf"
        desc=""
        image="/shorf-640.jpg"
        to="/shorf"
        alt="Shorf"
      />
      <Card
        title="Hijaaiyyah"
        desc=""
        image="/hijaaiyyah-640.jpg"
        to="/hijaaiyyah"
        alt="Hijaaiyyah"
      />
    </Grid>
  )
}    
