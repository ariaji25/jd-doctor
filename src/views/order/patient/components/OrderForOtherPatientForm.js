import { Search2Icon } from '@chakra-ui/icons';
import { Box, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import ButtonMainLarge from 'components/button/ButtonMainLarge';
import TextExtraSmall from 'components/text/TextExtraSmall';
import TextLabel from 'components/text/TextLabel';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiPatient } from 'services/apiPatient';
import stateBooking from 'states/stateBooking';
import colors from 'values/colors';

const HelpMessage = ({ msg, isErr }) => {
  return (
    <TextExtraSmall mb="4" color={isErr ? "red.500" : colors.PRIMARY}>
      {msg}
    </TextExtraSmall>
  );
};

const OrderForOtherPatientForm = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const [foundPatient, setFoundPatient] = useState(false);
  const [findUserLoading, setFindUserLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setFindUserLoading(true);
      const patient = await apiPatient.getPatientByNIK(data.nik);

      if (patient) {
        setFoundPatient(true);

        stateBooking.tei = patient.id;
        stateBooking.nik = data.nik;
        stateBooking.patient = patient;
      }
    } catch (error) {
      console.log(error);
      setFoundPatient(false);
    }

    setFindUserLoading(false);
  };

  const onNext = () => {
    window.browserHistory.push('/services/appointment');
  };

  const nik = getValues("nik");
  return (
    <Box>
      <TextLabel>No NIK</TextLabel>
      <InputGroup
        onChange={e => {
          setFoundPatient(false);
        }}
      >
        <Input
          required
          mb={"4"}
          color={colors.PRIMARY}
          type="tel"
          bg="#F2F2F2"
          border="none"
          textAlign="center"
          maxLength={16}
          {...register('nik', {
            required: {
              value: true, message: "No NIK tidak boleh kosong"
            },
            minLength: {
              value: 16, message: "No NIK minimal/maksimal 16 angka"
            },
          })}
        />
        <InputRightElement width='4.5rem'>
          <Button
            disabled={errors && errors?.nik}
            h='1.75rem'
            variant={"unstyled"}
            onClick={handleSubmit(onSubmit)}
            isLoading={findUserLoading}
            _loading={{ padding: 2 }}
          >
            <Search2Icon />
          </Button>
        </InputRightElement>
      </InputGroup>
      {errors && errors?.nik && (
        <HelpMessage msg={errors?.nik?.message} isErr={true} />
      )}
      {!(errors && errors?.nik) &&
        <>
          {foundPatient && (
            <HelpMessage msg={"Data NIK ditemukan"} />
          )}
          {!findUserLoading && !foundPatient &&
            nik && nik.length === 16 && (
              <HelpMessage msg={"Data NIK tidak ditemukan"} isErr={true} />
            )}
        </>
      }
      <ButtonMainLarge
        disabled={!foundPatient}
        onClick={onNext}
        w="full"
      >
        Lanjut
      </ButtonMainLarge>
    </Box>
  );
};

export default OrderForOtherPatientForm;