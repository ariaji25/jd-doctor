import React from "react";
import { Route } from 'react-router-dom';
import DashboardPage from './dashboard';
import ServicePage from './order';
import AppointmentPage from './order/appointment';
import PatientPage from './order/patient';
import SchedulePage from './order/schedule';
import SummaryPage from './order/summary';
import PaymentPage from "./payment/Payment";
import PaymentMethodPage from "./payment/PaymentMethod";

const BasePage = () => {
  return (
    <>
      <Route exact path="/" component={DashboardPage} />
      <Route exact path="/services" component={ServicePage} />
      <Route exact path="/services/patient" component={PatientPage} />
      <Route exact path="/services/appointment" component={AppointmentPage} />
      <Route exact path="/services/schedule" component={SchedulePage} />
      <Route exact path="/services/summary/:id" component={SummaryPage} />
      <Route exact path="/services/payment-checkout" component={PaymentMethodPage} />
      <Route exact path="/services/payment" component={PaymentPage} />
    </>
  );
};

export default BasePage;
