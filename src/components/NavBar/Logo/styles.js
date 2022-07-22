export default ({
  logo: {
    fontSize: '5em',
    height: '1.25em',
    width: 'auto',
    '@media all and (max-width : 768px)': {
      width: '100%',
    },
    '@media (max-width: 414px)': {
      width: '150px',
      height: '50px',
    },
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: '1rem',
    '@media (max-width: 414px)': {
      display: 'none',
    },
  },
});
