import config from 'utils/config';

const urls = {
  OTP_REQUEST: `${config.apiURL}/api/otp/request`,
  OTP_CHECK: `${config.apiURL}/api/otp/check`,
  REQUEST_NRM: `${config.apiURL}/api/patient/generate/nrm`,
  WA_ME: `https://wa.me/628116562201`,

  BOOKING_CREATE: `${config.apiURL}/api/events?strategy=CREATE_AND_UPDATE`,
  BOOKING_UPDATE: `${config.apiURL}/api/events`,

  PATIENT_CREATE: `${config.apiURL}/api/trackedEntityInstances`,
  DOCTOR_CREATE: `${config.apiURL}/api/register`,
  PATIENT_UPDATE: (id) => `${config.apiURL}/api/trackedEntityInstances/${id}`,
  PATIENT_DETAIL: (nrm) => `${config.apiURL}/api/trackedEntityInstances?program=Rn9Uv17VmSO&ou=FexDOKZlHSx&filter=kOJUHSrbkBS:EQ:${nrm}`,
  PATIENT_DETAIL_BYNIK: (nik) => `${config.apiURL}/api/trackedEntityInstances?program=Rn9Uv17VmSO&ou=FexDOKZlHSx&filter=xGjeKnsJobT:EQ:${nik}`,
  PATIENT_CHECK_TEI: (tei) => `${config.apiURL}/api/trackedEntityInstances/${tei}.json?fields=orgUnit,trackedEntityInstance,inactive,deleted`,

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
  DOCTER_DETAIL: (email) => `${config.apiURL}/api/trackedEntityInstances?program=wcA7dgdvgt3&ou=FexDOKZlHSx&filter=KNhGfY4ApxB:EQ:${email}`,
  DOCTER_SERVICE_HISTORY: (id) => `${config.apiURL}/api/events?filter=Mu6xWeUWtWV:eq:${id}`,
};

export default urls;
