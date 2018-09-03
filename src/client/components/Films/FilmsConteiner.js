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

const mapStateToProps = store => {
  return {token: store.user.token};
};

class Films extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      isLoading: false,
      isLoadingDone: false,
      offset: 0,
    }
  }

  componentDidMount() {
    if (this.props.films) {
      this.setState({ result: this.props.films })
    } else {
      this.paginatedLoading();
    window.addEventListener('scroll', this.onScroll, false);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1000) && !this.state.isLoading && !this.state.isLoadingDone) {
      this.paginatedLoading();
    }
  }

  paginatedLoading =() => {
    this.setState({ isLoading: true });
    makeRequest(`/api/films/?offset=${this.state.offset}`, 'GET')
      .then(result => {
        if (result.length === 0) {
          this.setState({ isLoadingDone: true })
        };
        if (Object.keys(this.state.result).length === 0) {
          this.setState({ result });
        } else {
          this.setState({ result: [...this.state.result, ...result] })
        }
      })
      .then(() => this.setState({ offset: this.state.offset + 10, isLoading: false }))
      .catch(err => console.log(err));
  }
  
  filmRender() {
    const { classes } = this.props;
    const films = this.state.result;
    return <div className={classes.root}>
        <div className={classes.paper}>
          {films.map(film => (
            <Card onClick={() => { 
              history.push({
                pathname: `/films/${film._id}`,
              }); 
            }} key={film._id} className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  className={classes.media}
                  height="450"
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

  render() {
    const { classes } = this.props;
    if (Object.keys(this.state.result).length === 0) {
      return <div className={classes.wrapper}>
        <img src={"https://upload.wikimedia.org/wikipedia/commons/6/63/Elipsis.gif"} alt="" className={classes.elipsis} />
      </div>
    }
    return this.filmRender();
  }
}

export default connect (mapStateToProps, null)(withStyles(styles) (Films));