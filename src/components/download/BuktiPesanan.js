import {
  Box, Button, Center, Flex, Image, List, ListIcon, ListItem, Progress, Spacer, Table, Tbody, Td, Text, Tr
} from '@chakra-ui/react';
import LogoWithText from 'components/LogoWithText';
import TextExtraSmall from 'components/text/TextExtraSmall';
import TextSubTitle from 'components/text/TextSubTitle';
import TextTitleHitam from 'components/text/TextTitleHitam';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import stateBooking from 'states/stateBooking';
import { currencyFormat } from 'utils';
import { InfoIcon } from '@chakra-ui/icons';
import { useSnapshot } from 'valtio';
import colors from 'values/colors';
import apiBooking from 'services/apiBooking';
import { useParams } from 'react-router-dom'
import ButtonMain from 'components/button/ButtonMain';

const BuktiPesanan = ({ contentRef }) => {
  const { id } = useParams();

  const StateBooking = useSnapshot(stateBooking);
  const [date, setDate] = useState(moment());

  const [bookingData, setBookingData] = useState(null);

  const [isHomeCare, setIsHomeCare] = useState(false);

  const getBookingData = async () => {
    console.log("Booking id", id)
    const data = await apiBooking.getByID(id);
    console.log("Booking", data)
    setIsHomeCare(StateBooking.tipeLayanan === "Palayanan di rumah");
    setBookingData(data);
  }

  const init = useCallback(() => {
    console.log("Contentref", contentRef)
    stateBooking.bookingId = id;
    if (StateBooking.tglRencanaKunjungan && StateBooking.jamBerobat) {
      const dateString = `${StateBooking.tglRencanaKunjungan}T${StateBooking.jamBerobat}`;
      setDate(moment(dateString));
      getBookingData()
    }


  }, [StateBooking.jamBerobat, StateBooking.tglRencanaKunjungan]);


  useEffect(() => {
    init();
  }, [init]);

  const homeCareService = () => {
    return (
      <div>
        <Box>
          <Center mb="8" mt="8">
            <LogoWithText h="40px" />
          </Center>
          <div>
            <TextTitleHitam textAlign="center">Detail Pembayaran</TextTitleHitam>
            <Text
              fontSize="md"
              textAlign="center"
              mb="4"
              color={colors.HITAM_PUDAR}
              fontWeight="normal"
            >
              Detail keluhan dan biaya
            </Text>
          </div>
          <Box mb="5">
            <hr />
          </Box>
          {/* The payment detail section */}
          <Box>
            <Text
              fontSize="14px"
              textAlign="left"
              mb="4"
              color={colors.HITAM_PUDAR}
              fontWeight="normal">
              Pembayaran
            </Text>
            <Flex>
              <Text
                marginTop={"-10px"}
                fontSize="md"
                textAlign="left"
                mb="4"
                color={colors.PRIMARY}
                fontWeight="500">
                {StateBooking.namaLayanan}
              </Text>
              <Spacer />
              <Text
                marginTop={"-10px"}
                fontSize="md"
                textAlign="right"
                mb="4"
                color={colors.PRIMARY}
                fontWeight="500">
                Rp. {currencyFormat(StateBooking.hargaLayanan)}
              </Text>
            </Flex>
            <Box mb="5">
              <hr />
            </Box>
            <Flex>
              <Text
                marginTop={"-10px"}
                fontSize="md"
                textAlign="left"
                mb="4"
                color={colors.PRIMARY}
                fontWeight="bold">
                Total bayar
              </Text>
              <Spacer />
              <Text
                marginTop={"-10px"}
                fontSize="md"
                textAlign="right"
                mb="4"
                color={colors.PRIMARY}
                fontWeight="bold">
                Rp. {currencyFormat(StateBooking.hargaLayanan)}
              </Text>
            </Flex>
            <Box>
              <List>
                <ListItem textColor={'red'} fontSize={'12px'}>
                  <ListIcon marginRight={'10px'}>
                    <InfoIcon color={"red"} />
                  </ListIcon>
                  Biaya yang tercantum belum termasuk biaya tindakan dan obat
                </ListItem>
              </List>
            </Box>
            <Box h={"16px"} />
            <Box mb="5">
              <hr />
            </Box>
            {/* The doctor detail section */}
            <Box>
              <Text
                fontSize="14px"
                textAlign="left"
                mb="4"
                color={colors.HITAM_PUDAR}
                fontWeight="normal">
                Dokter yang menangani
              </Text>
              <Box h={"16px"} />
              <Text
                fontSize="lg"
                textAlign="left"
                mb="4"
                color={colors.PRIMARY}
                fontWeight="bold">
                {StateBooking.namaDokter}
              </Text>
              <Text
                marginTop={"-10px"}
                fontSize="14px"
                textAlign="left"
                mb="4"
                color={colors.HITAM_PUDAR}
                fontWeight="normal">
                {StateBooking.namaLayanan}
              </Text>
            </Box>
            <Box h={"16px"} />
            <Box mb="5">
              <hr />
            </Box>
            {/* Patient detail section */}
            <Box>
              <Text
                fontSize="14px"
                textAlign="left"
                mb="4"
                color={colors.HITAM_PUDAR}
                fontWeight="normal">
                Nama Pasien
              </Text>
              <Text
                marginTop={"-10px"}
                fontSize="lg"
                textAlign="left"
                mb="4"
                color={colors.PRIMARY}
                fontWeight="bold">
                {StateBooking.patient ? StateBooking.patient.nama : "-"}
              </Text>
              <Box h={"16px"} />

              <Text
                fontSize="14px"
                textAlign="left"
                mb="4"
                color={colors.HITAM_PUDAR}
                fontWeight="normal">
                Layanan
              </Text>
              <Text
                marginTop={"-10px"}
                fontSize="lg"
                textAlign="left"
                mb="4"
                color={colors.PRIMARY}
                fontWeight="bold">
                {StateBooking.namaLayanan}
              </Text>
              <Box h={"16px"} />

              <Text
                fontSize="14px"
                textAlign="left"
                mb="4"
                color={colors.HITAM_PUDAR}
                fontWeight="normal">
                Keluhan yang dirasakan
              </Text>
              <Text
                marginTop={"-10px"}
                fontSize="lg"
                textAlign="left"
                mb="4"
                color={colors.PRIMARY}
                fontWeight="bold">
                {StateBooking.keluhan}
              </Text>
              <Box h={"16px"} />

              <Text
                fontSize="14px"
                textAlign="left"
                mb="4"
                color={colors.HITAM_PUDAR}
                fontWeight="normal">
                Waktu/Tanggal berobat
              </Text>
              <Text
                marginTop={"-10px"}
                fontSize="lg"
                textAlign="left"
                mb="4"
                color={colors.PRIMARY}
                fontWeight="bold">
                {StateBooking.jamBerobat} | {StateBooking.tglRencanaKunjungan}
              </Text>
              <Box h={"16px"} />

              <Text
                fontSize="14px"
                textAlign="left"
                mb="4"
                color={colors.HITAM_PUDAR}
                fontWeight="normal">
                Alamat janji temu
              </Text>
              <Text
                marginTop={"-10px"}
                fontSize="lg"
                textAlign="left"
                mb="4"
                color={colors.PRIMARY}
                fontWeight="bold">
                Jl. Winterfell No.12 - Winterfell
              </Text>
              <Box h={"16px"} />

            </Box>
            <Box mb="5">
              <hr />
            </Box>
            {/* Price summary */}
            <Flex>
              <Text
                fontSize="18px"
                textAlign="left"
                mb="4"
                color={colors.PRIMARY}
                fontWeight="700">
                Total Biaya
              </Text>
              <Spacer />
              <Text
                fontSize="18px"
                textAlign="right"
                mb="4"
                color={colors.PRIMARY}
                fontWeight="bold">
                Rp. {currencyFormat(StateBooking.hargaLayanan)}
              </Text>
            </Flex>
            <Box mb="5">
              <hr />
            </Box>
            <ButtonMain
              w="full"
              mb="2"
              onClick={(e) => window.browserHistory.push("/services/payment-checkout")}
            >
              Lanjut Pembayaran
            </ButtonMain>
          </Box>
        </Box>
      </div>
    )
  }

  const clinicService = () => {
    return (
      <div
        ref={contentRef}
      >
        <Box>
          <Center mb="8" mt="8">
            <LogoWithText h="40px" />
          </Center>
          <div>
            <TextTitleHitam textAlign="center">Detail Pesanan</TextTitleHitam>
            <Text
              fontSize="md"
              textAlign="center"
              mb="4"
              color={colors.HITAM_PUDAR}
              fontWeight="normal"
            >
              Jadwal temu dokter
            </Text>

            <Box w={"full"}>
              <Table>
                <Tbody>
                  <Tr>
                    <Td>
                      <Text align={"start"}>No rekam medis</Text>
                    </Td>
                    <Td>
                      <Text align={"end"}>{StateBooking.patient ? StateBooking.patient.nomorRekamMedis : "-"}</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text align={"start"}>Nama pasien</Text>
                    </Td>
                    <Td>
                      <Text align={"end"}>{StateBooking.patient ? StateBooking.patient.nama : "-"}</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text align={"start"}>Layanan</Text>
                    </Td>
                    <Td>
                      <Text align={"end"}>{StateBooking.namaLayanan}</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text align={"start"}>Tanggal</Text>
                    </Td>
                    <Td>
                      <Text align={"end"}>{moment(date).format('DD/MM/YYYY')}</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text align={"start"}>Jam</Text>
                    </Td>
                    <Td>
                      <Text align={"end"}>{StateBooking.jamBerobat}</Text>
                    </Td>
                  </Tr>
                  <Tr style={{
                    background: colors.PRIMARY,
                    color: 'white',
                    borderRadius: 5
                  }}>
                    <Td
                      style={{
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5
                      }}
                    >
                      <Text align={"start"}>Biaya Pemeriksaan</Text>
                    </Td>
                    <Td
                      style={{
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5
                      }}
                    >
                      <Text align={"end"}>Rp. {currencyFormat(StateBooking.hargaLayanan)}</Text>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
              <Flex
                w="full"
                color="red.500"
                fontWeight="normal"
                h="30px"
                fontSize="xs"
                alignItems="center"
                justifyContent="start"
                mb="8"
              >
                <Image src="/icon/alert_error.svg" alt="" h="20px" />
                &nbsp;&nbsp;
                <Text>Biaya yang tercantum belum termasuk biaya tindakan dan obat</Text>
              </Flex>
            </Box>

            <Box mt={4} mb={2}>
              <Center>
                <Flex>
                  <Image src="/icon/home.svg" alt="" h="20px" />
                </Flex>
              </Center>
              <Center>
                <TextExtraSmall>Alamat klinik</TextExtraSmall>
              </Center>
            </Box>
            <Box mb="4" maxW="xl" mx="auto">
              <Center>
                <TextSubTitle fontSize={"xs"} align={"center"}>
                  Jl. Jendral Besar A.H. Nasution No.74-A, Pangkalan Masyur,
                  Kec. Medan Johor, Kota Medan, Sumatera Utara. 20143
                </TextSubTitle>
              </Center>
            </Box>

            <Flex
              bg="#FFF6DC"
              rounded="5px"
              border={`1px solid #FF9C00`}
              w="full"
              color="#FF9C00"
              fontWeight="normal"
              h="50px"
              fontSize="xs"
              alignItems="center"
              justifyContent="center"
              mb="8"
            >
              <Image src="/icon/alert_warning.svg" alt="" h="20px" />
              &nbsp;&nbsp;
              <Text>Harap datang 30 menit sebelum jadwal</Text>
            </Flex>
          </div>
        </Box>
      </div>
    );
  }

  const renderView = () => {
    if (isHomeCare) {
      return homeCareService();
    } else {
      return clinicService();
    }
  }
  return (
    <div>
      {bookingData ? renderView() : <Progress />}
    </div>
  )
}

export default BuktiPesanan;
