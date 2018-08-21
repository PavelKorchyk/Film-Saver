import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from 'material-ui/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from 'material-ui/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
  textField: {
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
      films: [],
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          className={classes.textField}
          name='searchText'
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText='Search For Films'
          fullWidth={true}
        />
        <br />
        <FormControl className={classes.formControl}>
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
        </FormControl>
      </div>
    )
  }
}

export default withStyles(styles) (Search);
