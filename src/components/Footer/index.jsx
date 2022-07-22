import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12 no-padding">
          <div className="bottom-footer">
            <div className="row padding-top">
              <div className="col-lg-6 col-md-12 col-sm-12 col-12 no-padding footer-site">
                <div className="margin-right">
                  <div className="flex justify-content-end">
                    <div className="row">
                      <div className="col-md-4">
                        <ul className="footer-group">
                          <Link to="/designers"><li>DESIGNERS</li></Link>
                          <Link to="/products/bags"><li>BAGS</li></Link>
                          <Link to="/products/shoes"><li>SHOES</li></Link>
                          <Link to="/products/clothing"><li>CLOTHING</li></Link>
                          <Link to="/products/accessories"><li>ACCESSORIES</li></Link>
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <ul className="footer-group">
                          <Link to="/trending"><li>TRENDING</li></Link>
                          <Link to="/partnerships"><li>PARTNERSHIPS</li></Link>
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <ul className="footer-group">
                          <Link to="/our-story"><li>OUR STORY</li></Link>
                          <Link to="/contact-us"><li>CONTACT US</li></Link>
                        </ul>
                      </div>
                    </div> 
                    
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-12 no-padding">
                <div className="margin-left footer-social">
                  <div className="row">
                    <div className="follow-us">follow us</div>
                    <div className="retroced">@RETROCED</div>
                  </div>
                  <div className="social-icons-group justify-content-start clearfix">
                    <div className="social-icons">
                      <a href="https://www.instagram.com/retroced/" target="_blank" rel="noopener noreferrer" >
                        <i className="fa fa-instagram fa-3x" />
                      </a>
                    </div>
                    {/* <div className="social-icons">
                      <a href="https://www.youtube.com/channel/UCxsqTCzAe3_iw2i6uwP-KMw/featured" target="_blank" rel="noopener noreferrer" >
                        <i className="fa fa-youtube-play fa-3x" />
                      </a>
                    </div> */}
                    <div className="social-icons">
                      <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" >
                        <i className="fa fa-facebook-official fa-3x" />
                      </a>
                    </div>
                    <div className="social-icons">
                      <a href="https://www.pinterest.com/retroced" target="_blank" rel="noopener noreferrer" >
                        <i className="fa fa-pinterest fa-3x" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
