import { Box, Center, Flex, HStack, Image, Link, Text, VStack } from '@chakra-ui/react';
import Content from "components/Content";
import Footer from "components/Footer";
import Header from "components/Header";
import LayananKami from 'components/home/LayananKami';
import PageContainer from "components/PageContainer";
import React, { Component } from "react";
import colors from 'values/colors';

const HightLight = ({ children }) => {
  return (
    <>
      {' '}<span style={{ fontWeight: 700 }}>{children}</span>{' '}
    </>
  );
};

class AboutPage extends Component {
  render() {
    return (
      <PageContainer>
        <Header />
        <Content>
          <Box style={{ marginLeft: 212, marginRight: 124 }}>
            <HStack>
              <Image
                src="/img/article_il.svg"
                title="article_ilustration"
                alt=""
              />
              <VStack alignItems={"start"}>
                <Box
                  style={{ marginLeft: 157 }}
                >
                  <Text
                    fontWeight={400}
                    fontSize={24}
                  >
                    Tentang{' '}
                    <span
                      style={{
                        fontSize: 36,
                        fontWeight: 700
                      }}
                    >
                      JumpaDokter
                    </span>
                  </Text>

                  <Text
                    fontWeight={400}
                    fontSize={16}
                  >
                    Praktek Umum <HightLight>JumpaDokter</HightLight>
                    didirikan pada bulan Januari 2022, dengan
                    konsep sebagai klinik umum untuk melayani masyarakat terutama di area
                    Kota Medan dan sekitarnya.
                  </Text>

                  <Text
                    fontWeight={400}
                    fontSize={16}
                    style={{ marginTop: 38 }}
                  >
                    Sejalan dengan meningkatnya kebutuhan dan
                    permintaan pasien, maka Praktek Umum
                    <HightLight>JumpaDokter</HightLight>
                    meluaskan jangkauan
                    pelayanan kesehatan untuk memberikan pelayanan kesehatan dari rumah.
                  </Text>

                </Box>

                <Image
                  src="/img/line-arrow.svg"
                  title="about_line"
                  alt=""
                />
              </VStack>
            </HStack>
          </Box>

          <Box
            style={{ marginLeft: 212, marginRight: 155 }}
          >
            <HStack
              alignItems={"start"}
            >
              <Text
                fontWeight={400}
                fontSize={16}
              >
                Pasien bisa melakukan pemesanan untuk jadwal bertemu dokter melalui
                <HightLight>Whatsapp</HightLight> resmi <HightLight>JumpaDokter</HightLight>.
                Pasien juga dapat memilih jenis layanan
                kesehatan dan mendapatkan layanan dari <HightLight>rumah</HightLight> atau langsung berkunjung
                ke lokasi <HightLight>klinik</HightLight>.
              </Text>

              <Image
                src="/img/about_il.svg"
                title="about_line"
                alt=""
              />
            </HStack>
          </Box>

          <Box
            style={{ marginLeft: 200 }}
          >
            <Text
              fontWeight={400}
              fontSize={24}
            >
              Layanan{' '}
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 700
                }}
              >
                JumpaDokter
              </span>
            </Text>
            <Center>
              <LayananKami withHeader={false} />
            </Center>
          </Box>

          <Box
            style={{ marginLeft: 200 }}
            color={colors.PRIMARY}
          >
            <Text
              fontWeight={400}
              fontSize={24}
              w="525px"
            >
              Cara membuat janji temu dengen dokter di{' '}
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 700
                }}
              >
                JumpaDokter 🌟
              </span>
            </Text>
            <Flex
              mt="4"
              align="center"
              flexDir="column">
              <Box
                border="2px dashed #1E3869"
                p="4"
                borderRadius="8"
                w={[250, 500]}>
                <Text
                  fontWeight="bold">
                  <Flex wrap="wrap">
                    Melalui Whatsapp <Image src='icon/logo_wa.svg' mr="2" ml="2" /> resmi JumpaDokter
                  </Flex>
                </Text>
              </Box>
              <Box
                mt="8"
                borderRadius="50%"
                w="50px"
                h="50px"
                background="rgba(86, 183, 205, 0.3)"
                color="black"
                lineHeight="50px"
                fontWeight="extrabold"
                position="relative"
              >
                <Box
                  borderRadius="50%"
                  w="30px"
                  h="30px"
                  background={colors.PRIMARY}
                  fontWeight="extrabold"
                  position="absolute"
                  top="50%"
                  left="50%"
                  margin="-15px 0px 0px -15px"
                  lineHeight="30px"
                >
                  <Text
                    color="white"
                    fontWeight="extrabold"
                    textAlign="center">
                    1
                  </Text>
                </Box>
              </Box>
              <Text
                textAlign="center"
                mx="auto"
                mt="8">
                Kunjungi link <Link href='https://jumpadokter.com' fontWeight="bold">https://jumpadokter.com</Link>
              </Text>
              <Image src='/img/capture1.png' mt="8" />
              <Box
                mt="8"
                borderRadius="50%"
                w="50px"
                h="50px"
                background="rgba(86, 183, 205, 0.3)"
                color="black"
                lineHeight="50px"
                fontWeight="extrabold"
                position="relative"
              >
                <Box
                  borderRadius="50%"
                  w="30px"
                  h="30px"
                  background={colors.PRIMARY}
                  fontWeight="extrabold"
                  position="absolute"
                  top="50%"
                  left="50%"
                  margin="-15px 0px 0px -15px"
                  lineHeight="30px"
                >
                  <Text
                    color="white"
                    fontWeight="extrabold"
                    textAlign="center">
                    2
                  </Text>
                </Box>
              </Box>
              <Text
                textAlign="center"
                w="lg"
                mx="auto"
                mt="8">
                Pada halaman utama silahkan klik tombol <strong>“BUAT JANJI DOKTER”</strong>  selanjutnya akan diarahkan menuju halaman <strong>Whatsapp</strong>
              </Text>
              <Image src='/img/capture2.png' mt="4" />
              <Box
                mt="4"
                borderRadius="50%"
                w="50px"
                h="50px"
                background="rgba(86, 183, 205, 0.3)"
                color="black"
                lineHeight="50px"
                fontWeight="extrabold"
                position="relative"
              >
                <Box
                  borderRadius="50%"
                  w="30px"
                  h="30px"
                  background={colors.PRIMARY}
                  fontWeight="extrabold"
                  position="absolute"
                  top="50%"
                  left="50%"
                  margin="-15px 0px 0px -15px"
                  lineHeight="30px"
                >
                  <Text
                    color="white"
                    fontWeight="extrabold"
                    textAlign="center">
                    3
                  </Text>
                </Box>
              </Box>
              <Text
                textAlign="center"
                w="lg"
                mx="auto"
                mt="8">
                Pada aplikasi <strong>Whatsapp</strong> silahkan isikan data diri pasien dan detail layanan yang ingin anda pesan sesuai format lalu kirim.
              </Text>
              <Image src='/img/capture3.png' mt="8" mb="24" />
            </Flex>
          </Box>

          {/* <Box
            style={{ marginLeft: 200 }}
            color={colors.PRIMARY}>
            <Flex flexDir="column" align="center">
              <Text
                fontWeight={400}
                fontSize={24}
                w="525px"
                textAlign="center"
              >
                Hubungi{' '}
                <span
                  style={{
                    fontSize: 36,
                    fontWeight: 700
                  }}
                >
                  JumpaDokter
                </span>
              </Text>
              <Image src='img/logo_with_text_down.svg' mt="4" />
              <Flex wrap="wrap" justifyContent="space-evenly" w={[600]} mt="8">
                <Box
                  border="2px dashed #1E3869"
                  p="2"
                  borderRadius="8">
                  <Text
                    fontWeight="bold">
                    <Flex>
                      <Image src='icon/logo_wa_outline.svg' mr="2" />
                      <Center>0811 {" "} 6562 {" "} 201</Center>
                    </Flex>
                  </Text>
                </Box>
                <Box
                  border="2px dashed #1E3869"
                  p="2"
                  borderRadius="8">
                  <Text
                    fontWeight="bold">
                    <Flex>
                      <Image src='icon/logo_ig.svg' mr="2" />
                      <Center>@jumpadokter</Center>
                    </Flex>
                  </Text>
                </Box>
                <Box
                  border="2px dashed #1E3869"
                  p="2"
                  borderRadius="8">
                  <Text
                    fontWeight="bold">
                    <Flex>
                      <Image src='icon/globe.svg' mr="2" />
                      <Center>jumpadokter.com</Center>
                    </Flex>
                  </Text>
                </Box>
              </Flex>
              <Flex justifyContent='center' wrap='wrap' w={[600]} mt="8">
                <Image alt="" src="/icon/map-pin.svg" mb='4' w={['32px', '48px']} />
                <Box w="lg" ml='2'>
                  <TextMedium fontWeight='bold'>Alamat praktek dokter umum</TextMedium>
                  <TextSmall
                    mt='2'
                    color={colors.PRIMARY}>
                    Jl. Jenderal Besar A.H. Nasution No.74-A, Pangkalan Masyhur, Kec Medan Johor, Kota Medan, Sumatera Utara. 20143
                  </TextSmall>
                  <Text color={colors.PRIMARY}></Text>
                </Box>
              </Flex>
              <Box
                mt="8"
                mr={{ base: '0', md: '8' }}
                w={[300, 600]}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63715.14170386361!2d98.63306797910155!3d3.5421233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30313140f5a5f66f%3A0xffea290d93ac785!2sPraktik%20Dokter%20Umum%20JumpaDokter!5e0!3m2!1sen!2sid!4v1646837818451!5m2!1sen!2sid"
                  width="100%"
                  height={432}
                  title="Praktek Dokter Umum JumpaDokter"
                />
              </Box>
            </Flex>
          </Box> */}
          <Box h="2" />
        </Content>
        <Footer />
      </PageContainer>
    );
  }
}

export default AboutPage;
