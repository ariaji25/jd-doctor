import React from "react";
import { Route } from 'react-router-dom';
import DashboardPage from './dashboard';
import ListPatientPage from "./dashboard/list-patient";
import ListPatientClinicPage from "./dashboard/list-patient-clinic";
import MedicalRecordPage from "./dashboard/medical-record";
import MedicalRecordManagePage from "./dashboard/medical-record/medical-record-manage";
import ProfilePage from "./dashboard/profile";
import BiodataProfile from "./dashboard/profile/components/BiodataProfile";

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
      <Route exact path="/dashboard" component={DashboardPage} />
      <Route exact path="/dashboard/profile" component={ProfilePage} />
      <Route exact path="/dashboard/profile/biodata" component={BiodataProfile} />
      <Route exact path="/dashboard/list-patient" component={ListPatientPage} />
      <Route exact path="/dashboard/list-patient-clinic" component={ListPatientClinicPage} />
      <Route exact path="/dashboard/medical-record/:idPatient" component={MedicalRecordPage} />
      <Route exact path="/dashboard/medical-record/:idPatient/:mrMethod/:serviceId" component={MedicalRecordManagePage} />
      <Route exact path="/dashboard/medical-record/:idPatient/:mrMethod" component={MedicalRecordManagePage} />
    </>
  );
};

export default BasePage;
