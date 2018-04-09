import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';

const App = () => {
  return <h1>Hello World!</h1>
};

const mapStateToProps = state => ({
});

// App.propTypes = {
// }

export default connect(mapStateToProps)(App);
