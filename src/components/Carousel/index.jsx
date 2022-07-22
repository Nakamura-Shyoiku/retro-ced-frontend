import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { P, Img } from 'dynamicdelta';
import styles from './styles';

class ReactCarousel extends React.Component {

  state = {
    windowWidth: window.innerWidth,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    return () => window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });
  }

  renderTagline = () => {
    if (this.state.windowWidth > 414) {
      return (
        <p style={styles.subtitles} className="subtitles">
          Your destination for the best in designer vintage and secondhand items
        </p>
      )
    }
    return null;
  }
  
  render() {
    return (
      <div className="row">
        <div className="col-12 no-padding">
          <Carousel
            showArrows={true}
            showThumbs={false}
            showStatus={false}
            stopOnHover={false}
            showIndicators={false}
            useKeyboardArrows
            interval={6000}
            transitionTime={1000}
            dynamicHeight
            infiniteLoop
          >
            <Link to="/editorpick/1">
              <div>
                <Img
                  componentID="5434786d-b5ee-4e6b-9bfe-451066efb408"
                  className="carousel-image"
                />
                {this.renderTagline()}
                <P
                  componentID="863b575f-8772-4eee-8e0d-6d6c2458313c"
                  className="sliderHeader"
                  style={styles.sliderHeader}
                />
                <P
                  componentID="dbec935f-44cb-43c5-9df9-daa5026ebfe8"
                  style={styles.subtitle}
                />
              </div>
            </Link>
            <Link to="/editorpick/2">
              <div>
                <Img
                  componentID="21274980-e283-4154-8ee2-db0e8aee4e2a"
                  className="carousel-image"
                />
                {this.renderTagline()}
                <P
                  componentID="69d868f2-7ebf-44aa-9c30-a8fa0c186f8a"
                  className="sliderHeader"
                  style={styles.sliderHeader}
                />
                <P
                  componentID="853ec3d9-9400-43e4-9892-d275e44b6453"
                  style={styles.subtitle}
                />
              </div>
            </Link>
            <Link to="/editorpick/3">
              <div>
                <Img
                  componentID="71c7f57a-aab0-49cf-9c0b-69162bcdb819"
                  className="carousel-image"
                />
                {this.renderTagline()}
                <P
                  componentID="50ccc73e-6d59-47df-a065-dafd49a627c1"
                  className="sliderHeader"
                  style={styles.sliderHeader}
                />
                <P
                  componentID="228b79d7-5594-44c4-a3fd-aeec39a3b261"
                  style={styles.subtitle}
                />
              </div>
            </Link>
            <Link to="/editorpick/4">
              <div>
                <Img
                  componentID="523e8e98-75ea-49b4-8aaa-acfb7c963068"
                  className="carousel-image"
                />
                {this.renderTagline()}
                <P
                  componentID="6a7e7a71-a921-46d7-b10a-e1576696cf46"
                  className="sliderHeader"
                  style={styles.sliderHeader}
                />
                <P
                  componentID="72003086-9b99-4c2e-a8b0-1a83e3b5baf8"
                  style={styles.subtitle}
                />
              </div>
            </Link>
          </Carousel>
          <div style={{ position: 'absolute', top: '20%', right: '5%' }} className="mobileHide">
            <div className="flex flex-column justify-content-between">
              <div className="social-icons">
                <a
                  href="https://www.instagram.com/retroced/"
                  className="fa fa-instagram fa-2x"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  &nbsp;
                </a>
              </div>
              {/* <div className="social-icons">
                <a
                  href="https://www.youtube.com/channel/UCxsqTCzAe3_iw2i6uwP-KMw/featured"
                  className="fa fa-youtube-play fa-2x"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  &nbsp;
                </a>
              </div> */}
              <div className="social-icons">
                <a
                  href="https://www.facebook.com"
                  className="fa fa-facebook-official fa-2x"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  &nbsp;
                </a>
              </div>
              <div className="social-icons">
                <a
                  href="https://www.pinterest.com/retroced"
                  className="fa fa-pinterest fa-2x"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  &nbsp;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReactCarousel;
