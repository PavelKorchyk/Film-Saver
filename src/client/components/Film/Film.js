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
import { createFilmUrl, createCommentUrl, createRatingUrl } from '../../services/createURL';
import { COMMENT_VALIDATION_REGEX, COMMENT_MAX_LENGTH, GALLERY_ROW_HEIGTH, GALLERY_MAX_ROWS, STAR_RATING_NUMBER_OF_STARS, GALLERY_THUMBNAIL_WIDTH, GALLERY_THUMBNAIL_HEIGTH } from '../../services/constants';

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
      error: false,
      isSendingComment: false,
    };
  }

  componentDidMount() {
    makeRequest(createFilmUrl(history.location.pathname), 'GET')
    .then(result => {
      this.setState({ result, rating: result.rating });
      const personalRating = this.props.ratedFilms.find(element => element.filmId == this.state.result._id);
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
    const { token, userId, updateRatedFilms } = this.props;
    const { rating, personalRating, result } = this.state;

    if(!token) {
      history.push('/login');
    }
    if (token && !personalRating) {
      const data = {
        filmId: result._id,
        rating: e,
      };
      this.setState({ personalRating: e }, () => 
        makeRequest(createRatingUrl(userId), 'PUT', token, data)
        .then(result => {
          this.setState({ rateMessage: "Your rate!" }); 
          updateRatedFilms(result.ratedFilms);
        })
        .catch(err => console.log(err)));

      const newRating = ((rating + e) / 2).toFixed(2);

      this.setState({ rating: e }, () => 
        makeRequest(createFilmUrl(history.location.pathname), 'PUT', token, {"rating": newRating})
        .then(result => {this.setState({ result, rating: result.rating })})
        .catch(err => console.log(err)));
    } else {
      this.setState({ rateMessage: "You've rated this film" });
    }
  }

  onCommentFieldChange = (e) => {
    if (COMMENT_VALIDATION_REGEX.test(e.target.value) && e.target.value.length < COMMENT_MAX_LENGTH) {
      this.setState({ comment: e.target.value, error: false });
      if (e.key === "Enter") {
        this.sendComment();
      }
    } else {
      this.setState({ error: true });
    }
  }

  onCommentFieldKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value) {
      this.sendComment();
    }
  }

  sendComment = () => {
    const { token, userId, userName } = this.props;
    const { isSendingComment, comment } = this.state;

    if(!token) {
      history.push('/login');
    }
    if (token && !isSendingComment && comment) {
      this.setState({ isSendingComment: true }, () => {
        const data = {
          user_id: userId,
          userName: userName,
          text: comment,
        };
        makeRequest(createCommentUrl(history.location.pathname), 'PUT', token, data)
          .then(result => this.setState({ result, comment: '', isSendingComment: false }))
          .catch(err => console.log(err));
      });
    }
  }

  filmRender() {
    const { classes, token } = this.props;
    const { rating, personalRating, result, rateMessage, error, comment } = this.state;
    const film = result;
    
    const images = film.gallery.map(url => {
      return { src: url, thumbnail: url, thumbnailWidth: GALLERY_THUMBNAIL_WIDTH,
        thumbnailHeight: GALLERY_THUMBNAIL_HEIGTH, }
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
                    <ListItemText primary="Rating" secondary={rating} />
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
                {rateMessage}
              </Typography>
              <StarRatings
                rating={ personalRating || rating }
                starRatedColor="blue"
                changeRating={this.changeRating}
                numberOfStars={STAR_RATING_NUMBER_OF_STARS}
                name='rating'
              />
            </div>
          </div>
        </Paper>
        <Paper className={classes.imgGallery}>
          <Gallery
            images={images}
            enableImageSelection={false}
            rowHeigth={GALLERY_ROW_HEIGTH}
            maxRows={GALLERY_MAX_ROWS}
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
                placeholder={token ? "Your comment goes here..." : "You should login first..."}
                className={classes.textField}
                margin="normal"
                multiline={false}
                error={error}
                value={comment}
                onChange={this.onCommentFieldChange}
                onKeyPress={this.onCommentFieldKeyPress}
                disabled={!token}
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