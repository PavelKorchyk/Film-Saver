const styles = theme => ({
  paper: {
    "margin": "30px auto",
    "max-width": "300px",
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    "display": "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "flex-wrap": "wrap",
  },
  header: {
    "flex": "1 0 50px",
    "align-self": "center",
    "font-size": "30px",
  },
  textField: {
    "flex": "1 0 50px",
    "align-self": "center",
  },
  button: {
    margin: theme.spacing.unit,
  },
  error: {
    "color": "red",
    "margin": "0 auto", 
  },
});

module.exports = styles;