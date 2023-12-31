import { getCurrentUserFromStorage, getOU } from 'utils';
import config from 'utils/config';

const urls = {
  OTP_REQUEST: `${config.apiURL}/api/otp/request`,
  OTP_CHECK: `${config.apiURL}/api/otp/check`,
  REQUEST_NRM: `${config.apiURL}/api/patient/generate/nrm`,
  WA_ME: `https://wa.me/628116562201`,

  BOOKING_CREATE: `${config.apiURL}/api/events?strategy=CREATE_AND_UPDATE`,
  BOOKING_UPDATE: `${config.apiURL}/api/events?strategy=CREATE_AND_UPDATE`,
  BOOKING_DETAIL: (id) => `${config.apiURL}/api/events/${id}?strategy=CREATE_AND_UPDATE`,
  PATIENTS: () => `${config.apiURL}/api/trackedEntityInstances?program=El6a2lnac0D&ou=${getOU()}&fields=[*]`,
  PATIENT_CREATE: `${config.apiURL}/api/trackedEntityInstances`,
  DOCTOR_CREATE: `${config.apiURL}/api/register`,
  PATIENT_UPDATE: (id, ou) => `${config.apiURL}/api/trackedEntityInstances?trackedEntityInstance=${id}&ou=${ou}`,
  PATIENT_DETAIL: (nrm) => `${config.apiURL}/api/trackedEntityInstances?program=El6a2lnac0D&ou=${getOU()}&filter=kOJUHSrbkBS:EQ:${nrm}`,
  PATIENT_DETAIL_BYNIK: (nik) => `${config.apiURL}/api/trackedEntityInstances?program=El6a2lnac0D&ou=${getOU()}&filter=xGjeKnsJobT:EQ:${nik}`,
  PATIENT_CHECK_TEI: (tei, ou) => `${config.apiURL}/api/trackedEntityInstances?trackedEntityInstance=${tei}&ou=${ou}&fields=orgUnit,trackedEntityInstance,inactive,deleted`,

  GET_LAYANAN_LIST: `${config.apiURL}/api/29/options?filter=optionSet.id:eq:efYkwRxNLXq`,
  DOCTOR_LIST: (clinic) => `${config.apiURL}/api/users.json?fields=id,name&filter=userGroups.id:eq:EEYd5tvXZ5d&ou=${clinic}&paging=false`,
  SERVICE_PRICES: (period, dataset, ou) => `${config.apiURL}/api/dataValueSets.json?period=${period}&dataSet=${dataset}&orgUnit=${ou}`,
  CLINIC_LIST: `${config.apiURL}/api/organisationUnits?fields=id,description,displayName,path,level&filter=id:!eq:V7PEJohVXYL&level=2&paging=false`,
  CLINICAREA_LIST: (area) => `${config.apiURL}/api/organisationUnits?fields=id,description,displayName,path,level&filter=id:!eq:V7PEJohVXYL&filter=description:eq:${area}&paging=false`,

  ARTICLE_LIST: `${config.apiURL}/api/articles`,
  TAG_LIST: `${config.apiURL}/api/article/tags`,

  // Payment
  PAYMENT_METHOD: `${config.apiURL}/api/payment-channels`,
  REQUEST_PAYMENT: `${config.apiURL}/api/payment`,
  PAYMENT_STATUS: `${config.apiURL}/api/payment-status`,

  // Bucket
  BUCKET_UPLOAD_REGISTER: `${config.apiURL}/api/register-bucket`,

  // LOGIN
  LOGIN_URL: `${config.apiURL}/api/login`,
  DOCTER_DETAIL: (email) => `${config.apiURL}/api/trackedEntityInstances?program=zuQhdRo8Rnn&filter=KNhGfY4ApxB:EQ:${email}`,
  DOCTER_CLINIC_SERVICE_HISTORY: (id) => `${config.apiURL}/api/events?filter=Mu6xWeUWtWV:eq:${id}&filter=Sd9Z8lFBuQB:like:Kunjungan`,
  DOCTER_HOMECARE_SERVICE_HISTORY: (id) => `${config.apiURL}/api/events?filter=Mu6xWeUWtWV:eq:${id}&status=COMPLETED&filter=Sd9Z8lFBuQB:like:Pelayanan&programStage=Aic2hFz57cE`,
  // DOCTER_HOMECARE_SERVICE_HISTORY_NOTIF: (id) => `${config.apiURL}/api/events?filter=Mu6xWeUWtWV:eq:${id}&filter=a5xBShlsRo8:eq:Waiting&filter=xLeRj3JlXLO:gt:1&rootJunction=OR`,
  DIAGNOSIS_SEARCH: `${config.apiURL}/api/diagnosis`,

  // HISTORY
  PATIENT_SERVICE_HISTORY: (id) => `${config.apiURL}/api/events?trackedEntityInstance=${id}&programStage=Aic2hFz57cE`,
  //OPTIONS
  OPTION_SET_API_URL: `${config.apiURL}/api/options?fields=[id,code,name]`,

  // NEROLLMENTS
  ENROLLMENTS: `${config.apiURL}/api/enrollments`,
  //EVENTS
  EVENTS: `${config.apiURL}/api/events`,
  EVENTS_ID: id => `${config.apiURL}/api/events/${id}`,
  //ICD9:
  ICD9_URL: `${config.icd9ApiURL}`,
  CHECK_REGISTRATION_STATUS: `${config.apiURL}/api/register-status`,
  //RESET
  REQ_RESET_PWD: `/api/request-reset-password`,
  RESET_PASSWORD: `${config.apiURL}/api/reset-password`
  

};

export default urls;
