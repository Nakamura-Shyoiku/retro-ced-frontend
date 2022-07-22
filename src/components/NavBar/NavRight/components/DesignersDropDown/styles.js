export default {
  wrapper: {
    position: 'absolute',
    left: '65%',
    width: '300px',
    height: '300px',
    display: 'inlineBlock',
    top: '15%',
    '@media all and (max-width : 768px)': {
      left: '72%',
      width: 180,
      height: 180,
    },
  },
  featuredImg: {
    position: 'absolute',
    top: '0',
    left: '15%',
    height: 180,
    width: 180,
  },
  featuredText: {
    padding: '0 20px 0 20px',
    backgroundColor: 'white',
    position: 'absolute',
    top: '53%',
    left: '20%',
    width: 150,
    height: 50,
    textAlign: 'center',
    borderBottom: '2px solid black',
    '@media all and (max-width : 768px)': {
      height: 50,
      width: 100,
      left: '40%',
      top: '85%',
    },
  },
  featuredSubText: {
    fontSize: 12,
    margin: '5px 0 0 0',
  },
};
