import React, { Component } from 'react';
import makeRequest from '../../services/makeRequest';
import FilmsView from './FilmsView';
import { connect } from "react-redux";
import { logOut, addSearchValue, removeSearchValue } from '../../redux/actions';
import history from '../../services/history';
import Loading from '../Loading/Loading';
import NoData from '../NoData/NoData';

const mapStateToProps = store => {
  return {
    token: store.user.token,
    searchValue: store.user.searchValue,
    sortType: store.user.sortType,
    sortValue: store.user.sortValue,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut()),
    addSearchValue: (searchValue) => dispatch(addSearchValue(searchValue)),
    removeSearchValue: () => dispatch(removeSearchValue()),
  };
};

class Films extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      isLoading: false,
      isLoadingDone: false,
      offset: 0,
      error: false,
    }
  }
 
  componentDidMount() {
    this.paginatedLoading();
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchValue !== this.props.searchValue || prevProps.sortType !== this.props.sortType || prevProps.sortValue !== this.props.sortValue) {
      this.setState({ result: [], offset: 0 }, () => this.paginatedLoading());
    }
  }

  componentWillUnmount() {
    this.props.removeSearchValue();
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1200) && !this.state.isLoading && !this.state.isLoadingDone) {
      this.paginatedLoading();
    }
  }

  createUrl = () => {
    let url;
    if (this.props.searchValue) {
      url = `/api/films/?title=${this.props.searchValue}&offset=${this.state.offset}&sortType=${this.props.sortType}&sortValue=${this.props.sortValue}`;
    } else {
      url = `/api/films/?offset=${this.state.offset}&sortType=${this.props.sortType}&sortValue=${this.props.sortValue}`;
    }
    return url
  }

  paginatedLoading =() => {
    this.setState({ isLoading: true });
    const url = this.createUrl();
    makeRequest(url, 'GET')
      .then(result => {
        if (!result.length) {
          this.setState({ isLoadingDone: true })
        };
        if (Object.keys(this.state.result).length === 0) {
          this.setState({ result });
        } else {
          this.setState({ result: [...this.state.result, ...result] })
        }
      })
      .then(() => this.setState({ offset: this.state.offset + 10, isLoading: false }))
      .catch(err => {
        this.setState({ error: true }),
        console.log(err)
      });
  }

  render() {
    if (Object.keys(this.state.result).length === 0) {
      return <Loading />
    }
    return <FilmsView films={this.state.result}/>;
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Films);