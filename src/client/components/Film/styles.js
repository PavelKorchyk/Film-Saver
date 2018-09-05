const styles = theme => ({
  list: {
    "max-width": "500px"
  },
  card: {
    maxWidth: 345,
    margin: "10px",
  },
  media: {
    objectFit: 'cover',
  },
  paperMainInfo: {
    "max-width": "1024px",
    "margin": "20px auto 5px auto",
    "display": "flex",
    "flex-direction": "row",
    "flex-wrap": "wrap",
    "justify-content": "space-around",
    "align-items": "flex-start",
    "align-content": "flex-start",
  },
  paperComments: {
    "max-width": "1024px",
    "margin": "5px auto 5px auto",
    "display": "flex",
    "flex-direction": "column",
    "flex-wrap": "wrap",
    "justify-content": "flex-start",
    "align-items": "flex-start",
    "align-content": "flex-start",
  },
  imgGallery: {
    display: "block",
    minHeight: "1px",
    maxHeight: "180px",
    width: "100%",
    border: "1px solid #ddd",
    "overflow-y": "hidden",
    "overflow-x": "auto",
    "margin": "0px auto",
    "max-width": "1024px",
  },
  avatar: {
    "max-width": "300px",
  },
  wrapper: {
    "margin": "20px",
    "display": "flex",
    "flex-direction": "column",
    "flex-wrap": "wrap",
    "justify-content": "flex-start",
    "align-items": "flex-start",
    "align-content": "flex-start",
  },
  typographyh1: {
    "display": "block",
    "font-size": "30px",
  },
  typographyh2: {
    "display": "block",
    "font-size": "20px",
  },
  rating: {
    "margin": "0 auto",
    "display": "flex",
    "flex-direction": "column",
    "flex-wrap": "wrap",
    "justify-content": "center",
    "align-items": "center",
    "align-content": "center",
  },
  elipsis: {
    "align-self": "center",
  },
  commentWrapper: {
    "margin": "20px 40px auto 40px",
    "width": "calc(100% - 80px)",
  },
  commentHeader: {
    "display": "block",
    "margin": "15px auto auto 15px",
    "font-size": "24px",
  },
  commentField: {
    "flex-basis": "100%",
    "display": "flex",
    "flex-direction": "row",
    "flex-wrap": "no-wrap",
    "justify-content": "flex-start",
    "align-items": "center",
    "margin": "10px auto"
  },
  textField: {
    "flex-basis": "90%",
    "margin": "5px 15px 15px 15px",
  },
  button: {
    "aling-self": "center",
  },
  commentBlock: {
    "margin": "0 40px 5px 40px",
  },
  commentDivider: {
    "width": "100%",
    "aling-self": "center",
    "margin": "5px auto"
  },
  commentEl: {
    "margin": "0 15px",
    "aling-self": "center",
  }
});

module.exports = styles;