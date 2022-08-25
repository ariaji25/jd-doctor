import { ChakraProvider } from '@chakra-ui/react';
import ScrollToTop from 'components/ScrollToTop';
import { ConnectedRouter } from "connected-react-router";
import moment from 'moment';
import 'moment/locale/id';
import React from "react";
import ReactDOM from "react-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import theme from 'styles/theme';
import SEO from 'values/seo';
import App from './App';
import './index.css';
import store, { history } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import './styles/globals.css';

moment.locale('id');

window.store = store;
window.browserHistory = history;

ReactDOM.render(
  <HelmetProvider>
    <Helmet>
      <meta name="title" content={SEO.title} />
      <meta name="description" content={SEO.description} />
      <link rel="canonical" href={SEO.link} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={SEO.link} />
      <meta property="og:title" content={SEO.title} />
      <meta property="og:description" content={SEO.description} />
      <meta property="og:image" content="/img/landing-ss.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={SEO.link} />
      <meta property="twitter:title" content={SEO.title} />
      <meta property="twitter:description" content={SEO.description} />
      <meta property="twitter:image" content="/img/landing-ss.png" />
    </Helmet>

    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <ScrollToTop>
              <App history={history} />
            </ScrollToTop>
          </ConnectedRouter>
        </Provider>
      </ChakraProvider>
    </React.StrictMode>
  </HelmetProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
