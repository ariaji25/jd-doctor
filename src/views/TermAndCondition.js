import { Box, Center, UnorderedList, ListItem } from '@chakra-ui/react';
import Content from 'components/Content';
import Footer from 'components/Footer';
import HeaderClean from 'components/HeaderClean';
import PageContainer from 'components/PageContainer';
import React from 'react';
import LogoWithText from 'components/LogoWithText';
import TextTitleHitam from 'components/text/TextTitleHitam';

const TermAndConditionPage = () => {
  return (
    <>
      <PageContainer bg="unset">
        <HeaderClean withBackButton withoutLogo />
        <Content>
          <Box maxW="xl" mx="auto">
            <Center mb="8">
              <LogoWithText h="56px" />
            </Center>
            <TextTitleHitam mt="12" mb="2" textAlign="center" color="#000000">
              Syarat dan Ketentuan
            </TextTitleHitam>
            <Center mt="6" >
              <UnorderedList >
                <ListItem>Pelayanan meliputi Konsultasi Dokter Umum.</ListItem>
                <ListItem>Pemeriksaan yang dilakukan oleh Dokter Umum di rumah atau kediaman pasien (homecare).</ListItem>
                <ListItem>Janji Kunjungan untuk pelayanan home care hanya berlaku untuk 1 Pasien dengan satu kali (1x) kunjungan. </ListItem>
                <ListItem>Pelayanan hanya diberikan untuk wilayah Kota Medan yang memenuhi kriteria.</ListItem>
                <ListItem>Pelayanan sebagaimana dimaksud akan dilakukan tepat pada jadwal dan waktu sesuai dengan yang terjadwal pada Janji Kunjungan.</ListItem>
                <ListItem>Pelayanan yang diberikan bukan termasuk Pelayanan Darurat.</ListItem>
                <ListItem>Harga obat tidak termasuk dalam pelayanan home care yang diberikan.</ListItem>
                <ListItem>Pasien dapat melakukan konsultasi umum dan pemeriksaan fisik tubuh secara general untuk penanganan awal.</ListItem>
                <ListItem>Dokter akan memberikan resep atau rencana pengobatan lain setelah dilakukan pemeriksaan.</ListItem>
                <ListItem>Waktu pemesanan layanan home care dilaksanakan paling lambat satu hari sebelum hari kunjungan (H-1).</ListItem>
              </UnorderedList>
            </Center>
          </Box>
        </Content>
        <Footer />
      </PageContainer>
    </>
  );
};

export default TermAndConditionPage;
