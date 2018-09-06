import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Gallery from 'react-grid-gallery';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import StarRate from '@material-ui/icons/StarRate';
import Style from '@material-ui/icons/Style';
import Description from '@material-ui/icons/Description';
import Divider from '@material-ui/core/Divider';
import makeRequest from '../../services/makeRequest';
import styles from './styles';
import history from '../../services/history';
import Loading from '../Loading/Loading';
import StarRatings from 'react-star-ratings';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import Comments from './FilmCommentsView';
import { updateRatedFilms } from '../../redux/actions/index';

const mapStateToProps = store => ({ 
  token: store.user.token,
  userId: store.user.userId, 
  userName: store.user.username,
  ratedFilms: store.user.ratedFilms,
});

const mapDispatchToProps = dispatch => {
  return {
    updateRatedFilms: (ratedFilms) => dispatch(updateRatedFilms(ratedFilms)),
  };
};

class Film extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      rating: '',
      personalRating: '',
      comment: '',
      rateMessage: "Rate this film!",
    };
  }

  componentDidMount() {
    makeRequest(`/api${history.location.pathname}`, 'GET')
    .then(result => {
      this.setState({ result, rating: result.rating })
    })
    .then(() => {
      const personalRating = this.props.ratedFilms.find(element => element.filmId == this.state.result._id)
      if (personalRating) {
        this.setState({ personalRating: personalRating.rating, rateMessage: "Your rate!" })
      }
    })
    .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      this.setState({ personalRating: '', comment: '', rateMessage: "Rate this film!" });
    }
  }

  changeRating = (e) => {
    if (this.props.token && !this.state.personalRating) {
      const data = {
        filmId: this.state.result._id,
        rating: e,
      };
      this.setState({ personalRating: e }, () => 
        makeRequest(`/api/user/${this.props.userId}/rating`, 'PUT', this.props.token, data)
        .then(result => {this.setState({ rateMessage: "Your rate!" }), this.props.updateRatedFilms(result.ratedFilms)})
        .catch(err => console.log(err)));

      const newRating = ((this.state.rating + e) / 2).toFixed(2);
      this.setState({ rating: e }, () => 
        makeRequest(`/api${history.location.pathname}`, 'PUT', this.props.token, {"rating": newRating})
        .then(result => {this.setState({ result, rating: result.rating })})
        .catch(err => console.log(err)))
    } else if(!this.props.token) {
      history.push('/login');
    } else {
      this.setState({ rateMessage: "You've rated this film" })
    }
  }

  onCommentFieldChange = (e) => {
    this.setState({ comment: e.target.value });
    if (e.key === "Enter") {
      this.sendComment();
    }
  }

  onCommentFieldKeyPress = (e) => {
    if (e.key === "Enter") {
      this.sendComment();
    }
  }

  sendComment = () => {
    if (this.props.token) {
    const data = {
      user_id: this.props.userId,
      userName: this.props.userName,
      text: this.state.comment,
    };
    makeRequest(`/api${history.location.pathname}/comment`, 'PUT', this.props.token, data)
      .then(result => this.setState({ result, comment: '' }))
      .catch(err => console.log(err))
    } else {
      history.push('/login');
    }
  }

  filmRender() {
    const { classes } = this.props;
    const film = this.state.result;
    const images = film.gallery.map(url => {
      return { src: url, thumbnail: url, thumbnailWidth: 150,
        thumbnailHeight: 100, }
    });
    return <div className={classes.root}>
        <Paper className={classes.paperMainInfo}>
          <div className={classes.wrapper}>
            <img src={film.avatar} className={classes.avatar} />
          </div>
          <div className={classes.wrapper}>
            <Typography variant="headline" className={classes.typographyh1}>
              {film.title}
            </Typography>
            <div>
              <div className={classes.list}>
                <List>
                  <ListItem>
                    <Avatar>
                      <Style />
                    </Avatar>
                    <ListItemText primary="Genre" secondary={film.categories.title}/>
                  </ListItem>
                  <Divider inset component="li" />
                  <ListItem>
                    <Avatar>
                      <StarRate />
                    </Avatar>
                    <ListItemText primary="Rating" secondary={this.state.rating} />
                  </ListItem>
                  <Divider inset component="li" />
                  <ListItem>
                    <Avatar>
                      <Description />
                    </Avatar>
                    <ListItemText primary="Description" secondary={film.description} />
                  </ListItem>
                </List>
              </div>
            </div>
            <div className={classes.rating}>
              <Typography variant="headline" className={classes.typographyh2}>
                {this.state.rateMessage}
              </Typography>
              <StarRatings
                rating={ this.state.personalRating || this.state.rating }
                starRatedColor="blue"
                changeRating={this.changeRating}
                numberOfStars={5}
                name='rating'
              />
            </div>
          </div>
        </Paper>
        <Paper className={classes.imgGallery}>
          <Gallery
            images={images}
            enableImageSelection={false}
            rowHeight={180}
            maxRows={1}
          />
        </Paper>
        <Paper className={classes.paperComments}>
          <div className={classes.commentWrapper}>
            <header>
              <Typography variant="headline" className={classes.commentHeader}>
                Comments
              </Typography>
            </header>
            <div className={classes.commentField}>
              <TextField
                id="comment-input"
                placeholder={this.props.token ? "Your comment goes here..." : "You should login first..."}
                className={classes.textField}
                margin="normal"
                multiline={false}
                value={this.state.comment}
                onChange={this.onCommentFieldChange}
                onKeyPress={this.onCommentFieldKeyPress}
                disabled={!this.props.token}
              />
              <Send color={"primary"} className={classes.button} onClick={this.sendComment}/>
            </div>
          </div>
          <Comments comments={film.comments}/>
        </Paper>
      </div>
  }

  render() {
    if(!this.state.result.categories && !this.state.result.gallery) {
      return <Loading />
    }
    return this.filmRender();
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(withStyles(styles) (Film));