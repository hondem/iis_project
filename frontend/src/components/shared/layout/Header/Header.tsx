import React, { useState } from 'react';

import Link from 'next/link';
import { Menu as MenuIcon, LogOut as LogOutIcon } from 'react-feather';

import * as S from './Header.styles';
import { removeAuthToken } from '../../../../api/client';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { setAlertMessageAction } from '../../../../actions/auth';
import { Navigation } from '..';

/* <Header />
============================================================================= */
const Header: React.FunctionComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<setAlertMessageAction>>();

  /* Handle click on sign out icon */
  const signOut = () => {
    /* Remove auth token cookie */
    removeAuthToken();

    /* Redirect to sign-in */
    Router.push('/sign-in');

    /* Show success message */
    dispatch({
      type: '[AUTH] SET_ALERT_MESSAGE',
      payload: {
        alertMessage: {
          type: 'success',
          message: 'Odhlásenie bolo úspešné.',
        },
      },
    });
  };

  /* Handle navigation closing event */
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <S.Wrapper>
        <S.HeaderButton onClick={() => setIsMenuOpen(true)} title="Menu">
          <MenuIcon />
        </S.HeaderButton>

        <Link href="/" passHref>
          <S.Logo>Payday</S.Logo>
        </Link>

        <S.HeaderButton onClick={signOut} title="Odhlásiť" borderLeft>
          <LogOutIcon />
        </S.HeaderButton>
      </S.Wrapper>

      <Navigation isNavigationOpen={isMenuOpen} onNavigationClose={handleMenuClose} />
    </>
  );
};

export default Header;
