import request from 'utils/request';
import urls from 'values/urls';

const list = async () => {
  const d = await request.get(urls.CLINIC_LIST);

  const clinicAreaList = d.data.organisationUnits.map(
    (d) => ({
      value: d.description,
      label: d.description,
    })
  );
  return clinicAreaList;
};

const apiClinicArea = { list };

export default apiClinicArea;
