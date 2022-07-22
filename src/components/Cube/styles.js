export default {
  wrapper: {
    width: '100%',
    height: '100%',
    maxWidth: 400,
    maxHeight: 400,
    margin: '0 auto',
    border: '1px solid rgb(233,233,233)',
    marginBottom: 30,
  },
  cubeImage: {
    objectFit: 'scale-down',
    width: '100%',
    height: 400,
    '@media (max-width: 1200px)': {
      height: '33.333333vw',
    },
  },
  favIcon: {
    width: 25,
    height: 25,
    position: 'absolute',
    top: 4,
    right: 5,
    zIndex: 1,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Proxima Nova Light',
    position: 'absolute',
    right: '0',
    top: '-80px',
    bottom: '-15px',
    left: '0',
    padding: '10px 20px',
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
};

