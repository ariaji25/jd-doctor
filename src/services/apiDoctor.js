import { dateFormat } from 'utils';
import request from 'utils/request';
import urls from 'values/urls';

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

const apiDoctor = { list, create };

export default apiDoctor;
