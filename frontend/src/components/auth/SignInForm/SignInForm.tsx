import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Flex, Box } from '../../shared/layout';
import { Input, Label, ErrorMessage } from '../../shared/forms';
import { Button, Alert, Link } from '../../shared/misc';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { setAlertMessageAction, saveUserAction } from '../../../actions/auth';
import { selectAlertMessage } from '../../../selectors/auth';
import { signIn } from '../../../api/client/auth';
import { setAuthToken } from '../../../api/client';
import Router from 'next/router';
import { ErrorReponse } from '../../../types/common';

/* Form data
============================================================================= */
type FormValues = {
  email: string;
  password: string;
};

const INITIAL_VALUES: FormValues = {
  email: '',
  password: '',
};

/* <SignInForm />
============================================================================= */
const SignInForm: React.FunctionComponent = () => {
  const alertMessage = useSelector(selectAlertMessage);
  const dispatch = useDispatch<Dispatch<setAlertMessageAction | saveUserAction>>();

  useEffect(() => {
    return () => {
      dispatch({ type: '[AUTH] SET_ALERT_MESSAGE', payload: { alertMessage: null } });
    };
  }, []);

  const getValidationSchema = (): Yup.Schema<object> =>
    Yup.object().shape({
      email: Yup.string()
        .email('Prosím zadajte valídnu emailovú adresu (napr. novak@email.sk).')
        .required('Prosím zadajte vašu emalovú adresu.'),
      password: Yup.string()
        .min(6, 'Heslo musí byť aspoň 6 znakov dlhé.')
        .required('Prosím zadate vaše heslo.'),
    });

  const handleSubmit = async ({ email, password }: FormValues) => {
    dispatch({ type: '[AUTH] SET_ALERT_MESSAGE', payload: { alertMessage: null } });

    await signIn(email, password)
      .then(({ data: user }) => {
        /* Save user into Redux state */
        dispatch({
          type: '[AUTH] SAVE_USER',
          payload: {
            user,
          },
        });

        /* Store user token into a cookie */
        setAuthToken(user?.accessToken);

        /* Redirect */
        Router.push('/');
      })
      .catch(({ response: { subType } }: ErrorReponse) => {
        switch (subType) {
          case 'NOT_FOUND':
            dispatch({
              type: '[AUTH] SET_ALERT_MESSAGE',
              payload: {
                alertMessage: {
                  type: 'error',
                  message: 'Zadaný užívateľ neexistuje.',
                },
              },
            });
            break;
          case 'USER_WRONG_PASSWORD':
            dispatch({
              type: '[AUTH] SET_ALERT_MESSAGE',
              payload: {
                alertMessage: {
                  type: 'error',
                  message: 'Zadali ste nesprávne heslo.',
                },
              },
            });
            break;
          case 'USER_NOT_FOUND':
            dispatch({
              type: '[AUTH] SET_ALERT_MESSAGE',
              payload: {
                alertMessage: {
                  type: 'error',
                  message: 'Zadaný užívateľ neexistuje.',
                },
              },
            });
            break;
          default:
            dispatch({
              type: '[AUTH] SET_ALERT_MESSAGE',
              payload: {
                alertMessage: {
                  type: 'error',
                  message: 'Prihlásenie bolo neúspešné.',
                },
              },
            });
        }
      });
  };

  return (
    <>
      {alertMessage && (
        <Alert type={alertMessage.type} mb="s8">
          {alertMessage.message}
        </Alert>
      )}

      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={getValidationSchema()}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <>
            <Form>
              <Box mb="s6">
                <Label htmlFor="email">Emailová adresa</Label>
                <Input type="email" name="email" autoComplete="email" autoFocus />
                <ErrorMessage name="email" />
              </Box>

              <Box mb="s6">
                <Label htmlFor="password">Heslo</Label>
                <Input type="password" name="password" autoComplete="current-password" />
                <ErrorMessage name="password" />
              </Box>

              <Flex flex={1} alignItems="center" justifyContent="space-between">
                <Button type="submit" color="blue" disabled={isSubmitting}>
                  {isSubmitting ? 'Prihlasovanie...' : 'Prihlásiť'}
                </Button>
                <Link href="/forgotten-password" color="grays.2">
                  Zabudnuté heslo?
                </Link>
              </Flex>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default SignInForm;
