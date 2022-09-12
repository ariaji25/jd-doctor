import { dateFormat } from 'utils';
import { queryConditions } from 'utils/constant';
import request from 'utils/request';
import keyStorage from 'values/keyStorage';
import urls from 'values/urls';


const ATTR = {
  nrm: 'kOJUHSrbkBS',
  nama: 'HyfzjNVhlzM',
  tanggalLahir: 'SSsiEz3cVbn',
  jenisKelamin: 'TlO4kdMfHqa',
  alamatDomisili: 'aRHSGgFeOjr',
  nohp: 'x9tchw0swEu',
  nik: 'xGjeKnsJobT',
  email: 'KNhGfY4ApxB'
};

const list = async (clinic) => {
  const d = await request.get(urls.DOCTOR_LIST(clinic));

  const doctorList = d.data.users.map(
    (d) => ({
      value: { name: d.name, id: d.id },
      label: d.name,
    })
  );
  return doctorList;
};

const create = async (attributes) => {

  const payload = {
    trackedEntityType: 'NvPl8j4DzNA',
    orgUnit: 'FexDOKZlHSx',
    attributes: attributes,
    enrollments: [
      {
        program: 'wcA7dgdvgt3',
        status: 'ACTIVE',
        orgUnit: 'FexDOKZlHSx',
        trackedEntityType: "NvPl8j4DzNA",
        enrollmentDate: `${dateFormat(Date(), 'yyyy-MM-dd')}`,
        incidentDate: `${dateFormat(Date(), 'yyyy-MM-dd')}`,
        events: [
          {
            program: 'wcA7dgdvgt3',
            programStage: 'JOsX8D90CIM',
            orgUnit: 'FexDOKZlHSx',
            dueDate: `${dateFormat(Date(), 'yyyy-MM-dd')}`,
            eventDate: `${dateFormat(Date(), 'yyyy-MM-dd')}`,
            status: 'ACTIVE',
            dataValues: [
              {
                dataElement: 'CFQZCqxKm48',
                value: "0"
              }
            ]
          },
        ],
      },
    ],
  };

  await request.post(urls.DOCTOR_CREATE, payload);
};


/*
* nrms : Used to pass the NRM
* when booked for other patient 
*/
const getDetail = async () => {
  if (localStorage) {
    const email = (localStorage.getItem(keyStorage.EMAIL) ?? '');
    const { data } = await request.get(urls.DOCTER_DETAIL(email));

    const { trackedEntityInstances } = data;
    let instance = trackedEntityInstances.length
      ? trackedEntityInstances[0]
      : null;

    if (!instance) {
      return;
    }

    const { attributes: attr, trackedEntityInstance: tei } = instance;
    localStorage.setItem(keyStorage.TEI, tei);

    const biodata = {
      id: tei,
      nama: attr.find((a) => a.attribute === ATTR.nama).value,
      alamatDomisili: attr.find((a) => a.attribute === ATTR.alamatDomisili).value,
      nik: attr.find((a) => a.attribute === ATTR.nik).value,
      nohp: attr.find((a) => a.attribute === ATTR.nohp).value,
      tanggalLahir: attr.find((a) => a.attribute === ATTR.tanggalLahir).value,
      jenisKelamin: attr.find((a) => a.attribute === ATTR.jenisKelamin).value,
      email: attr.find((a) => a.attribute === ATTR.jenisKelamin).value,
    };

    return biodata;
  }
};

const logOut = () => {
  localStorage.clear()
  window.location = "/login"
}

const getClinicServiceHistory = async (date, id) => {
  const response = await request.get(urls.DOCTER_CLINIC_SERVICE_HISTORY(id), {
    params: {
      filter: `arxuhT0GhPy:eq:${date}`,
      fields: '[*]',
      order: 'created:ASC'
    }
  })
  return response.data
}

const getHomeCareServiceHistory = async (date, id, conditions) => {
  const response = await request.get(urls.DOCTER_HOMECARE_SERVICE_HISTORY(id), {
    params: {
      filter: `arxuhT0GhPy:${conditions??queryConditions.equal}:${date}`,
      fields: '[*]',
      order: 'created:ASC'
    }
  })
  return response.data
}

const getServiceNotifications = async (id) => {
  const response = await request.get(urls.DOCTER_HOMECARE_SERVICE_HISTORY(id), {
    params: {
      filter: `arxuhT0GhPy:eq:${dateFormat(new Date(), "yyyy-MM-dd")}`,
      fields: '[*]',
      pager: false,
      order: 'created:DESC'
    }
  })
  return response.data
}

const searchDiagnosis = async (search) => {
  const response = await request.get(urls.DIAGNOSIS_SEARCH, {
    params: {
      search: search,
    }
  })
  return response.data
}

const apiDoctor = { list, create, getDetail, logOut, getClinicServiceHistory, getHomeCareServiceHistory, getServiceNotifications, searchDiagnosis };

export default apiDoctor;
