import PrivateRoute from 'common/privateRoutes';
import React, { useEffect, useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiOtp from 'services/apiOtp';
import { apiPatient } from 'services/apiPatient';
import keyStorage from 'values/keyStorage';
import {
  AboutPage,
  ArticlePage,
  BasePage,
  DoctorPage,
  LandingPage,
  LoginPage,
  PrivacyPolicyPage,
  TermAndConditionPage
} from "views";
import PageNotFound from 'views/404';
import DetailArticle from "views/article/DetailArticle";
import DashboardPage from 'views/dashboard';
import ListPatientPage from 'views/dashboard/list-patient';
import ListPatientClinicPage from 'views/dashboard/list-patient-clinic';
import MedicalRecordPage from 'views/dashboard/medical-record';
import MedicalRecordDetailPage from 'views/dashboard/medical-record/medical-record-detail';
import MedicalRecordManagePage from 'views/dashboard/medical-record/medical-record-manage';
import ProfilePage from 'views/dashboard/profile';
import BiodataProfile from 'views/dashboard/profile/components/BiodataProfile';
import ForgotPasswordPage from 'views/forgot-password';
import PaymentSuccessPage from 'views/payment/PaymentSuccess';
import { RegisterPage } from 'views/register/Register';

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
  const nrm = localStorage.getItem(keyStorage.NRM);
  const location = history.location.pathname;

  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    globalState
  );

  const init = async () => {
    try {
      if (nrm) {
        const currentUser = await apiPatient.getDetail();
        if (currentUser && location === "/landing") {
          window.browserHistory.push("/");
        }
      }
    } catch (error) {
      console.log(error);

      if (!publicPath.includes(location.split("/")[1])) {
        apiOtp.loggedOuts();
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
              <Route path="/landing" component={LandingPage} />
              <Route exact path="/article" component={ArticlePage} />
              <Route exact path="/article/detail/:id" component={DetailArticle} />
              <Route path="/about" component={AboutPage} />
              <Route exact path="/doctor/:id?" component={DoctorPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/forgot-password" component={ForgotPasswordPage} />
              <Route path="/term-and-condition" component={TermAndConditionPage} />
              <Route path="/privacy-policy" component={PrivacyPolicyPage} />
              <Route path="/payment-success" component={PaymentSuccessPage} />
              <Route path="/sign-up" component={RegisterPage} />

              {/* Routes below only for authenticated users */}
              {/* <PrivateRoute component={BasePage} /> */}
              <Route exact path="/dashboard" component={DashboardPage} />
              <Route exact path="/dashboard/profile" component={ProfilePage} />
              <Route exact path="/dashboard/profile/biodata" component={BiodataProfile} />
              <Route exact path="/dashboard/list-patient" component={ListPatientPage} />
              <Route exact path="/dashboard/list-patient-clinic" component={ListPatientClinicPage} />
              <Route exact path="/dashboard/medical-record/:idPatient" component={MedicalRecordPage} />
              <Route exact path="/dashboard/medical-record/:idPatient/detail" component={MedicalRecordDetailPage} />
              <Route exact path="/dashboard/medical-record/:idPatient/:mrMethod" component={MedicalRecordManagePage} />

              <Route exact component={PageNotFound} />
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
