import { Box, Button, Center, Flex, Text } from "@chakra-ui/react"
import ButtonMain from "components/button/ButtonMain"
import TextTitleHitam from "components/text/TextTitleHitam"
import ToastNotif from "components/Toast"
import moment from "moment"
import { useCallback, useEffect, useState } from "react"
import apiPayment from "services/apiPayment"
import stateBooking from "states/stateBooking"
import { currencyFormat } from "utils"
import { useSnapshot } from "valtio"
import colors from "values/colors"

const { default: Content } = require("components/Content")
const { default: Footer } = require("components/Footer")
const { default: HeaderClean } = require("components/HeaderClean")
const { default: PageContainer } = require("components/PageContainer")

const PaymentMethodPage = (contentRef) => {
  const [paymentMethods, setPaymentMethods] = useState(null)

  const StateBooking = useSnapshot(stateBooking);

  const [selectedMethod, setSelectedMethod] = useState('');

  const [paymentStatus, setPaymentStatus] = useState(null);

  const getPaymentStatus = async () => {
    const data = await apiPayment.getPaymentStatus(StateBooking.bookingId);
    if (data.data) {
      setPaymentStatus(data.data)
      if (data.data.payment_status_code === "2") {
        window.browserHistory.push("/payment-success")
      } else {
        ToastNotif({
          message: 'Pembayaran menunggu proses!',
          type: 'error'
        });
      }
    }
  }

  const getPaymentMethod = async () => {
    const data = await apiPayment.getPaymentMethod()
    if (data.data) {
      console.log("Methods/Channels", data.data);
      setPaymentMethods(data.data)
    }
  }

  const init = useCallback(() => {
    console.log("Contentref", StateBooking)
    getPaymentMethod()
  }, [StateBooking.hargaLayanan]);

  const requestPayment = () => {
    console.log("BookingId", StateBooking.bookingId)
    console.log("ServiceId", StateBooking.layananId)
    console.log("serviceName", StateBooking.namaLayanan)
    console.log("harga", StateBooking.hargaLayanan)
    console.log("Method", selectedMethod)
    console.log("patient", StateBooking.patient.id)
    console.log("name", StateBooking.patient.nama)
    console.log("date", moment(moment.now()).format('YYYY-MM-DD HH:MM:SS'))

    apiPayment.generatePayment(StateBooking.bookingId,
      StateBooking.layananId, StateBooking.namaLayanan,
      currencyFormat(StateBooking.hargaLayanan).replace(",", "").replace(".", ""), selectedMethod,
      StateBooking.patient.id, StateBooking.patient.nama,
      moment(moment.now()).format('YYYY-MM-DD HH:MM:SS')).then((res) => {
        ToastNotif({
          message: 'Berhasil request pembayaran!',
          type: 'success'
        });
        console.log("Response", res);
        window.open(res.data.payment_url)
        setPaymentStatus({})
        stateBooking.paymentUrl = res.data.payment_url;
      }).catch((err) => {
        ToastNotif({
          message: 'Gagal request pembayaran!',
          type: 'error'
        });
      })
  }


  useEffect(() => {
    init();
  }, [init]);

  return (
    <div>
      <PageContainer bg="unset">
        <HeaderClean withBackButton withoutLogo />
        <Content>
          <Center>
            <Box w="md">
              <TextTitleHitam textAlign="center">Metode Pembayaran</TextTitleHitam>
              <Text
                fontSize="md"
                textAlign="center"
                mb="4"
                color={colors.HITAM_PUDAR}
                fontWeight="normal"
              >
                Pilih metode pembayaran anda dengan mudah
              </Text>
              <Box mb="5">
                <hr />
              </Box>
              {/* Virtual account */}
              {/* <Text
                fontSize="12"
                textAlign="left"
                mb="4"
                color={colors.HITAM_PUDAR}
                fontWeight="normal"
              >
                Virtual account
              </Text> */}
              {paymentMethods ? paymentMethods.map((e) => <Button
                key={e.pg_code}
                bg="white"
                rounded="5px"
                border={`1px solid ${selectedMethod === e.pg_code ? colors.PRIMARY : colors.GRAY_BORDER_2}`}
                w="full"
                color={colors.PRIMARY}
                fontWeight="normal"
                h="75px"
                mb="4"
                onClick={(a) => {
                  setSelectedMethod(e.pg_code)
                }}
              >
                <Flex alignItems="center">
                  <Text>{e.pg_name}</Text>
                </Flex>
              </Button>) : <></>}
              <Box mb="5">
                <hr />
              </Box>
              <Text
                fontSize="md"
                textAlign="left"
                mb="4"
                color={colors.HITAM_PUDAR}
                fontWeight="normal"
              >
                Total yang harus dibayar
              </Text>
              <Text
                fontSize="md"
                textAlign="left"
                mb="4"
                color={colors.PRIMARY}
                fontWeight="bold"
              >
                Rp. {currencyFormat(StateBooking.hargaLayanan)}
              </Text>
              <Box mb="5">
                <hr />
              </Box>
              {paymentStatus ? <></> : <ButtonMain
                w="full"
                mb="2"
                onClick={(e) => {
                  requestPayment();
                }}
              >
                Bayar
              </ButtonMain>}
              {paymentStatus ? <ButtonMain
                w="full"
                mb="2"
                onClick={(e) => {
                  getPaymentStatus();
                }}
              >
                Check Status Pembayaran
              </ButtonMain> : <></>}
            </Box>
          </Center>
        </Content>
      </PageContainer>
      <Footer />
    </div >
  )
}

export default PaymentMethodPage;