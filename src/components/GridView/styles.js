export default {
  filterTags: {
    margin: '5px',
    padding: '5px',
    backgroundColor: 'rgb(248, 248, 248)',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: 'Proxima Nova Light',
    fontSize: '0.9em',
  },
  wrapper: {
    display: 'inline-block',
    '@media only screen and (max-width: 414px)': {
      width: '158px',
      maxHeight: 400,
      margin: '0 auto',
      border: '1px solid rgb(233,233,233)',
      marginBottom: 30,
    },
  },

  wrapperDesktop: {
    display: 'block',
    width: '310px'
  }
};
