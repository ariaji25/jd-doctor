import { Box, Input } from '@chakra-ui/react';
import ButtonMainLarge from 'components/button/ButtonMainLarge';
import TextExtraSmall from 'components/text/TextExtraSmall';
import TextLabel from 'components/text/TextLabel';
import React, { useCallback, useEffect, useState } from 'react';
import stateBooking from 'states/stateBooking';
import { getCurrentUserFromStorage } from 'utils';
import colors from 'values/colors';

const OrderForSelfForm = () => {
  const [nik, setNik] = useState('');

  const init = useCallback(async () => {
    const biodata = await getCurrentUserFromStorage();
    setNik(biodata.nik);

    stateBooking.tei = biodata.id;
    stateBooking.nik = biodata.nik;
    stateBooking.patient = biodata;
  }, [setNik]);

  const onSubmit = () => {
    window.browserHistory.push('/services/appointment');
  };

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Box>
      <TextLabel>No NIK</TextLabel>
      <Input
        mb={nik.length < 16 ? '8' : '2'}
        color={colors.PRIMARY}
        type="tel"
        bg="#F2F2F2"
        border="none"
        textAlign="center"
        readOnly={true}
        defaultValue={nik}
      />
      {nik && (
        <TextExtraSmall mb="8" color="green.400">
          Data NIK ditemukan
        </TextExtraSmall>
      )}
      <ButtonMainLarge
        onClick={onSubmit}
        w="full"
      >
        Buat Janji
      </ButtonMainLarge>
    </Box>
  );
};

export default OrderForSelfForm;