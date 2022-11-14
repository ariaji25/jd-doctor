import moment from 'moment';
import { getCurrentUserFromStorage, getOU } from 'utils';
import request from 'utils/request';
import DATE_DEFAULT_FORMAT from 'values/dateFormat';
import keyStorage from 'values/keyStorage';
import urls from 'values/urls';

const ATTR = {
  nrm: 'kOJUHSrbkBS',
  nama: 'HyfzjNVhlzM',
  tempatLahir: 'Qtjs7yonSYc',
  tanggalLahir: 'SSsiEz3cVbn',
  jenisKelamin: 'TlO4kdMfHqa',
  alamatDomisili: 'aRHSGgFeOjr',
  nohp: 'x9tchw0swEu',
  nik: 'xGjeKnsJobT',
};

const create = async ({
  nama,
  alamatKTP,
  alamatDomisili,
  nik,
  nohp,
  tempatLahir,
  tanggalLahir,
  jenisKelamin,
  noTelepon,
  agama,
}, nrm) => {
  const today = moment().format(DATE_DEFAULT_FORMAT);

  const payload = {
    trackedEntityType: 'NvPl8j4DzNA',
    orgUnit: getOU(),
    attributes: [
      {
        attribute: 'kOJUHSrbkBS',
        value: nrm ? nrm : localStorage.getItem(keyStorage.NRM),
      },
      {
        attribute: 'HyfzjNVhlzM',
        value: nama,
      },
      // {
      //   attribute: 'NCLBUYYxnWU',
      //   value: noTelepon,
      // },
      // {
      //   attribute: 'Q3tLvwl4Ttq',
      //   value: alamatKTP,
      // },
      {
        attribute: 'Qtjs7yonSYc',
        value: tempatLahir,
      },
      {
        attribute: 'SSsiEz3cVbn',
        value: tanggalLahir,
      },
      {
        attribute: 'TlO4kdMfHqa',
        value: jenisKelamin,
      },
      {
        attribute: 'aRHSGgFeOjr',
        value: alamatDomisili,
      },
      // {
      //   attribute: 'k3TvJYe6jBT',
      //   value: agama,
      // },
      {
        attribute: 'x9tchw0swEu',
        value: nohp,
      },
      {
        attribute: 'xGjeKnsJobT',
        value: nik,
      },
    ],
    enrollments: [
      {
        program: 'Rn9Uv17VmSO',
        status: 'ACTIVE',
        orgUnit: getOU(),
        enrollmentDate: today,
        incidentDate: today,
        events: [
          {
            program: 'Rn9Uv17VmSO',
            programStage: 'dbtQvmcQvp3',
            orgUnit: getOU(),
            dueDate: today,
            eventDate: today,
            status: 'ACTIVE',
          },
        ],
      },
    ],
  };

  await request.post(urls.PATIENT_CREATE, JSON.stringify(payload));
};

const update = async ({
  id,
  nama,
  alamatKTP,
  nik,
  nohp,
  tempatLahir,
  tanggalLahir,
  jenisKelamin,
  alamatDomisili,
  agama,
  ...biodata
}) => {
  const payload = {
    orgUnit: getOU(),
    attributes: [
      {
        attribute: 'kOJUHSrbkBS',
        value: localStorage.getItem(keyStorage.NRM),
      },
      {
        attribute: 'HyfzjNVhlzM',
        value: nama,
      },
      {
        attribute: 'NCLBUYYxnWU',
        value: nohp,
      },
      {
        attribute: 'Q3tLvwl4Ttq',
        value: alamatKTP,
      },
      {
        attribute: 'Qtjs7yonSYc',
        value: tempatLahir,
      },
      {
        attribute: 'SSsiEz3cVbn',
        value: tanggalLahir,
      },
      {
        attribute: 'TlO4kdMfHqa',
        value: jenisKelamin,
      },
      {
        attribute: 'aRHSGgFeOjr',
        value: alamatDomisili,
      },
      {
        attribute: 'k3TvJYe6jBT',
        value: agama,
      },

      {
        attribute: 'x9tchw0swEu',
        value: nohp,
      },
      {
        attribute: 'xGjeKnsJobT',
        value: nik,
      },
    ],
  };

  await request.put(urls.PATIENT_UPDATE(id + ''), JSON.stringify(payload));
};

const getPatientByNIK = async (nik) => {
  const { data } = await request.get(urls.PATIENT_DETAIL_BYNIK(nik));

  const { trackedEntityInstances } = data;
  let instance = trackedEntityInstances.length
    ? trackedEntityInstances[0]
    : null;

  if (!instance) {
    return;
  }

  const { attributes: attr, trackedEntityInstance: tei } = instance;

  const biodata = {
    id: tei,
    nama: attr.find((a) => a.attribute === ATTR.nama).value,
    alamatDomisili: attr.find((a) => a.attribute === ATTR.alamatDomisili).value,
    nik: attr.find((a) => a.attribute === ATTR.nik).value,
    nohp: attr.find((a) => a.attribute === ATTR.nohp).value,
    tempatLahir: attr.find((a) => a.attribute === ATTR.tempatLahir).value,
    tanggalLahir: attr.find((a) => a.attribute === ATTR.tanggalLahir).value,
    jenisKelamin: attr.find((a) => a.attribute === ATTR.jenisKelamin).value,
    nomorRekamMedis: attr.find((a) => a.attribute === ATTR.nrm).value,
  };

  return biodata;
};

/*
* nrms : Used to pass the NRM
* when booked for other patient 
*/
const getDetail = async (nrms) => {
  if (localStorage) {
    const nrm = nrms ? nrms : (localStorage.getItem(keyStorage.NRM) ?? '');
    const { data } = await request.get(urls.PATIENT_DETAIL(nrm));

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
      tempatLahir: attr.find((a) => a.attribute === ATTR.tempatLahir).value,
      tanggalLahir: attr.find((a) => a.attribute === ATTR.tanggalLahir).value,
      jenisKelamin: attr.find((a) => a.attribute === ATTR.jenisKelamin).value,
      nomorRekamMedis: attr.find((a) => a.attribute === ATTR.nrm).value,
    };

    return biodata;
  }
};

const checkTeiAvailable = async (tei) => {
  try {
    const { data } = await request.get(urls.PATIENT_CHECK_TEI(tei));

    const { status } = data;
    if (status !== "ERROR") return true;
    return false;
  } catch (error) {
    return false;
  }
};

const getPatienDetailByID = async (id) => {
  const response = await request.get(urls.PATIENT_UPDATE(id),
    {
      params: {
        fields: '[*]'
      }
    })
  return response.data;
}

const serviceHistory = async (id, page) => {
  const response = await request.get(urls.PATIENT_SERVICE_HISTORY(id), {
    params: {
      order: "created:DESC",
      totalPages: "true",
      page: page ?? 1,
      pageSize: 10,
      fields: '[*]',
      // filter: "PynURTrdTEs:gt:1"
      // page:
    }
  })
  return response.data;
}

const getAllPatients = async (page, pageSize) => {
  const response = await request.get(
    urls.PATIENTS(),
    {
      params: {
        totalPages: true,
        order: "created:desc",
        pageSize: pageSize || 5,
        page: page
      }
    }
  )
  return response.data;
}


const searchPatientBY = async (search, searchKey) => {
  const response = await request.get(
    urls.PATIENTS(),
    {
      params: {
        totalPages: true,
        order: "created:desc",
        pageSize: 10,
        page: 0,
        filter: `${searchKey}:like:${search}`
      }
    }
  )
  return response.data;
}

export const apiPatient = {
  create,
  update,
  getDetail,
  checkTeiAvailable,
  getPatientByNIK,
  getPatienDetailByID,
  serviceHistory,
  getAllPatients,
  searchPatientBY
};
