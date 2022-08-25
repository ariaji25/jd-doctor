import { proxy } from 'valtio';

export const initBookingState = {
  layananId: '',
  namaLayanan: '',
  keluhan: '',
  nik: '',
  jenisPesanan: '',
  refNIK: '',
  refNama: '',
  tipeLayanan: '',
  daerahKlinik: '',
  klinik: '',
  klinikUid: '',
  namaDokter: '',
  tei: '',
  tglRencanaKunjungan: '',
  jamBerobat: '',
  hargaLayanan: '',
  patient: null,
  bookingId: '',
  paymentUrl: ''
};


export const resetStateBooking = () => {
  Object.keys(stateBooking).forEach((val) => {
    stateBooking[val] = initBookingState[val];
  });
};

const stateBooking = proxy(initBookingState);

export default stateBooking;
