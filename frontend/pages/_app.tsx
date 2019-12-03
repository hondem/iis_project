import React, { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { parseCookies } from 'nookies';
import JwtDecode from 'jwt-decode';
import { Store } from 'redux';

import { User } from '../src/types/auth';
import { THEME } from '../src/theme';
import { GlobalStyles } from '../src/styles';
import initStore from '../src/store';
import { AppState } from '../src/reducers';
import { getUser } from '../src/api/shared/auth';

import 'react-big-calendar/lib/css/react-big-calendar.css';

class CustomApp extends App<{ store: Store<AppState> }> {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    const { accessToken } = parseCookies(ctx);

    if (accessToken) {
      const { user } = JwtDecode<{ user: User }>(accessToken);

      /* Get user from API */
      await getUser(ctx, user.id).then(response => {
        ctx.store.dispatch({ type: '[AUTH] SAVE_USER', payload: { user: response.data } });
      }).catch(() => {
        // TODO: Implement custom error handling
      });
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Lato:700|Raleway:400,700&display=swap&subset=latin-ext"
            rel="stylesheet"
          />
        </Head>

        <Provider store={store}>
          <ThemeProvider theme={THEME}>
            <Fragment>
              <GlobalStyles />

              <Component {...pageProps} />
            </Fragment>
          </ThemeProvider>
        </Provider>
      </>
    );
  }
}

export default withRedux(initStore)(CustomApp);
