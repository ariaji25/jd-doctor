import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react';
import ButtonMain from 'components/button/ButtonMain';
import FormBiodata from 'components/dashboard/biodata/FormBiodata';
import ToastNotif from 'components/Toast';
import { useState } from 'react';
import apiOtp from 'services/apiOtp';
import { apiPatient } from 'services/apiPatient';
import stateBooking from 'states/stateBooking';

const OrderForNewPatientForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setData(data);
    onOpen();
  };

  const onConfirm = async () => {
    setLoading(true);

    let payload = Object.assign({}, data);
    const res = await apiOtp.requestNRM(data.nohp);
    const nrm = res.data.nrm;

    if (nrm) {
      payload.nrm = nrm;

      try {
        await apiPatient.create(data, nrm);

        const patient = await apiPatient.getDetail(nrm);

        stateBooking.patient = patient;
        stateBooking.tei = patient.id;
        stateBooking.nik = patient.nik;

        setLoading(false);
        onClose();
        ToastNotif({
          message: 'Data berhasil disimpan!',
          type: 'success'
        });

        window.browserHistory.push('/services/appointment');
      } catch (error) {
        ToastNotif({
          message: 'Gagal memyimpan data pasien!',
          type: 'error'
        });
        console.error('❌', error);
      }
    } else {
      ToastNotif({
        message: 'Gagal mendapatkan Nomor Rekam Medis!',
        type: 'error'
      });
    }
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Konfirmasi</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align={"self-start"}>
              <Text mb={2} fontWeight={600}>
                Anda yakin ingin melanjutkan ?
              </Text>
              <Text mb={2} fontWeight={400}>
                Data pasien akan kami simpan untuk mendapatkan Nomor Rekam Medis.
              </Text>
              <Text>
                Pastikan Nomor Handphone (HP) pasien sudah sesuai.
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              variant={'ghost'}
              mr={3}
              onClick={onClose}
            >
              Periksa Kembali
            </Button>
            <ButtonMain
              isLoading={loading}
              onClick={onConfirm}
            >
              Lanjut
            </ButtonMain>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <FormBiodata
        onSubmit={onSubmit}
        submitLabel="Lanjut"
      />
    </Box>
  );
};

export default OrderForNewPatientForm;