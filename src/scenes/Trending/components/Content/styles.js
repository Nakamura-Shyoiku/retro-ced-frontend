export default({
  // to have only fix height
  image1: {
    maxHeight: '467px',
    height: '467px',
    width: 'auto',
    maxWidth: '49vw',
    '@media screen and (min-width: 1024px)': {
      maxHeight: '373.6px',
      height: '373.6px',
    },
    '@media screen and (max-width: 1023px)': {
      maxHeight: '373.6px',
      height: '373.6px',
      maxWidth: '48vw',
    },
  },
  image2: {
    maxHeight: '512px',
    height: '512px',
    width: 'auto',
    maxWidth: '49vw',
    '@media screen and (max-width: 1023px)': {
      maxHeight: '409.6px',
      height: '409.6px',
      maxWidth: '48vw',
    },
  },
  image3: {
    maxHeight: '614px',
    height: '614px',
    width: 'auto',
    maxWidth: '49vw',
    '@media screen and (max-width: 1023px)': {
      maxHeight: '491.2px',
      height: '491.2px',
      maxWidth: '48vw',
    },
  },
  image4: {
    maxHeight: '400px',
    height: '400px',
    width: 'auto',
    maxWidth: '49vw',
    '@media screen and (max-width: 1023px)': {
      maxHeight: '320px',
      height: '320px',
      maxWidth: '48vw',
    },
  },
  image5: {
    maxHeight: '600px',
    height: '600px',
    width: 'auto',
    maxWidth: '49vw',
    '@media screen and (max-width: 1023px)': {
      maxHeight: '480px',
      height: '480px',
      maxWidth: '48vw',
    },
  },
  image6: {
    maxHeight: '725px',
    height: '725px',
    width: 'auto',
    maxWidth: '49vw',
    '@media screen and (max-width: 1023px)': {
      maxHeight: '580px',
      height: '580px',
      maxWidth: '48vw',
    },
  },
  // container margin responsive
  container3: {
    marginRight: '80px',
    marginTop: '80px',
    '@media screen and (max-width: 1023px)': {
      marginRight: '30px',
      marginTop: '30px',
    },
  },
  container5: {
    marginTop: '70px',
    '@media screen and (max-width: 1023px)': {
      marginTop: '35px',
    },
  },
  container2: {
    marginTop: '80px',
    '@media screen and (max-width: 1023px)': {
      marginTop: '40px',
    },
  },
  container4: {
    marginTop: '70px',
    '@media screen and (max-width: 1023px)': {
      marginTop: '35px',
    },
  },
  container6: {
    marginTop: '70px',
    '@media screen and (max-width: 1023px)': {
      marginTop: '35px',
    },
  },
  // to have fix height and width, crop image
  // image1: {
  //   maxHeight: '467px',
  //   height: '467px',
  //   width: '400px',
  //   maxWidth: '49vw',
  //   objectFit: 'cover',
  //   overFlow: 'hidden',
  // },
  // image2: {
  //   maxHeight: '512px',
  //   height: '512px',
  //   width: '439px',
  //   maxWidth: '49vw',
  //   objectFit: 'cover',
  //   overFlow: 'hidden',
  // },
  // image3: {
  //   maxHeight: '614px',
  //   height: '614px',
  //   width: '410px',
  //   maxWidth: '49vw',
  //   objectFit: 'cover',
  //   overFlow: 'hidden',
  // },
  // image4: {
  //   maxHeight: '400px',
  //   height: '400px',
  //   width: '400px',
  //   maxWidth: '49vw',
  //   objectFit: 'cover',
  //   overFlow: 'hidden',
  // },
  // image5: {
  //   maxHeight: '600px',
  //   height: '600px',
  //   width: '400px',
  //   maxWidth: '49vw',
  //   objectFit: 'cover',
  //   overFlow: 'hidden',
  // },
  // image6: {
  //   maxHeight: '725px',
  //   height: '725px',
  //   width: '400px',
  //   maxWidth: '49vw',
  //   objectFit: 'cover',
  //   overFlow: 'hidden',
  // },
  // image style for vertical and horizontal
  imageVertical: {
    // maxHeight: '600px',
    height: '46.3vw',
    width: '100%',
    // maxWidth: '49vw',
    objectFit: 'cover',
    overFlow: 'hidden',
  },
  imageHorizontal: {
    // maxHeight: '450px',
    height: '36.4vw',
    width: '100%',
    // maxWidth: '49vw',
    objectFit: 'cover',
    overFlow: 'hidden',
  },
  // imageHorizontal2: {
  //   // maxHeight: '450px',
  //   height: '470px',
  //   width: '626px',
  //   // maxWidth: '49vw',
  //   objectFit: 'cover',
  //   overFlow: 'hidden',
  // },
});
