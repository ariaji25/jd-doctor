import { Box, Image } from '@chakra-ui/react';
import Content from "components/Content";
import Footer from "components/Footer";
import Header from "components/Header";
import ArtikelKesehatan from "components/home/ArtikelKesehatan";
import DaftarDokter from 'components/home/DaftarDokter';
import LayananKami from "components/home/LayananKami";
import MotoTeks from "components/home/MotoTeks";
import Promo from "components/home/Promo";
import PageContainer from "components/PageContainer";
import React, { Component } from "react";

class LandingPage extends Component {
  render() {
    return (
      <PageContainer>
        <Header />
        <Content>
          <MotoTeks />
          {/* <Alamat /> */}
          <br />
          <LayananKami />
          <Image src="/img/banner.svg" alt="" mb='12' w='full' maxW="full" />
          <DaftarDokter />
          <Promo />
          <ArtikelKesehatan />
          {/* <Center
            mx="auto"
            maxW="full">
            <Flex
              justifyContent="center"
              w='full'>
              <Box
                mr={{ base: '0', xl: '8' }}
                w={[300, 600, 900]}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63715.14170386361!2d98.63306797910155!3d3.5421233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30313140f5a5f66f%3A0xffea290d93ac785!2sPraktik%20Dokter%20Umum%20JumpaDokter!5e0!3m2!1sen!2sid!4v1646837818451!5m2!1sen!2sid"
                  width="100%"
                  height={432}
                  title="Praktek Dokter Umum JumpaDokter"
                />
              </Box>
              <Box
                mb="2"
                display={{ base: 'none', xl: 'inline-block' }}>
                <Image src='/img/logo_with_text_down.svg' alt="" mb="4" />
                <Image src='/img/social_maps.svg' alt="" mb="4" w="160px" />
                <Flex justifyContent='start' wrap='wrap'>
                  <Image alt="" src="/icon/map-pin.svg" mb='4' w={['32px', '48px']} />
                  <Box w="sm" ml='2'>
                    <TextMedium fontWeight='bold'>Alamat praktek dokter umum</TextMedium>
                    <TextSmall
                      mt='2'
                      color={colors.PRIMARY}>
                      Jl. Jenderal Besar A.H. Nasution No.74-A, Pangkalan Masyhur, Kec Medan Johor, Kota Medan, Sumatera Utara. 20143
                    </TextSmall>
                    <Text color={colors.PRIMARY}></Text>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Center> */}
          <Box h="2" />
        </Content>
        <Footer />
      </PageContainer>
    );
  }
}

export default LandingPage;
