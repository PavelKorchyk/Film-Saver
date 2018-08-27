import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import FilmsResult from '../FilmsResult/FilmsResult';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      type: '',
      URL: 'http://www.omdbapi.com/',
      APIKey: 'apikey=cc6ef152',
      films: {},
    }
  }

  onTextChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value}, 
      () => axios.get(`${this.state.URL}?s=${this.state.searchText}&${this.state.APIKey}`)
        .then(res => this.setState({films: JSON.parse(res.request.response)}))
        .catch(err => console.log(err))
    )}

  render() {
    const { classes } = this.props;
    let filmsLength;
    if (this.state.films.Search === undefined) {
      filmsLength = 0;
    } else {
      filmsLength = this.state.films.Search.length;
    }
    return (
      <div>
        <div className={classes.centered}>
          <TextField
            id="searchText"
            label="Search for film"
            placeholder="e.g. Taxi"
            className={classes.textField}
            margin="normal"
            value={this.state.searchText}
            onChange={this.onTextChange}
            fullWidth={true}
          />
        </div>
        {filmsLength > 0 
        ? (<FilmsResult films={this.state.films.Search} />) 
        : null}
      </div>
    )
  }
}

export default withStyles(styles) (Search);