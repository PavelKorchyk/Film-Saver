import React, { Component } from 'react';
import history from '../../services/history';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styles from './styles';

class FilmsView extends Component {
  render() {
  const { classes } = this.props;
  const { films } = this.props;
  if (!this.props.films) {
    return <div className={classes.wrapper}>
      <img src={"https://upload.wikimedia.org/wikipedia/commons/6/63/Elipsis.gif"} alt="" className={classes.elipsis} />
    </div>
  }
  return <div className={classes.root}>
      <div className={classes.paper}>
        {films.map((film, i) => (
          <Card onClick={() => { 
            history.push({
              pathname: `/films/${film._id}`,
            }); 
          }} key={i} className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                className={classes.media}
                height="400"
                image={film.avatar}
                title={film.title}
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {film.title}
                </Typography>
                <Typography component="p">
                  {film.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  }
}

export default withStyles(styles) (FilmsView)