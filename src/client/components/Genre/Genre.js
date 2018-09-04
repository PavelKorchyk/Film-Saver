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
    };
  }

  componentDidMount() {
    makeRequest(`/api/film/categories/${history.location.pathname.slice(8)}`, 'GET')
      .then(result => this.setState({ result }));
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
        <FilmsView films={this.state.result.films}/>
      </div>
  }
  

  render() {
    return this.genreRender();
  }
}

export default connect (mapStateToProps, null)(withStyles(styles) (Genre));