import React, { Component } from 'react';
import makeRequest from '../../services/makeRequest';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import history from '../../services/history';
import Loading from '../Loading/Loading';
import { createGenresUrl } from '../../services/createURL';

const mapStateToProps = store => {
  return {token: store.user.token};
};

class Genres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
    };
  }

  componentDidMount() {
    makeRequest(createGenresUrl(), 'GET').then(result => this.setState({ result }));
  }
  
  genresRender() {
    const { classes } = this.props;
    const genres = this.state.result;
    return <div className={classes.root}>
        <div className={classes.paper}>
          {genres.map(genre => (
            <Card onClick={() => { 
                history.push({
                  pathname: `genres/${genre._id}`,
                  state: {
                    genreId: genre._id,
                  }
                }); 
              }} key={genre._id} className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  className={classes.media}
                  height="320"
                  image={genre.avatar}
                  title={genre.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    {genre.title}
                  </Typography>
                  <Typography component="p">
                    {genre.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
  }

  render() {
    if (!Object.keys(this.state.result).length) {
      return <Loading />
    }
    return this.genresRender();
  }
}

export default connect (mapStateToProps, null)(withStyles(styles) (Genres));