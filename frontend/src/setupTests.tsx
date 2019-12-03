import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ThemeProvider } from 'styled-components';
import { Formik, Form } from 'formik';
import 'jest-styled-components'

import { THEME } from './theme';

Enzyme.configure({ adapter: new Adapter() });

type WithWrapperProps = {
  withFormik?: boolean;
  withTheme?: boolean;
};

/**
 * Wraps shallow with custom wrappers.
 * @param options Object that specifies which wrappers should be used 
 */
export const shallowWithWrapper = ({ withTheme }: WithWrapperProps) => children => {
  if (withTheme) {
    return shallow(children, {
      wrappingComponent: ({ children }) => <ThemeProvider theme={THEME}>{children}</ThemeProvider>,
    });
  } else return shallow(children);
};

/**
 * Wraps mount with custom wrappers.
 * @param options Object that specifies which wrappers should be used 
 */
export const mountWithWrapper = ({ withFormik, withTheme }: WithWrapperProps) => children => {
  if (withFormik && withTheme) {
    return mount(children, {
      wrappingComponent: ({ children }) => (
        <ThemeProvider theme={THEME}>
          <Formik initialValues={{}} onSubmit={() => {}}>
            <Form>{children}</Form>
          </Formik>
        </ThemeProvider>
      ),
    });
  } else if (withFormik) {
    return mount(children, {
      wrappingComponent: ({ children }) => (
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>{children}</Form>
        </Formik>
      ),
    });
  } else if (withTheme) {
    return mount(children, {
      wrappingComponent: ({ children }) => <ThemeProvider theme={THEME}>{children}</ThemeProvider>,
    });
  }
};
