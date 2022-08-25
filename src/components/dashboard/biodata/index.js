
import { Box, Center } from '@chakra-ui/react';
import TextLabel from 'components/text/TextLabel';
import TextTitleHitam from 'components/text/TextTitleHitam';
import ToastNotif from 'components/Toast';
import { useEffect, useState } from 'react';
import { apiPatient } from 'services/apiPatient';
import { setCurrentUserToStorage } from 'utils';
import keyStorage from 'values/keyStorage';
import FormBiodata from './FormBiodata';
import ProfilePictureEdit from './ProfilePictureEdit';

const Biodata = () => {
  const onSubmitDataPatient = async (data) => {
    if (window.confirm('Apakah Anda yakin menyimpan data ini?')) {
      try {
        setProcessing(true);
        const tei = localStorage.getItem(keyStorage.TEI);

        const teiStatus = await apiPatient.checkTeiAvailable(tei);
        
        if (teiStatus) {
          await apiPatient.update(data);
        } else {
          await apiPatient.create(data);
          apiPatient.getDetail();
        }

        setCurrentUserToStorage(data);

        ToastNotif({
          message: 'Data berhasil disimpan!',
          type: 'success'
        });
      } catch (error) {
        ToastNotif({
          message: `${error}`,
          type: 'error'
        });
        console.error('❌', error);
      } finally {
        setProcessing(false);
      }
    }
  };

  const [biodataValues, setBiodataValues] = useState();
  const [processing, setProcessing] = useState(false);

  const init = async () => {
    const biodata = await apiPatient.getDetail();
    setBiodataValues(biodata);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Box maxW="xl" mx="auto">
      <TextTitleHitam mt="8" mb="2" textAlign="center">
        Identitas pasien
      </TextTitleHitam>
      <TextLabel textAlign="center" mb="16">
        Sebelum melakukan janji temu bersama dokter silahkan terlebih dahulu
        mengisikan data diri.
      </TextLabel>

      <Center mb="16">
        <ProfilePictureEdit
          onClick={() => {
            // edit profile pic di sini...
          }}
        />
      </Center>
      <FormBiodata
        defaultValues={biodataValues}
        onSubmit={onSubmitDataPatient}
        submitLabel="Simpan"
        processing={processing}
      />
      <Box h="12" />
    </Box>
  );
};

export default Biodata;
