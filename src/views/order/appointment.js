import {
  Box,
  Button, Circle,
  Flex,
  HStack,
  Image, Text
} from '@chakra-ui/react';
import ButtonMainLarge from 'components/button/ButtonMainLarge';
import Content from 'components/Content';
import Footer from 'components/Footer';
import HeaderClean from 'components/HeaderClean';
import TextLabel from 'components/text/TextLabel';
import TextSubTitle from 'components/text/TextSubTitle';
import TextTitle from 'components/text/TextTitle';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import apiClinic from 'services/apiClinic';
import apiClinicArea from 'services/apiClinicArea';
import apiDoctor from 'services/apiDoctor';
import apiServicePrices from 'services/apiServicePrices';
import stateBooking from 'states/stateBooking';
import { currencyFormat } from 'utils';
import colors from 'values/colors';

const HOME_CARE_KEY = 'homecare';
const ONSITE_KEY = 'onsite';

const dataValues = {
  [HOME_CARE_KEY]: {
    id: 'u210IplNxve',
    name: 'Palayanan di rumah',
    values: {
      'ARTdo7ftC7G': 'n7XVDlPb8WJ',
      'xsVqUjolJnH': 'LPH5Qihd5Ux',
      'gZ0DSZ2v3p6': 'fFLfhYeNaxA',
      'kLr9G2oYWd0': 'yUIh9XQqwWy',
      'Perawatan Luka': 'b3KEOx3Aa0H',
      'JNaZn3n6HaN': 'enzACS7PSah',
      'achrBAs8luI': 'XwbXDJqe9Je',
    }
  },
  [ONSITE_KEY]: {
    id: 'LYr2W0pIxX3',
    name: 'Kunjungan Klinik',
    values: {
      'ARTdo7ftC7G': 'q8dFWkwNMJS',
      'xsVqUjolJnH': 'JtpO3a0CUhm',
      'gZ0DSZ2v3p6': 'lmeeX5ZJ8i2',
      'kLr9G2oYWd0': 'MhyZyvVteRY',
      'Perawatan Luka': 'zclX2e1l3bc',
      'JNaZn3n6HaN': 'gzhaZrxlnvQ',
      'achrBAs8luI': 'ytHrqQJuamG',
    }
  },
};

const AppointmentPage = () => {

  const [clinicAreaList, setClinicAreaList] = useState([]);
  const [clinicList, setClinicList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [orderType, setOrderType] = useState(HOME_CARE_KEY);
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [servicePrice, setServicePrice] = useState('0');

  const onNext = () => {
    const { name: klinik, id: klinikUid } = getValues('klinik');
    stateBooking.daerahKlinik = getValues('daerahKlinik');
    stateBooking.klinik = klinik;
    stateBooking.klinikUid = klinikUid;
    stateBooking.namaDokter = getValues('namaDokter').name;
    stateBooking.tipeLayanan = dataValues[orderType].name;

    window.browserHistory.push(`/services/schedule`);
  };

  const onChangeClinicArea = async (e) => {
    setValue('daerahKlinik', e.value);
    const clinicList = await apiClinic.list(e.value);
    setClinicList(clinicList);
  };

  const onChangeClinic = async (e) => {
    setValue('klinik', e.value);
    getServicePrice(e.value.id, orderType);

    const doctorList = await apiDoctor.list(e.value.id);
    setDoctorList(doctorList);
  };

  const getServicePrice = async (clinicID, type) => {
    const now = new Date(Date.now());

    try {
      const prices = await apiServicePrices
        .list(now.getFullYear(), dataValues[type].id, clinicID);

      const price = prices
        .find((val) =>
          val.dataElement === dataValues[type].values[stateBooking.layananId]
        );

      stateBooking.hargaLayanan = price.value;
      setServicePrice(price.value);
    } catch (error) {
      console.log(error);
    }
  };

  const selectStyles = {
    container: (s) => ({
      ...s,
      borderBottom: '1px solid #aaa',
    }),
    placeholder: (s) => ({
      ...s,
      color: colors.HITAM_PUDAR,
      whiteSpace: 'nowrap',
    }),
    control: (s) => ({
      ...s,
      border: 0,
    }),
    dropdownIndicator: (s) => ({
      ...s,
      color: colors.HITAM_PUDAR,
    }),
  };

  const handleOrderType = (type) => {
    setOrderType(type);

    const selectedClinic = getValues('klinik');
    if (selectedClinic) {
      getServicePrice(selectedClinic.id, type);
    }
  };

  const init = async () => {
    const list = await apiClinicArea.list();
    setClinicAreaList(list);
  };

  useEffect(() => {
    if (clinicAreaList.length === 0) {
      init();
    }
  }, [orderType, clinicAreaList, servicePrice]);

  return (
    <>
      <Flex>
        <Box w="full" marginBottom={"100px"}>
          <HeaderClean withBackButton withoutLogo />
          <Content>
            <Box maxW="xl" mx="auto">
              <TextTitle color={colors.HITAM_PUDAR}>
                Pilih Dokter dan klinik
              </TextTitle>
              <TextSubTitle color={colors.HITAM_PUDAR} fontWeight="thin" mb="5">
                Pilih dokter terbaik untuk melayani Anda
              </TextSubTitle>

              <Flex>
                <Box position="relative" w="full">
                  <Box h="1" w="full" bg={colors.PRIMARY} />
                  <Circle
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%,-50%)"
                    bg={colors.PRIMARY}
                    color="white"
                    textAlign="center"
                    w="24px"
                    h="24px"
                    fontSize="xs"
                  >
                    1
                  </Circle>
                  <Box
                    position="absolute"
                    top="25px"
                    left="50%"
                    transform="translate(-50%,-50%)"
                    color={colors.PRIMARY}
                    textAlign="center"
                    fontSize="xs"
                  >
                    Dokter
                  </Box>
                </Box>
                <Box position="relative" w="full">
                  <Box h="1" w="full" bg="#ccc" />
                  <Circle
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%,-50%)"
                    bg="#ccc"
                    color="white"
                    textAlign="center"
                    w="24px"
                    h="24px"
                    fontSize="xs"
                  >
                    2
                  </Circle>
                  <Box
                    position="absolute"
                    top="25px"
                    left="50%"
                    transform="translate(-50%,-50%)"
                    color="#ccc"
                    textAlign="center"
                    fontSize="xs"
                  >
                    Jadwal
                  </Box>
                </Box>
              </Flex>

              <Box h="16" />
              <Box mb="5">
                <hr />
              </Box>

              <TextLabel mb="2">Layanan yang dipilih</TextLabel>
              <Flex mb="4" gap="1">
                <Button
                  className={`btn-layanan ${orderType === HOME_CARE_KEY ? 'active' : ''}`}
                  rounded="5px"
                  w="full"
                  onClick={() => {
                    handleOrderType(HOME_CARE_KEY);
                  }}
                >
                  <Flex alignItems="center">
                    <Image
                      h="25px"
                      src={`/icon/logo${orderType === HOME_CARE_KEY ? "_white" : ""}.svg`} alt="" mr="4" />
                    <Text>Dokter ke rumah Anda</Text>
                  </Flex>
                </Button>

                <Button
                  className={`btn-layanan ${orderType === ONSITE_KEY ? 'active' : ''}`}
                  rounded="5px"
                  w="full"
                  onClick={() => {
                    handleOrderType(ONSITE_KEY);
                  }}
                >
                  <Flex alignItems="center">
                    <Image
                      h="25px"
                      src={`/icon/clinic${orderType === ONSITE_KEY ? "_white" : ""}.svg`} alt="" mr="4" />
                    <Text>Datang ke klinik</Text>
                  </Flex>
                </Button>
              </Flex>

              <TextLabel mb="2">Pilih daerah klinik</TextLabel>
              <Select
                {...register('daerahKlinik', { required: true })}
                instanceId="daerahKlinik"
                placeholder="Pilih"
                components={{ IndicatorSeparator: () => null }}
                styles={selectStyles}
                options={clinicAreaList}
                onChange={onChangeClinicArea}
              />
              <Box h="6" />

              <TextLabel mb="2">Pilih klinik</TextLabel>
              <Select
                {...register('klinik', { required: true })}
                instanceId="klinik"
                options={clinicList}
                placeholder="Pilih"
                components={{ IndicatorSeparator: () => null }}
                styles={selectStyles}
                onChange={onChangeClinic}
              />
              <Box h="6" />

              <TextLabel mb="2">Pilih dokter</TextLabel>
              <Select
                {...register('namaDokter', { required: true })}
                instanceId="namaDokter"
                options={doctorList}
                placeholder="Pilih"
                components={{ IndicatorSeparator: () => null }}
                styles={selectStyles}
                onChange={(e) => setValue('namaDokter', e.value)}
              />

              <Box
                background={'#F5F5F5'}
                mt={"8"}
                height={"12"}
                borderRadius={"5px"}
                textAlign={"center"}
                alignContent={"center"}
                alignSelf={"center"}
                display={"grid"}
                padding={"4"}
              >
                <HStack justifyContent={'space-between'}>
                  <Text>{stateBooking.namaLayanan}</Text>
                  <Text>{currencyFormat(servicePrice)}</Text>
                </HStack>
              </Box>
              <Box h="6" />

              <ButtonMainLarge onClick={handleSubmit(onNext)} w="full">
                Lanjut
              </ButtonMainLarge>
            </Box>
          </Content>
        </Box>
        <Footer />
      </Flex>
    </>
  );
};

export default AppointmentPage;
