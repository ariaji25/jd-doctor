import { proxy } from 'valtio';

const stateMedicalRecord = proxy({
  selectedTab: 1,
  idPatient: '',

  keadaanUmum: '',
  kesadaran: '',
  tekananDarah: '',
  nadi: '',
  respirasi: '',
  suhu: '',
  beratBadan: '',
  tinggi: '',

  posisiMata: '',
  kelopakMata: '',
  gerakanMata: '',
  pergerakanBolaMata: '',
  kajungtiva: '',
  kornea: '',
  sklera: '',

  jalanNafas: '',
  pernafasan: '',
  suaraNafas: '',
  ototBantuPernafasan: '',
  lainnyaNafas: '',

  denyutApical: '',
  irama: '',
  bunyiJantung: '',
  sakitDada: '',
  timbul: '',
  karakter: '',

  gigi: '',
  gigiPalsu: '',
  lainnyaGigi: '',

  polaRutin: '',
  jumlahUro: '',
  warnaUro: '',
  lainnyaUro: '',

  turgorKulit: '',
  warnaKulit: '',
  kontrakturPersendian: '',
  kesulitanPergerakan: '',
  lainnyaIntegumen: '',

  mammae: '',
  areolla: '',
  papilla: '',
  colostrum: '',

  processing: false,
  error: '',
});

export default stateMedicalRecord;
