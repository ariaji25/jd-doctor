import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import Content from "components/Content";
import Footer from "components/Footer";
import PageContainer from "components/PageContainer";
import React, { Component } from "react";

class PaymentSuccessPage extends Component {
  render() {
    return (
      <PageContainer isWhiteBg='true'>
        <Content>
          <Flex mt="4"
            align="center"
            flexDir="column"
            style={{ marginTop: '100px' }}>
            <Box>
              <Image src="/img/ic_jd_logo.png" alt="logo" />
            </Box>
            <Box>
              <Image src="/img/ic_payment_success.png" alt="logo" />
            </Box>
            <Box>
              <Text fontWeight="bold" mb="6" fontSize="24px" color="#56B7CD">
                Yeay! Pembayaran berhasil
              </Text>
            </Box>
            <Box>
              <Button borderRadius='15px' width='464px' background='#1E3869' color='white' onClick={(e)=>window.browserHistory.push("/")}>
                OK
              </Button>
            </Box>
          </Flex>

          <Box />
        </Content>
        <Footer />
      </PageContainer>
    );
  }
}

export default PaymentSuccessPage;
