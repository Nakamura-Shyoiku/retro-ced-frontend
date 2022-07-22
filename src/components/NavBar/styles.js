export default ({
  white: {
    color: '#ffffff',
    borderColor: '#ffffff',
  },
  black: {
    color: '#000000',
    borderColor: '#000000',
  },
  signInButton: {
    cursor: 'pointer',
    fontFamily: 'Proxima Nova Light',
    borderRadius: 5,
    verticalAlign: 'middle',
    textDecoration: 'none',
  },


  nav: {
    backgroundColor: 'rgb(0, 0, 0)',
    overflow: 'hidden',
    padding: '2em',
    display: 'none',
    '@media (min-width: 480px)': {
      display: 'block !important',
    },
  },
  
    navWide: {
      display: 'none',
      margin: '0 auto',
      '@media (min-width: 480px)': {
        navWide: {
          display: 'block',
        }
      }
    },      
  
    wideDiv: {
        textAlign: 'center',
    },
    'wideDiv a' : {
          textDecoration: 'none',
          display: 'inline-block',
          padding: '0 2em',
        },
      
    navNarrow: {
        textAlign: 'right',
        cursor: 'pointer',
        color: '#FFF',
        marginTop: '-45px',
        '@media (max-width: 480px)': {
        'navNarrow' : {
          display: 'none',
        },
        },
      },
  
      narrowLinks: {
        display: 'none',
      },
      'narrowLinks a' : {
          textDecoration: 'none',
          display: 'block',
          float: 'left',
          clear: 'left',
          padding: '0.5em 0',
        },
      



});


