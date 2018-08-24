import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    "width": "auto",
    "height": "auto",
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
});

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