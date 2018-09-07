const styles = () => ({
  list: {
    maxWidth: 500,
  },
  card: {
    maxWidth: 345,
    margin: 10,
  },
  media: {
    objectFit: "cover",
  },
  paper: {
    maxWidth: 1024,
    margin: "20px auto 5px auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
    alignContent: "flex-start",
  },
  imgGallery: {
    display: "block",
    minHeight: 1,
    maxHeight: 180,
    width: "100%",
    border: "1px solid #ddd",
    overflowY: "hidden",
    overflowX: "auto",
    margin: "0px auto",
    maxWidth: 1024,
  },
  avatar: {
    maxWidth: 300,
  },
  wrapper: {
    margin: 20,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
  },
  typography: {
    display: "block",
    margin: "0 auto",
  },
  elipsis: {
    alignSelf: "center",
  }
});

module.exports = styles;