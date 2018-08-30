import React, { Component } from 'react';
import makeRequest from '../../makeRequest';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styles from './styles';

const mapStateToProps = store => {
  return {token: store.user.token};
};

class Films extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
    }
  }

  componentDidMount() {
    if (this.props.token) {
      makeRequest('/api/films', 'GET', this.props.token).then(result => this.setState({ result} ))
    }
  }
  
  filmRender() {
    const { classes } = this.props;
    const films = this.state.result;
    let filmContent;
    filmContent = (
      <div className={classes.root}>
        <div className={classes.paper}>
          {films.map(film => (
            <Card onClick={() => { console.log('onClick'); }} key={film._id} className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  className={classes.media}
                  height="500"
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
      </div>)
    return filmContent;
  }

  render() {
    if(!this.state.result) {
      return <div></div>
    } else {
      return this.filmRender();
    }
  }
}

export default connect (mapStateToProps, null)(withStyles(styles) (Films));