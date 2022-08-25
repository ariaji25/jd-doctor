import request from 'utils/request';
import urls from 'values/urls';

const list = async (area) => {
  const d = await request.get(urls.CLINICAREA_LIST(area));

  const clinicList = d.data.organisationUnits.map(
    (d) => ({
      value: { name: d.displayName, id: d.id },
      label: d.displayName,
    })
  );
  return clinicList;
};

const apiClinic = { list };

export default apiClinic;
