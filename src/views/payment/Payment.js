import { Box, Center } from "@chakra-ui/react";
import ButtonMain from "components/button/ButtonMain";
import Content from "components/Content";
import Footer from "components/Footer";
import HeaderClean from "components/HeaderClean";
import PageContainer from "components/PageContainer";
import { useState } from "react";
import apiPayment from "services/apiPayment";
import stateBooking from "states/stateBooking";
import { useSnapshot } from "valtio";


const PaymentPage = () => {
  const StateBooking = useSnapshot(stateBooking)

  const [status, setStatus] =  useState(null);

  const getStatus = async () => {
    const data = await apiPayment.getPaymentStatus(StateBooking.bookingId)
    if (data){
      console.log("Status", data)
    }
  } 
  return (
    <div>
      <PageContainer bg="unset">
        <HeaderClean withBackButton withoutLogo />
        <Content>
          <Center>
            <Box w="full">
              <Box>
                <embed title="Payment URL" src={StateBooking.paymentUrl} />
              </Box>
              <ButtonMain
                w="full"
                mb="2"
                onClick={(e) => {
                  // window.browserHistory.push("/services/payment-method")
                  getStatus()
                }}
              >
                Check Status Pembayaran
              </ButtonMain>
            </Box>

          </Center>
        </Content>
        <Footer />
      </PageContainer>
    </div>
  );
}

export default PaymentPage