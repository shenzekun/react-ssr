import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { MuiThemeProvider } from 'material-ui';
import { pink } from 'material-ui/colors';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import AppState from './store/app-state';
import TopicStore from './store/topic-store';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import App from './views/App';

const theme = createMuiTheme({
  palette: {
    primary: pink,
    accent: pink,
    type: 'light',
  },
});
const initialState = window.__INITIAL__STATE__ || {}; // eslint-disable-line
const root = document.getElementById('root');
const createApp = (TheApp) => {
  class Main extends React.Component {
    // Remove the server-side injected CSS.
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }
    render() {
      return <TheApp />;
    }
  }
  return Main;
};

const appState = new AppState(initialState.appState);
appState.init(initialState.appState)
const topicStore = new TopicStore(initialState.topicStore);
const render = (Component) => {
  ReactDom.render(
    <AppContainer>
      <Provider appState={appState} topicStore={topicStore}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Component />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  );
};
render(createApp(App));

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default; // eslint-disable-line
    render(createApp(NextApp));
  });
}
