import { dateFormat, getCurrentUserFromStorage, getOU } from 'utils';
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
  email: 'KNhGfY4ApxB',
  strNumber: 'x4sNePtpkmR',
  strUrl: 'iVFHvAdkYL3',
  sipNumber: 'h7tG7kb6qzi',
  sipUrl: 'GFwYsmRCGsu',
  profileUrl: 'Y1sUdrYBs4W'
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
  if (attributes) {
    attributes.push({
      attribute: "mJolgOL7hjA",
      value: "0"
    })
  }

  const payload = {
    trackedEntityType: 'MvJlDDrR78m',
    orgUnit: "jp49nCFvI75",
    attributes: attributes,
    enrollments: [
      {
        program: 'zuQhdRo8Rnn',
        status: 'ACTIVE',
        orgUnit: "jp49nCFvI75",
        trackedEntityType: "MvJlDDrR78m",
        enrollmentDate: `${dateFormat(Date(), 'yyyy-MM-dd')}`,
        incidentDate: `${dateFormat(Date(), 'yyyy-MM-dd')}`,
        events: [
          {
            program: 'zuQhdRo8Rnn',
            programStage: 'OOpHOLnhQp6',
            orgUnit: "jp49nCFvI75",
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
    const { data } = await request.get(urls.DOCTER_DETAIL(email), {
      params: {
        ou: localStorage.getItem("ou"),
        fields: '[*]'
      }
    });

    const { trackedEntityInstances } = data;
    let instance = trackedEntityInstances.length
      ? trackedEntityInstances[0]
      : null;

    if (!instance) {
      return;
    }

    const { attributes: attr, trackedEntityInstance: tei, ou: orgUnit } = instance;
    const { enrollments } = instance
    localStorage.setItem(keyStorage.TEI, tei);

    const biodata = {
      id: tei,
      nama: (attr.find((a) => a.attribute === ATTR.nama) ? attr.find((a) => a.attribute === ATTR.nama).value : "-"),
      alamatDomisili: (attr.find((a) => a.attribute === ATTR.alamatDomisili) ? attr.find((a) => a.attribute === ATTR.alamatDomisili).value : "-"),
      nik: (attr.find((a) => a.attribute === ATTR.nik) ? attr.find((a) => a.attribute === ATTR.nik).value : "-"),
      nohp: (attr.find((a) => a.attribute === ATTR.nohp) ? attr.find((a) => a.attribute === ATTR.nohp).value : "-"),
      tanggalLahir: (attr.find((a) => a.attribute === ATTR.tanggalLahir) ? attr.find((a) => a.attribute === ATTR.tanggalLahir).value : "-"),
      jenisKelamin: (attr.find((a) => a.attribute === ATTR.jenisKelamin) ? attr.find((a) => a.attribute === ATTR.jenisKelamin).value : "-"),
      email: (attr.find((a) => a.attribute === ATTR.email) ? attr.find((a) => a.attribute === ATTR.email).value : "-"),
      ou: orgUnit,
      ouName: enrollments[0].orgUnitName,
      strNumber: (attr.find((a) => a.attribute === ATTR.strNumber) ? attr.find((a) => a.attribute === ATTR.strNumber).value : "-"),
      strUrl: (attr.find((a) => a.attribute === ATTR.strUrl) ? attr.find((a) => a.attribute === ATTR.strUrl).value : "-"),
      sipNumber: (attr.find((a) => a.attribute === ATTR.sipNumber) ? attr.find((a) => a.attribute === ATTR.sipNumber).value : "-"),
      sipUrl: (attr.find((a) => a.attribute === ATTR.sipUrl) ? attr.find((a) => a.attribute === ATTR.sipUrl).value : "-"),
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

const getAllClinicServiceHistory = async (id, page) => {
  const response = await request.get(urls.DOCTER_CLINIC_SERVICE_HISTORY(id), {
    params: {
      fields: '[*]',
      order: 'created:DESC',
      totalPages: true,
      page: page,
      pageSize: 10
    }
  })
  return response.data
}

const getHomeCareServiceHistory = async (date, id, conditions) => {
  const response = await request.get(urls.DOCTER_HOMECARE_SERVICE_HISTORY(id), {
    params: {
      filter: `arxuhT0GhPy:${conditions ?? queryConditions.equal}:${date}`,
      fields: '[*]',
      order: 'created:DESC'
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
      search: `${search}`.toUpperCase(),
    }
  })
  return response.data
}


const searchICD9CODE = async (search) => {
  const response = await request.get("https://clinicaltables.nlm.nih.gov/api/icd9cm_sg/v3/search", {
    params: {
      terms: search,
    }
  })
  return response.data
}

const apiDoctor = {
  list,
  create,
  getDetail,
  logOut,
  getClinicServiceHistory,
  getHomeCareServiceHistory,
  getServiceNotifications,
  searchDiagnosis,
  getAllClinicServiceHistory,
  searchICD9CODE
};

export default apiDoctor;
