import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import FilmsResult from '../FilmsResult/FilmsResult';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  centered: {
    "display": "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "flex-wrap": "wrap",
  },
  formControl: {
    "flex": "1 0 50px",
    "align-self": "center",
    minWidth: 120,
    maxWidth: 300,
  },
  textField: {
    "flex": "1 0 50px",
    "align-self": "center",
    "max-width": "500px",
  }
});

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

/* <FormControl className={classes.formControl}>
          <InputLabel htmlFor="films-type">Films Type</InputLabel>
          <Select
              value={this.state.type}
              onChange={this.onTypeChange}
              inputProps={{
                name: 'type',
                id: 'films-type',
              }}
            >
            <MenuItem value={'movie'}>Movie</MenuItem>
            <MenuItem value={'series'}>Series</MenuItem>
            <MenuItem value={'episode'}>Episode</MenuItem>
          </Select>
        </FormControl> */
