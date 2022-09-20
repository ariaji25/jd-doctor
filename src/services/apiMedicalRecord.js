import moment from 'moment';

const { dateFormat } = require("utils")
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
    orgUnit: "FexDOKZlHSx",
    orgUnitName: "Praktek JumpaDokter",
    program: mrId,
    trackedEntityInstance: patientId,
    trackedEntityType: "NvPl8j4DzNA"
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
    urls.PATIENT_UPDATE(patientId),
    {
      params: {
        fields: "enrollments"
      }
    }
  )
  return response.data
}

const createNewMedicalRecord = async (programId, programStage, enrollmentId, dataValues, serviceID, patientId) => {
  const eventDate = moment().format('YYYY-MM-DD')
  const eventData = {
    program: programId,
    eventDate: eventDate,
    programStage: programStage,
    enrollment: enrollmentId,
    enrollmentStatus: "ACTIVE",
    orgUnit: "FexDOKZlHSx",
    orgUnitName: "Praktek JumpaDokter",
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
    newEvent.dataValues.push({
      dataElement: referenceID,
      value: reference
    })
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
        program: programId
      }
    }
  )
  return response.data
}

const apiMedicalrecord = {
  getOption,
  createEnrollmentForMR,
  getPatientMedicalRecordEnrollment,
  createNewMedicalRecord,
  addMedicalRecordReference
}

export default apiMedicalrecord