import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card as MaterialCard } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 320,
    margin: 30,
  },
  media: {
    height: 300,
  },
});


const Card = (props) => {
  const onPlay = () => {
    props.history.push(props.to)
  }
  const classes = useStyles();
  return (
    <MaterialCard className={classes.root}>
      <CardActionArea 
        onClick={!props.disabled ? onPlay.bind(this) : undefined} disabled={props.disabled}
      >
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.alt}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </MaterialCard>
  )
}

Card.propTypes = {
  title: Proptypes.string,
  alt: Proptypes.string,
  image: Proptypes.string,
  desc: Proptypes.string,
  to: Proptypes.string,
}

Card.defaultProps = {
  title: "lorem",
  desc: "Lorem ipsum dolor sit amet",
  to: "#",
}

export default withRouter(Card);
