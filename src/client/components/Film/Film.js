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


const mapStateToProps = store => ({ token: store.user.token });

class Film extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
    };
  }

  componentDidMount() {
    makeRequest(`/api${history.location.pathname}`, 'GET').then(result => this.setState({ result }));
  }

  filmRender() {
    const { classes } = this.props;
    const film = this.state.result;
    const images = film.gallery.map(url => {
      return { src: url, thumbnail: url, thumbnailWidth: 150,
        thumbnailHeight: 100, }
    });
    return <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.wrapper}>
            <img src={film.avatar} className={classes.avatar} />
          </div>
          <div className={classes.wrapper}>
            <Typography variant="headline" component="h1"  className={classes.typography}>
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
                    <ListItemText primary="Rating" secondary={film.rating} />
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
      </div>
  }

  render() {
    if(!this.state.result.categories && !this.state.result.gallery) {
      return <Loading />
    }
    return this.filmRender();
  }
}

export default connect (mapStateToProps, null)(withStyles(styles) (Film));