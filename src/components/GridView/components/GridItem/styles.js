export default {
  favIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 0,
    right: 5,
    zIndex: 1,
    '@media only screen and (max-width: 414px)': {
      width: 25,
      height: 25,
    }
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Proxima Nova Light',
    position: 'absolute',
    right: '0',
    top: '20px',
    bottom: '-60px',
    left: '0',
    padding: '15px 20px',
    marginLeft: '20px',
    marginRight: '20px',
    boxShadow: '0 1px 10px rgb(233,233,233)',
    backgroundColor: 'white',
  },
  name: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginBottom: 10,
  },
  brand: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  productImg: {
    height: 400,
    width: '100%',
    objectFit: 'scale-down',
    '@media (max-width: 1200px)': {
      height: '33.333333vw',
    },
    '@media only screen and (max-width: 414px)': {
      objectFit: 'scale-down',
    },
  },
};
