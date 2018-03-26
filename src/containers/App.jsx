import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchUserInfo } from '../actions';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import Stats from '../components/sidebar/Stats';
import MyActivities from './MyActivities';
import FloatingActionButton from '../components/sidebar/FloatingActionButton';
import Modal from './Modal';

import { getToken, tokenIsValid, isFellow, setSignInError, decodeToken } from '../helpers/authentication';

/**
 * @name App
 * @summary Renders the entire application
 * @return {jsx} React node for the entire application
 */

class App extends Component {
  /**
 * @name propTypes
 * @type {PropType}
 * @param {Object} propTypes - React PropTypes
 * @property {history} items - React router history object
*/
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    fetchUserInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.shape({
      name: PropTypes.string,
      picture: PropTypes.string,
    }).isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  componentWillMount() {
    // retrieve token from cookie
    const token = getToken();
    const tokenInfo = decodeToken(token);
    if (token === null || tokenIsValid(tokenInfo) === false || isFellow(tokenInfo) === false) {
      setSignInError();
      this.props.history.push('/');
    }
    this.props.fetchUserInfo(tokenInfo);
  }

  onFabClick = (event) => {
    if (event.type === 'keydown' && event.keyCode !== 13) {
      return;
    }
    if (document && document.body) {
      document.body.classList.add('noScroll');
    }
    this.setState({ showModal: true });
  }

  closeModal = () => {
    if (document && document.body) {
      document.body.classList.remove('noScroll');
    }
    this.setState({ showModal: false });
  }

  renderModal = () => {
    const className = this.state.showModal ? 'modal--open' : '';

    return (
      <Modal close={this.closeModal} className={className}>
        <div />
      </Modal>
    );
  }

  render() {
    const { userInfo } = this.props;
    return (
      <Fragment>
        <div className='headerBackground' />
        <div className='sidebarWrapper sidebarWrapper--sidebarOpen'>
          <Sidebar />
        </div>
        <main className='mainPage mainPage--sidebarOpen'>
          {/* <div className="coverPhotoWrapper" /> */}
          <div className='pageContent'>
            <Header history={this.props.history} userInfo={userInfo} />
            <div className='contentWrapper'>
              <div className='mainContent'>
                <MyActivities />
              </div>
              <aside className='sideContent'>
                <Stats
                  stats={[
                    {
                      value: '20',
                      name: 'Activities logged',
                    },
                    {
                      value: '1,590',
                      name: 'Points earned',
                    },
                  ]}
                />
              </aside>
            </div>
          </div>
        </main>
        {this.renderModal()}
        {
          this.state.showModal ?
            ''
            : <FloatingActionButton onClick={this.onFabClick} />
        }
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  fetchUserInfo: tokenInfo => (
    dispatch(fetchUserInfo(tokenInfo))
  ),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
