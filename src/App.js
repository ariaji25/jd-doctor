import PrivateRoute from 'common/privateRoutes';
import React, { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-datepicker/dist/react-datepicker.css';
import apiDoctor from 'services/apiDoctor';
import { setCurrentUserToStorage } from 'utils';
import keyStorage from 'values/keyStorage';
import {
  BasePage,
  LoginPage,
} from "views";
import PageNotFound from 'views/404';
import ForgotPasswordPage from 'views/forgot-password';
import PaymentSuccessPage from 'views/payment/PaymentSuccess';
import RecoveryPasswordPage from 'views/recovery-password';
import { RegisterPage } from 'views/register/Register';
import RegistrationStatusPage from 'views/registration-status';

const publicPath = [
  "login",
  "landing",
  "about",
  "article",
  "doctor",
  "term-and-condition",
  "privacy-policy",
  "payment-success"
];

const globalState = {
  sWidth: 1000,
  sHeight: 1000
};

export const globalContext = React.createContext(globalState);
const dispatchStateContext = React.createContext(undefined);


const App = ({ history }) => {
  const location = history.location.pathname;

  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    globalState
  );

  const init = async () => {
    try {
      const email = localStorage.getItem(keyStorage.EMAIL);
      console.log("Username", email)
      if (email) {
        const currentUser = await apiDoctor.getDetail();
        console.log("User", currentUser)
        if (currentUser && (location === "/" || location === "/dashboard")) {
          console.log(currentUser)
          setCurrentUserToStorage(currentUser)
          window.browserHistory.push("/");
        }
      } else {
        // window.browserHistory.push("/login");
      }
    } catch (error) {
      console.log(error);
      if (!publicPath.includes(location.split("/login")[1])) {
        apiDoctor.logOut();
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  useLayoutEffect(() => {
    function updateSize() {
      dispatch({
        sWidth: window.innerWidth,
        sHeight: window.innerHeight
      })
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => {
      window.removeEventListener('resize', updateSize);
    }
  }, [])

  return (
    <>
      <globalContext.Provider value={state}>
        <dispatchStateContext.Provider value={dispatch}>
          <ToastContainer />
          <Router history={history}>
            <Switch>
              {/* <Route path="/landing" component={LandingPage} /> */}
              {/* <Route exact path="/article" component={ArticlePage} />
              <Route exact path="/article/detail/:id" component={DetailArticle} />
              <Route path="/about" component={AboutPage} />
              <Route exact path="/doctor/:id?" component={DoctorPage} /> */}
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/forgot-password" component={ForgotPasswordPage} />

              {/* <Route exact path="/recovery-password/:param" component={RecoveryPasswordPage} /> */}
              <Route exact path="/reset-password" component={RecoveryPasswordPage} />
              <Route exact path="/registration-status" component={RegistrationStatusPage} />

              {/* <Route path="/term-and-condition" component={TermAndConditionPage} />
              <Route path="/term-and-condition" component={TermAndConditionPage} />
              <Route path="/privacy-policy" component={PrivacyPolicyPage} />
              <Route path="/payment-success" component={PaymentSuccessPage} /> */}
              <Route exact path="/sign-up" component={RegisterPage} />
              <Route path="/sign-up/:params" component={RegisterPage} />
              <Route path="/404" component={PageNotFound} />

              {/* Routes below only for authenticated users */}
              <PrivateRoute component={BasePage} />
              <Route component={PageNotFound} />
            </Switch>
          </Router>
        </dispatchStateContext.Provider>
      </globalContext.Provider>
    </>
  );
};

const mapper = (state) => {
  return {
    currentUser: state.authReducer.currentUser,

  };
};

const dispatcher = (dispatch) => {
  return {
  };
};

export default connect(mapper, dispatcher)(App);
