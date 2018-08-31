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
  paper: {
    "max-width": "1024px",
    "margin": "20px auto 5px auto",
    "display": "flex",
    "flex-direction": "row",
    "flex-wrap": "wrap",
    "justify-content": "space-around",
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
  typography: {
    "display": "block",
  },
  elipsis: {
    "align-self": "center",
  }
});

module.exports = styles;