import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App/App';
import store from './store';

const Root = () => (
  <Provider store={store} >
    <App />
  </Provider>);

function render(RootComponent) {
  ReactDom.render(<RootComponent />,
    document.getElementById('app')
  );
}


if (module.hot) {
  module.hot.accept();
}

export default render(Root);
