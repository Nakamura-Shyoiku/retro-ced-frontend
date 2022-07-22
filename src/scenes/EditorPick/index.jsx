import React from 'react';
import PropTypes from 'prop-types';
import PageNotFound from '../PageNotFound';
import EditorPick1 from './components/EditorPick1';
import EditorPick2 from './components/EditorPick2';
import EditorPick3 from './components/EditorPick3';
import EditorPick4 from './components/EditorPick4';
import Footer from '../../components/Footer';
import Subscribe from '../../components/Subscribe';
import CompanyInfo from '../../components/CompanyInfo';
import './style.css';

class EditorPick extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({}).isRequired,
  }
  state = {
    index: '1',
  }

  componentWillMount() {
    const { index } = this.context.router.route.match.params;
    this.setState({
      index,
    });
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 no-padding">
            <div style={{ height: '174px' }} />
            <div
              className="row"
              style={{ marginTop: '30px', marginBottom: '30px' }}
            >
              <div className="col-12 col-lg-10 mx-auto">
                {{
                1: <EditorPick1 />,
                2: <EditorPick2 />,
                3: <EditorPick3 />,
                4: <EditorPick4 />,
              }[this.state.index] || (<PageNotFound />)}
              </div>
            </div>
          </div>
        </div>
        <Subscribe />
        <Footer />
        <CompanyInfo />
      </div>
    );
  }
}

export default EditorPick;
