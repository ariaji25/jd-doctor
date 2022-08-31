import React from "react";
import { Route } from 'react-router-dom';
import DashboardPage from './dashboard';
import ListCompPatient from "./dashboard/list-patient";
import ListCompPatientClinic from "./dashboard/list-patient-clinic";
import MedicalRecord from "./dashboard/medical-record";
import MedicalRecordManage from "./dashboard/medical-record/medical-record-manage";
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
      {/* <Route exact path="/services" component={ServicePage} />
      <Route exact path="/services/patient" component={PatientPage} />
      <Route exact path="/services/appointment" component={AppointmentPage} />
      <Route exact path="/services/schedule" component={SchedulePage} />
      <Route exact path="/services/summary/:id" component={SummaryPage} />
      <Route exact path="/services/payment-checkout" component={PaymentMethodPage} />
      <Route exact path="/services/payment" component={PaymentPage} /> */}
      <Route exact path="/dashboard" component={DashboardPage}/>
      <Route exact path="/dashboard/list-patient" component={ListCompPatient} />
      <Route exact path="/dashboard/list-patient-clinic" component={ListCompPatientClinic} />
      <Route exact path="/dashboard/medical-record/:idPatient" component={MedicalRecord} />
      <Route exact path="/dashboard/medical-record/:idPatient/:mrMethod" component={MedicalRecordManage} />
    </>
  );
};

export default BasePage;
