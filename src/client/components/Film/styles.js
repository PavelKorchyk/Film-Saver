const styles = () => ({
  list: {
    maxWidth: 500,
  },
  card: {
    maxWidth: 345,
    margin: 10,
  },
  media: {
    objectFit: 'cover',
  },
  paperMainInfo: {
    maxWidth: "1024px",
    margin: "20px auto 5px auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
    alignContent: "flex-start",
  },
  paperComments: {
    maxWidth: "1024px",
    margin: "5px auto 5px auto",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
  },
  imgGallery: {
    display: "block",
    minHeight: "1px",
    maxHeight: "180px",
    width: "100%",
    border: "1px solid #ddd",
    overflowY: "hidden",
    overflowX: "auto",
    margin: "0px auto",
    maxWidth: "1024px",
  },
  avatar: {
    maxWidth: "300px",
  },
  wrapper: {
    margin: "20px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
  },
  typographyh1: {
    display: "block",
    fontSize: "30px",
  },
  typographyh2: {
    display: "block",
    fontSize: "20px",
  },
  rating: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  elipsis: {
    alingSelf: "center",
  },
  commentWrapper: {
    margin: "20px 40px auto 40px",
    width: "calc(100% - 80px)",
  },
  commentHeader: {
    display: "block",
    margin: "15px auto auto 15px",
    fontSize: "24px",
  },
  commentField: {
    flexBasis: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "no-wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "10px auto"
  },
  textField: {
    flexBasis: "90%",
    margin: "5px 15px 15px 15px",
  },
  button: {
    alingSelf: "center",
  },
  commentBlock: {
    margin: "0 40px 5px 40px",
  },
  commentDivider: {
    width: "100%",
    alingSelf: "center",
    margin: "5px auto"
  },
  commentEl: {
    margin: "0 15px",
    alingSelf: "center",
  }
});

module.exports = styles;