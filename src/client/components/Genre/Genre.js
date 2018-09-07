import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import FilmsView from '../Films/FilmsView';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeRequest from '../../services/makeRequest';
import styles from './styles';
import history from '../../services/history';


const mapStateToProps = store => ({ token: store.user.token });

class Genre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      filmsToRender: [],
      skip: 0,
      limit: 4,
    };
  }

  componentDidMount() {
    makeRequest(`/api/film/categories/${history.location.pathname.slice(8)}`, 'GET')
      .then(result => this.setState({ result }))
      .then(() => this.addFilmsToRender())
      .then(() => window.addEventListener('scroll', this.onScroll, false))
  }

  onScroll = () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1200) && this.state.filmsToRender.length < this.state.result.films.length) {
      this.addFilmsToRender();
    }
  }

  addFilmsToRender = () => {
      
      let prevFilmsToRender = this.state.filmsToRender;
      let newFilmsToRender = this.state.result.films.slice(this.state.skip, this.state.skip + this.state.limit);
      let filmsToRender = prevFilmsToRender.concat(newFilmsToRender);
      this.setState({ filmsToRender, skip: this.state.skip + this.state.limit })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  genreRender() {
    const { classes } = this.props;
    const genre = this.state.result;
    return <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.wrapper}>
            <img src={genre.avatar} className={classes.avatar} />
          </div>
          <div className={classes.wrapper}>
            <Typography variant="headline" component="h1" align="right" className={classes.typography}>
              {genre.title}
            </Typography>
            <div>
              <div className={classes.list}>
                <List>
                  <ListItem>
                    <ListItemText primary="Description" secondary={genre.description} />
                  </ListItem>
                </List>
              </div>
            </div>
          </div>
        </Paper>
        <FilmsView films={this.state.filmsToRender}/>
      </div>
  }
  

  render() {
    return this.genreRender();
  }
}

export default connect (mapStateToProps, null)(withStyles(styles) (Genre));