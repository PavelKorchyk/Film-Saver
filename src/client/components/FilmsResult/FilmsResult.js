import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import styles from './styles';

function FilmsResult (props) {
  let filmListContent;
  const { films, classes } = props;
  
  if(films) {
    filmListContent = (
      <div className={classes.root}>
        <GridList cols={3} className={classes.gridList}>
          {films.map(film => (
            <GridListTile key={film.imdbID}>
              <img src={film.Poster} alt={film.Title} />
              <GridListTileBar
                title={film.Title}
                titlePosition="top"
                actionIcon={
                  <IconButton className={classes.icon}>
                    <StarBorderIcon />
                  </IconButton>
                }
                actionPosition="left"
                className={classes.titleBar}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  } else {
    filmListContent = null;
  }
  return (
    <div>
      {filmListContent}
    </div>
  )
}

FilmsResult.prototype = {
  films: PropTypes.array.isRequired
}

export default withStyles(styles) (FilmsResult);