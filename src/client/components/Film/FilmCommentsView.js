import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import styles from './styles';

class Comments extends Component {
  commentsRender = () => {
    const { classes, comments } = this.props;
    return <React.Fragment>
        {comments.map((comment, i) => (
          <React.Fragment key={i}>
            <Divider className={classes.commentDivider} />
            <div className={classes.commentBlock}>
              <div className={classes.commentField}>
                <Avatar className={classes.commentEl}>{comment.userName.slice(0,1)}</Avatar>
                <div className={classes.commentEl}>{comment.userName}</div>
                <div className={classes.commentEl}>{`${comment.time.slice(0,10)} ${comment.time.slice(11,19)}`}
                </div>
              </div>
              <div className={classes.commentField}>
                <div className={classes.commentEl}>{comment.text}</div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </React.Fragment>
  }

  render() {
  const { classes, comments } = this.props;
  if (!comments) {
    return <div className={classes.paperMainInfo}>
      <img src={"https://upload.wikimedia.org/wikipedia/commons/6/63/Elipsis.gif"} alt="" className={classes.elipsis} />
    </div>
  }
  return this.commentsRender();
  }
}

export default withStyles(styles) (Comments);