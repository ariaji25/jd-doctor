import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text
} from '@chakra-ui/react';
import ButtonMain from 'components/button/ButtonMain';
import InputNoHP from 'components/input/InputNoHP';
import InputUnderlined from 'components/input/InputUnderlined';
import TextSmall from 'components/text/TextSmall';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import colors from 'values/colors';
import regexp from 'values/regexp';

const FormBiodata = ({
  onSubmit,
  submitLabel,
  defaultValues,
  processing,
}) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [nikInputVal, setNikInputVal] = useState('');
  const [noHp, setNoHp] = useState('');

  const init = useCallback(() => {
    if (defaultValues) {
      setValue('id', defaultValues.id);
      setValue('nama', defaultValues.nama);
      setValue('alamatKTP', defaultValues.alamatKTP);
      setValue('alamatDomisili', defaultValues.alamatDomisili);
      setValue('nik', defaultValues.nik);
      setValue('nohp', defaultValues.nohp);
      setValue('noTelepon', defaultValues.noTelepon);
      setValue('tempatLahir', defaultValues.tempatLahir);
      setValue('tanggalLahir', defaultValues.tanggalLahir);
      setValue('agama', defaultValues.agama);
      setValue('daerahKlinik', defaultValues.daerahKlinik);
      setValue('lokasiKlinik', defaultValues.lokasiKlinik);
      setValue('nomorRekamMedis', defaultValues.nomorRekamMedis);
      setValue('jenisKelamin', defaultValues.jenisKelamin);

      setJenisKelamin(defaultValues.jenisKelamin ?? '');
      setNikInputVal(defaultValues.nik ?? '');
      setNoHp(defaultValues.nohp ?? '');
    }
  }, [defaultValues, setValue]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div>
      <InputUnderlined
        isRequired
        type="text"
        autoCapitalize="words"
        icon="/icon/user.svg"
        errmessage={errors.nama?.message}
        label="Nama lengkap pasien"
        {...register('nama', {
          required: { value: true, message: "Nama tidak boleh kosong" },
          minLength: {
            value: 3, message: "Nama harus lebih dari 2 karakter"
          }
        })}
      />
      <Box h="6" />
      <InputUnderlined
        isRequired
        icon="/icon/map.svg"
        label="Alamat Domisili"
        errmessage={errors.alamatDomisili?.message}
        autoCapitalize="sentences"
        {...register('alamatDomisili', {
          required: { value: true, message: "Alamat Domisili tidak boleh kosong" },
        })}
      />
      <Box h="6" />
      <InputUnderlined
        isRequired
        type="tel"
        icon="/icon/credit_card.svg"
        label="No NIK"
        errmessage={errors.nik?.message}
        maxLength={16}
        value={nikInputVal}
        {...register('nik', {
          required: {
            value: true, message: "No NIK tidak boleh kosong"
          },
          minLength: {
            value: 16, message: "No NIK minimal/maksimal 16 angka"
          },
        })}
        onChange={(e) => {
          let { value } = e.target;
          if (value === '' || regexp.numberOnly.test(value)) {
            setValue('nik', value);
            setNikInputVal(value);
          }
        }}
      />
      <Box h="6" />
      <InputNoHP
        isRequired
        label="Nomor HP"
        maxLength={15}
        errmessage={errors.nohp?.message}
        value={noHp}
        {...register('nohp', {
          required: {
            value: true, message: "Nomor HP tidak boleh kosong"
          },
        })}
        onChangeNoHp={(e) => {
          setNoHp(e);
          setValue('nohp', e);
        }}
      />
      <Box h="6" />

      <InputUnderlined
        isRequired
        label="Tempat Lahir"
        errmessage={errors.tempatLahir?.message}
        icon="/icon/home.svg"
        autoCapitalize="words"
        {...register('tempatLahir', {
          required: { value: true, message: "Tempat Lahir tidak boleh kosong" },
        })}
      />
      <Box h="6" />
      <InputUnderlined
        isRequired
        type="date"
        min={moment(1945, "YYYY").format("YYYY-MM-DD")}
        max={moment(Date.now()).format("YYYY-MM-DD")}
        icon="/icon/calendar.svg"
        label="Tanggal Lahir"
        errmessage={errors.tanggalLahir?.message}
        {...register('tanggalLahir', {
          required: { value: true, message: "Tanggal Lahir tidak boleh kosong" },
        })}
      />

      <Box h="6" />
      <Box w="full">
        <Flex>
          <TextSmall fontWeight="thin">Jenis Kelamin</TextSmall>
          <Text fontSize="xs" color={colors.DANGER}>
            *
          </Text>
        </Flex>
        <RadioGroup
          name="jenisKelamin"
          value={jenisKelamin}
          onChange={(value) => {
            setJenisKelamin(value);
            setValue('jenisKelamin', value);
          }}
        >
          <Stack direction="row">
            <Radio value="male">Laki-Laki</Radio>
            <Radio value="female">Perempuan</Radio>
            {/* <Radio value="uItZD2OWK46">Unknown</Radio>
            <Radio value="TPoOZvG19cW">Other</Radio> */}
          </Stack>
        </RadioGroup>
      </Box>
      <Box h="6" />

      <ButtonMain onClick={handleSubmit(onSubmit)} w="full">
        {!processing ? <Text>{submitLabel}</Text> : <Spinner />}
      </ButtonMain>
    </div>
  );
};

export default FormBiodata;
