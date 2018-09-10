const styles = theme => ({
  paper: {
    margin: "30px auto",
    maxWidth: 300,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  header: {
    flex: "1 0 50px",
    alignSelf: "center",
    fontSize: 30,
  },
  textField: {
    flex: "1 0 50px",
    alignSelf: "center",
  },
  button: {
    margin: theme.spacing.unit,
  },
  error: {
    color: "red",
    margin: "0 auto", 
  },
});

module.exports = styles;