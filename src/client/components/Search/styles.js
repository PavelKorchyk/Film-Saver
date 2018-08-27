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

module.exports = styles;