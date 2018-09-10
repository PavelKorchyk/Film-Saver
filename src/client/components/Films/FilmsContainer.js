import React, { Component } from 'react';
import makeRequest from '../../services/makeRequest';
import FilmsView from './FilmsView';
import { connect } from "react-redux";
import { removeSearchValue, loadingDone } from '../../redux/actions';
import Loading from '../Loading/Loading';
import NoData from '../NoData/NoData';
import { createFilmsUrl } from '../../services/createURL';
import { INFINITY_SCROLL_PARAM, OFFSET_INCREMENT } from '../../services/constants';

const mapStateToProps = store => {
  return {
    token: store.user.token,
    searchValue: store.user.searchValue,
    sortType: store.user.sortType,
    sortValue: store.user.sortValue,
    isLoadingDone: store.user.isLoadingDone,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeSearchValue: () => dispatch(removeSearchValue()),
    loadingDone: () => dispatch(loadingDone()),
  };
};

class Films extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      isLoading: false,
      offset: 0,
      error: false,
    };
  }
 
  componentDidMount() {
    this.paginatedLoading();
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentDidUpdate(prevProps) {
    const { searchValue, sortType, sortValue } = this.props;
    if (prevProps.searchValue !== searchValue || prevProps.sortType !== sortType || prevProps.sortValue !== sortValue) {
      this.setState({ result: [], offset: 0 }, () => this.paginatedLoading());
    }
  }

  componentWillUnmount() {
    this.props.removeSearchValue();
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - INFINITY_SCROLL_PARAM) && !this.state.isLoading && !this.props.isLoadingDone) {
      this.paginatedLoading();
    }
  }

  paginatedLoading = () => {
    this.setState({ isLoading: true });
    const { searchValue, sortType, sortValue } = this.props;
    const { offset } = this.state;
    const urlData = {
      title: searchValue,
      offset: offset,
      sortType: sortType,
      sortValue: sortValue,
    }
    makeRequest(createFilmsUrl(urlData), 'GET')
      .then(result => {
        if (!result.length) {
          this.props.loadingDone();
        };
        if (!Object.keys(this.state.result).length) {
          this.setState({ result });
        } else {
          this.setState({ result: [...this.state.result, ...result] });
        }
      })
      .then(() => this.setState({ offset: this.state.offset + OFFSET_INCREMENT, isLoading: false }))
      .catch(err => {
        this.setState({ error: true })
        console.log(err);
      });
  }

  render() {
    if (!Object.keys(this.state.result).length && this.props.isLoadingDone) {
      return <NoData />
    }
    if (!Object.keys(this.state.result).length) {
      return <Loading />
    }
    return <FilmsView films={this.state.result}/>
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Films);