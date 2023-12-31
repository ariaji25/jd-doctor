import moment from 'moment';

const { dateFormat, getCurrentUserFromStorage, getOU } = require("utils")
const { default: request } = require("utils/request")
const { default: urls } = require("values/urls")

const getOption = async (optionSetID) => {
  const response = await request.get(
    urls.OPTION_SET_API_URL,
    {
      params: {
        filter: `optionSet.id:eq:${optionSetID}`
      }
    }
  )
  return response.data.options && response.data.options.length > 0 ?
    response.data.options[0] : null
}

const createEnrollmentForMR = async (mrId, patientId) => {
  const enrollment = {
    orgUnit: getOU(),
    program: mrId,
    trackedEntityInstance: patientId,
    trackedEntityType: "MvJlDDrR78m"
  }
  const response = await request.post(urls.ENROLLMENTS, enrollment, {
    params: {
      strategy: "CREATE_AND_UPDATE"
    }
  })
  console.log("Response Enroll", response.data)
  return response.data
}

const getPatientMedicalRecordEnrollment = async (patientId) => {
  const response = await request.get(
    urls.PATIENT_UPDATE(patientId, getOU()),
    {
      params: {
        fields: "enrollments"
      }
    }
  )
  return response.data.trackedEntityInstances[0] ?? {};
}

const createNewMedicalRecord = async (programId, programStage, enrollmentId, dataValues, serviceID, patientId, willUpdateEvent) => {
  const eventDate = moment().format('YYYY-MM-DD')
  const eventData = {
    program: programId,
    eventDate: eventDate,
    programStage: programStage,
    enrollment: enrollmentId,
    enrollmentStatus: "ACTIVE",
    orgUnit: getOU(),
    trackedEntityInstance: patientId,
    dataValues: dataValues
  }

  const response = await request.post(urls.EVENTS,
    eventData,
    {
      params: {
        strategy: "CREATE_AND_UPDATE"
      }
    })
  return response.data
}

const updateMedicalRecord = async (event) => {
  const response = await request.post(
    urls.EVENTS,
    event,
    {
      params: {
        strategy: "CREATE_AND_UPDATE"
      }
    }
  )
  return response.data
}

const addMedicalRecordReference = async (serviceId, reference, referenceID) => {
  const _event = await request.get(`${urls.EVENTS}/${serviceId}`,
    {
      params: {
        fields: "[*]"
      }
    }
  )
  const newEvent = _event.data;
  if (newEvent) {
    let _newDataValues = newEvent.dataValues.filter(c => c.dataElement !== referenceID)
    _newDataValues.push({
      dataElement: referenceID,
      value: reference
    })
    newEvent.dataValues = _newDataValues
    const res = await request.post(urls.EVENTS, newEvent, { params: { strategy: "CREATE_AND_UPDATE" } })
    return res.data
  }
}

const getMedicalRecord = async (serviceID, programId) => {
  const response = await request.get(
    urls.EVENTS,
    {
      params: {
        filter: `FipmUjYUujm:eq:${serviceID}`,
        program: programId,
        fields: ':all',
        deleted: false
      }
    }
  )
  return response.data
}

const deleteMedicalRecord = async (id) => {
  const response = await request.delete(urls.EVENTS_ID(id))
  return response.data
}

const apiMedicalrecord = {
  getOption,
  createEnrollmentForMR,
  getPatientMedicalRecordEnrollment,
  createNewMedicalRecord,
  addMedicalRecordReference,
  getMedicalRecord,
  deleteMedicalRecord,
  updateMedicalRecord
}

export default apiMedicalrecord