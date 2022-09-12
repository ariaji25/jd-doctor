import moment from 'moment';
import urls from 'values/urls';
import request from '../utils/request';

const create = async (data = {
  tei: '',
  namaLayanan: '',
  hargaLayanan: '',
  tipeLayanan: '',
  tglRencanaKunjungan: '',
  keluhan: '',
  jenisPesanan: '',
  jamBerobat: '',
  namaDokter: '',
  daerahKlinik: '',
  klinik: '',
  klinikUid: '',
  refNIK: '',
  refNama: '',
}, status) => {

  const date = moment().format('YYYY-MM-DD');
  const req = await request.post(
    urls.BOOKING_CREATE,
    {
      dataValues: [
        {
          value: data.namaLayanan,
          dataElement: 'o8Yd7t1qNk6',
        },
        {
          value: data.tipeLayanan,
          dataElement: 'Sd9Z8lFBuQB',
        },
        {
          value: data.tglRencanaKunjungan,
          dataElement: 'arxuhT0GhPy',
        },
        {
          value: data.keluhan,
          dataElement: 'Yh6ylx8D3tO',
        },
        {
          value: data.jenisPesanan,
          dataElement: 'FebDwik7nQ5',
        },
        {
          value: data.jamBerobat,
          dataElement: 'X7GUfsOErZh',
        },
        {
          value: 'Waiting',
          dataElement: 'a5xBShlsRo8',
        },
        {
          value: 'Need verification',
          dataElement: 'xLeRj3JlXLO',
        },
        {
          value: data.namaDokter,
          dataElement: 'WeZLKi92kyq',
        },
        {
          value: data.daerahKlinik,
          dataElement: 'lzJQJ35mwDi',
        },
        {
          value: data.klinik,
          dataElement: 'MLMRJAh6nLA',
        },
        {
          value: data.refNIK,
          dataElement: 'GZi3X6d4lqu',
        },
        {
          value: data.refNama,
          dataElement: 'FwdxzpQ8w2I',
        },
        {
          value: data.hargaLayanan,
          dataElement: 'NwHWGOgcihm',
        },
      ],
      program: 'Rn9Uv17VmSO',
      programStage: 'dbtQvmcQvp3',
      orgUnit: data.klinikUid,
      trackedEntityInstance: data.tei,
      status: status ? status : 'ACTIVE',
      dueDate: date,
      eventDate: date,
      completedDate: date,
    }
  );

  return req.data;
};

const getByID = async (id) => {
  const req = await request.get(
    `${urls.BOOKING_UPDATE}/${id}.json`
  )
  return req.data
}

const getLayananList = async () => {
  const req = await request.get(urls.GET_LAYANAN_LIST);
  return req.data;
};

const updateBooking = async (data) => {
  const req = await request.post(
    urls.BOOKING_UPDATE,
    data,
  )
  return req.status === 200
}

const apiBooking = { create, getLayananList , getByID};

export default apiBooking;
