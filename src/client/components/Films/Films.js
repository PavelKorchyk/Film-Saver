import React, { Component } from 'react';
import makeRequest from '../../makeRequest';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
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
    console.log(this.props)
    if (this.props.token) {
      makeRequest('/api/films', 'GET', this.props.token).then(result => this.setState({ result} ))
    }
  }

  render() {
    let filmContent;
    const { classes } = this.props;
    const films = this.state.result;
    console.log(films);

    if (films) {
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
        </div>
      )
    } else {
      filmContent = null;
    }
    return (
      <div>
        {filmContent}
      </div>
    )
  }
}

export default connect (mapStateToProps, null)(withStyles(styles) (Films));