import {
  Box,
  Button,
  Center,
  Circle,
  Flex,
  Image, Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text, useDisclosure,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import ButtonMain from 'components/button/ButtonMain';
import ButtonMainLarge from 'components/button/ButtonMainLarge';
import ButtonOutlined from 'components/button/ButtonOutlined';
import Content from 'components/Content';
import Footer from 'components/Footer';
import HeaderClean from 'components/HeaderClean';
import LayananKami from 'components/home/LayananKami';
import TextExtraSmall from 'components/text/TextExtraSmall';
import TextLabel from 'components/text/TextLabel';
import TextSubTitle from 'components/text/TextSubTitle';
import TextTitle from 'components/text/TextTitle';
import ToastNotif from 'components/Toast';
import moment from 'moment';
import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import apiBooking from 'services/apiBooking';
import stateBooking from 'states/stateBooking';
import { getCurrentUserFromStorage } from 'utils';
import { ORDERED_BY_OTHER, ORDER_FOR_OTHER } from 'utils/constant';
import colors from 'values/colors';
import DATE_DEFAULT_FORMAT from 'values/dateFormat';


let timeList = [];
for (let i = 0; i < 12; i++) {
  timeList.push({
    time: moment().set('hour', 9 + i).set('minute', 0),
    label: `${(9 + i).toString().padStart(2, '0')}:00 WIB`,
  });
  timeList.push({
    time: moment().set('hour', 9 + i).set('minute', 30),
    label: `${(9 + i).toString().padStart(2, '0')}:30 WIB`,
  });
}

let defaultTime = moment().set('hour', 9).set('minute', 0);
timeList.every(x => {
  if (x.time.isAfter(moment())) {
    defaultTime = x.time;
    return false;
  }
  return true;
});

const btnDate = (isSelected, day, onClick, key) => {
  return (
    <Button
      key={key}
      bg={isSelected ? colors.PRIMARY : "white"}
      rounded="xl"
      border={`1px solid ${colors.GRAY_BORDER_2}`}
      w="130px"
      fontWeight="normal"
      h="100px"
      onClick={onClick}
    >
      <Box>
        <Text fontSize="3xl" color={isSelected ? "white" : colors.PRIMARY}>
          {moment().add(day, 'days').format('DD')}
        </Text>
        <TextLabel color={isSelected ? "white" : colors.PRIMARY}>
          {moment().add(day, 'days').format('MMMM')}
        </TextLabel>
        <TextExtraSmall color={isSelected ? "white" : colors.PRIMARY}>Hari ini</TextExtraSmall>
      </Box>
    </Button>
  );
};

const SchedulePage = () => {
  const me = getCurrentUserFromStorage();
  const { isOpen, onClose } = useDisclosure();
  const [isSelectedToday, setIsSelectedToday] = useState(true);
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedTime, setSelectedTime] = useState(defaultTime.format('HH:mm'));
  const [loading, setLoading] = useState();

  const onNext = async () => {
    try {
      setLoading(true);

      stateBooking.tglRencanaKunjungan = selectedDate.format(DATE_DEFAULT_FORMAT);
      stateBooking.jamBerobat = selectedTime;

      if (stateBooking.jenisPesanan === ORDER_FOR_OTHER) {
        // Store the booking history in ordered patient
        stateBooking.refNIK = me.nik;
        stateBooking.refNama = me.nama;
        stateBooking.jenisPesanan = ORDERED_BY_OTHER;
        await apiBooking.create(stateBooking, 'COMPLETED');

        // Store the booking history in patient
        stateBooking.refNIK = stateBooking.patient.nik;
        stateBooking.refNama = stateBooking.patient.nama;
        stateBooking.tei = me.id;
        stateBooking.jenisPesanan = ORDER_FOR_OTHER;
      }

      const response = await apiBooking.create(stateBooking);
      if (response.response.importSummaries[0].reference) {
        ToastNotif({
          message: 'Berhasil memesan layanan!',
          type: 'success'
        });
        window.browserHistory.push(`/services/summary/${response.response.importSummaries[0].reference}`);
      } else {
        setLoading(false);
        ToastNotif({
          message: 'Gagal memesan layanan!',
          type: 'error'
        });
      }
    } catch (error) {
      setLoading(false);
      ToastNotif({
        message: 'Gagal memesan layanan!',
        type: 'error'
      });
      console.error('❌', error);
    }
  };

  const refInputDate = useRef(null);

  const onClickDate = (day) => {
    if (day === 0) {
      setIsSelectedToday(true);
    } else {
      setIsSelectedToday(false);
    }
    setSelectedDate(moment().add(day, 'days'));
    setSelectedDateIdx(day);
  };
  const btnDates = [0, 1, 2].map((e, i) => btnDate(selectedDateIdx === e, e, () => onClickDate(e), i));

  return (
    <>
      <Flex>
        <Box w="full" marginBottom={"100px"}>
          <HeaderClean withBackButton withoutLogo />

          <Content>
            <Box maxW="xl" mx="auto">
              <TextTitle color={colors.HITAM_PUDAR}>
                Pilih Jadwal Temu Dokter
              </TextTitle>
              <TextSubTitle color={colors.HITAM_PUDAR} fontWeight="thin" mb="5">
                Pilih jadwal untuk bertemu dokter
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
                    2
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
                    Jadwal
                  </Box>
                </Box>
              </Flex>

              <Box h="16" />

              <Box mb="5">
                <hr />
              </Box>
              <TextLabel mb="2">Pilih tanggal berobat</TextLabel>
              <Flex mb="4" gap="1">
                {btnDates}
                <Box position="relative">
                  <Box position="absolute" bottom={0} width="130px" >
                    <DatePicker
                      selected={selectedDate.toDate()}
                      className='datepicker-square'
                      ref={refInputDate}
                      minDate={moment().add(3, 'days').toDate()}
                      maxDate={moment().add(7, 'days').toDate()}
                      onChange={(date) => {
                        setSelectedDate(moment(date));
                        setIsSelectedToday(false);
                      }}
                    />
                  </Box>
                  <Button
                    bg={selectedDateIdx === -1 ? colors.PRIMARY : "white"}
                    rounded="xl"
                    border={`1px solid ${colors.GRAY_BORDER_2}`}
                    w="130px"
                    fontWeight="normal"
                    h="100px"
                    position="relative"
                    onClick={() => {
                      setSelectedDateIdx(-1);
                      refInputDate.current?.setOpen(true);
                    }}
                  >
                    <Box>
                      <Center pt="2" mb="2">
                        <Image
                          src={`/icon/calendar${selectedDateIdx === -1 ? '_white' : ''}.svg`}
                          alt=""
                          h="25px"
                          w="25px"
                        />
                      </Center>
                      <TextLabel color={selectedDateIdx === -1 ? "white" : colors.PRIMARY}>Pilih</TextLabel>
                      <TextExtraSmall>&nbsp;</TextExtraSmall>
                    </Box>
                  </Button>
                </Box>
              </Flex>

              <TextLabel mb="2">Pilih jam</TextLabel>
              <Flex alignItems="center" justifyContent="center">
                <Wrap w="full">
                  {timeList.map((j, i) => {
                    if (isSelectedToday && moment().isAfter(j.time)) {
                      return '';
                    }

                    if (selectedTime === j.time.format('HH:mm')) {
                      return (
                        <WrapItem key={`jam-list-${i}`}>
                          <ButtonMain
                            onClick={() => {
                              setSelectedTime(j.time.format('HH:mm'));
                            }}
                            w="100px"
                          >
                            {j.label}
                          </ButtonMain>
                        </WrapItem>
                      );
                    }

                    return (
                      <WrapItem key={`jam-list-${i}`}>
                        <ButtonOutlined
                          onClick={() => {
                            setSelectedTime(j.time.format('HH:mm'));
                          }}
                          w="100px"
                        >
                          {j.label}
                        </ButtonOutlined>
                      </WrapItem>
                    );
                  })}

                </Wrap>
              </Flex>
              <Box h="6" />
              <ButtonMainLarge
                isLoading={loading}
                onClick={onNext}
                w="full"
              >
                Lanjut
              </ButtonMainLarge>
            </Box>
          </Content>
        </Box>
        <Footer />
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <LayananKami />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SchedulePage;
