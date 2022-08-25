import { Box, Center, ListItem, OrderedList, Text } from '@chakra-ui/react';
import Content from 'components/Content';
import Footer from 'components/Footer';
import HeaderClean from 'components/HeaderClean';
import LogoWithText from 'components/LogoWithText';
import PageContainer from 'components/PageContainer';
import TextTitle from 'components/text/TextTitle';
import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <>
      <PageContainer bg="unset">
        <HeaderClean withBackButton withoutLogo />
        <Content>
          <Box maxW="xl" mx="auto">
            <Center mb="8">
              <LogoWithText h="56px" />
            </Center>
            <TextTitle mt="12" mb="2">
              Kebijakan Privasi JumpaDokter
            </TextTitle>
            <Text mb={2} align="justify">
              Kebijakan privasi ini (“Kebijakan Privasi”) akan menjelaskan bagaimana PT Castellum Digital Indonesia dan setiap perusahaan afiliasinya (“Kami”), memperoleh, mengumpulkan, menggunakan, menampilkan, mengumumkan, mengungkapkan, memproses, membukakan akses, menyimpan, mengirim, memberi, mengalihkan, mengolah, mengelola, memusnahkan dan melindungi informasi dan data pribadi (secara bersama-sama, “Pemanfaatan”) yang anda sebagai pengguna (“Anda”) Platform (sebagaimana didefinisikan di bawah) berikan sebagaimana diminta maupun pada saat menggunakan Platform (“Data Pribadi”). Perlu dicatat bahwa Data Pribadi di sini tidak termasuk Data Pribadi yang telah tersedia di domain publik.
            </Text>
            <Text mb={2} align="justify">
              Kebijakan Privasi ini merupakan bagian dari Syarat dan Ketentuan JumpaDokter. Penggunaan Platform dan setiap fitur dan/atau layanan yang tersedia dalam Platform (“Layanan”) merupakan bentuk persetujuan anda terhadap Ketentuan Penggunaan dan Kebijakan Privasi tersebut.
            </Text>
            <Text mb={2} align="justify">
              Oleh karena itu, Anda perlu untuk membaca Kebijakan Privasi ini dengan saksama untuk memastikan bahwa Anda memahaminya sepenuhnya sebelum mendaftar, mengakses dan/atau menggunakan Platform dan Layanan Kami.
            </Text>
            <OrderedList>
              <ListItem fontWeight="bold" mt={2} mb={2}>Ruang Lingkup Kebijakan Privasi</ListItem>
              <OrderedList styleType="lower-alpha" textAlign="justify">
                <ListItem>Secara khusus namun tidak terbatas terhadap layanan dikelola oleh Kami, PT Castellum Digital Indonesia yang terkoneksi dengan pihak ketiga.</ListItem>
                <ListItem>Kebijakan Privasi ini mengatur Pemanfaatan Data Pribadi penggunaan Aplikasi JumpaDokter.</ListItem>
                <ListItem>Dengan menggunakan Platform Aplikasi JumpaDokter, maka Anda dianggap telah membaca Kebijakan Privasi ini dan menyetujui mekanisme Pemanfaatan Data Pribadi Anda sebagaimana diatur dalam Kebijakan Privasi ini.</ListItem>
                <ListItem>Apabila Kami meminta Anda untuk memberikan informasi ketika menggunakan Platform Aplikasi JumpaDokter, maka informasi tersebut hanya akan digunakan untuk keperluan pemberian Layanan sesuai dengan Kebijakan Privasi ini.</ListItem>
                <ListItem>Kami dapat mengubah, menghapus dan untuk menerapkan ketentuan baru dalam Kebijakan Privasi ini. Anda diharapkan untuk memeriksa halaman Kebijakan Privasi Platform Aplikasi JumpaDokter  secara berkala untuk mengetahui perubahan tersebut.</ListItem>
                <ListItem>Dengan menggunakan Aplikasi Platform JumpaDokter setelah terjadinya perubahan tersebut, Anda dianggap telah mengetahui dan menyetujui perubahan-perubahan ketentuan pada Kebijakan Privasi ini.</ListItem>
              </OrderedList>
              <ListItem fontWeight="bold" mt={2} mb={2}>Registrasi</ListItem>
              <OrderedList styleType="lower-alpha" textAlign="justify">
                <ListItem>Anda diharuskan melakukan pendaftaran dalam Platform Aplikasi JumpaDokter untuk dapat menggunakan fitur – fitur didalamnya.</ListItem>
                <ListItem>Untuk melakukan pendaftaran Platform Aplikasi JumpaDokter, Anda harus memberikan informasi yang Kami perlukan sebagaimana tercantum pada Pasal 3 – Data Pribadi.</ListItem>
              </OrderedList>
              <ListItem fontWeight="bold" mt={2} mb={2}>Data pribadi</ListItem>
              <OrderedList styleType="lower-alpha" textAlign="justify">
                <ListItem>Anda mengetahui dan menyetujui bahwa Kami mengumpulkan informasi pribadi yang diberikan saat membuat akun, profil, maupun pada saat menggunakan fitur-fitur yang terdapat dalam Platform Aplikasi JumpaDokter.</ListItem>
                <ListItem>Informasi mengenai identitas diri yang wajib diisi oleh Anda saat membuat akun di Platform antara lain adalah:</ListItem>
                <OrderedList styleType="lower-roman" textAlign="justify">
                  <ListItem>Nama lengkap sesuai kartu identitas yang berlaku (KTP atau Paspor); dan</ListItem>
                  <ListItem>Nomor telepon genggam yang terhubung ke Whatsapp.</ListItem>
                </OrderedList>
                <ListItem>Anda dapat mengaktifkan atau menonaktifkan layanan pengenalan lokasi saat Anda menggunakan Platform Aplikasi JumpaDokter.</ListItem>
                <ListItem>Apabila diperlukan, Kami dapat melakukan verifikasi langsung kepada Anda tentang data diri yang telah diisi pada Platform Aplikasi JumpaDokter.</ListItem>
                <ListItem>Informasi yang Anda berikan adalah akurat dan benar.</ListItem>
              </OrderedList>
              <ListItem fontWeight="bold" mt={2} mb={2}>Layanan Rapid Diagnostic Test Antigen (RDT-Ag)</ListItem>
              <OrderedList styleType="lower-alpha" textAlign="justify">
                <ListItem>Informasi yang Anda berikan untuk Layanan Rapid Diagnostic Test Antigen (RDT-Ag) akan Kami gunakan untuk proses pendaftaran dan pemesanan tes.</ListItem>
                <ListItem>Anda dapat memesankan Layanan Rapid Diagnostic Test Antigen (RDT-Ag) untuk orang lain. Pemesanan untuk pasien lain (bukan diri sendiri) dianggap sudah memiliki izin dari orang/pasien yang bersangkutan dan PT. Castellum Digital Indonesia atau Pihak JumpaDokter tidak terikat dalam penyalahgunaan data pihak lain dalam kasus dan/atau kondisi tersebut.</ListItem>
              </OrderedList>
              <ListItem fontWeight="bold" mt={2} mb={2}>Data Pengunjung</ListItem>
              <Text align={"justify"}>Anda mengetahui dan menyetujui bahwa Platform Aplikasi JumpaDokter akan mengumpulkan informasi tentang penggunaan fitur dan layanan, seperti (namun tidak terbatas pada) jumlah kunjungan, sumber pengunjung dan aktivitas pengunjung. Data ini kami kumpulkan dan kami gunakan dengan tujuan meningkatkan kepuasan Anda serta layanan Kami.</Text>
              <OrderedList styleType="lower-alpha" textAlign="justify">
                <ListItem>Kami dan Penyedia Layanan dapat melakukan Pemanfaatan Data Pribadi Anda untuk kegiatan bisnis dan operasional sesuai dengan tujuan diberikannya Data Pribadi tersebut, termasuk untuk:</ListItem>
                <OrderedList styleType="lower-roman" textAlign="justify">
                  <ListItem>Menyediakan informasi kepada Anda dan Penyedia Layanan sesuai permintaan Anda berkaitan dengan Layanan Kami.</ListItem>
                  <ListItem>Menyediakan pembuatan resep dan/atau obat-obatan sesuai permintaan Anda berkaitan dengan layanan Kami pada layanan Homecare.</ListItem>
                  <ListItem>Mengembangkan, meningkatkan dan menyediakan produk dan layanan yang sesuai dengan kebutuhan Anda.</ListItem>
                  <ListItem>Menanggapi pertanyaan, komentar dan masukan Anda.</ListItem>
                  <ListItem>Memberikan informasi/mengirimkan e-mail dan/atau SMS berisi promosi secara berkala kepada Anda bila terdapat suatu penawaran dan/atau promosi atas produk-produk baru, penawaran khusus, atau informasi lain yang menurut Kami diperlukan oleh Anda.</ListItem>
                  <ListItem>Menggunakan dan mengungkapkan informasi ini jika diperlukan bagi tinjauan medis, jasa hukum, dan audit, meliputi penipuan dan deteksi penyalahgunaan dan program penyesuaian, serta perencanaan dan manajemen bisnis.</ListItem>
                </OrderedList>
                <ListItem>Kami menjamin bahwa data dan informasi yang diberikan Anda bersifat rahasia dan tidak akan disebarluaskan kecuali untuk hal-hal yang telah dicantumkan dan Anda setujui dalam Kebijakan Privasi ini. Untuk mencegah akses tidak sah, Kami melakukan tindakan pengamanan fisik, elektronik, dan prosedur manajerial untuk melindungi informasi Anda.</ListItem>
                <ListItem>Informasi kesehatan Anda hanya akan digunakan sehubungan dengan pelayanan Platform dan hal-hal yang telah dicantumkan dan Anda setujui dalam Kebijakan Privasi ini dan Kami hanya akan mengumpulkan informasi yang dibutuhkan untuk menjalankan pelayanan dalam Platform.</ListItem>
              </OrderedList>
              <ListItem fontWeight="bold" mt={2} mb={2}>Koneksi Anda Ke Platform Lain</ListItem>
              <Text align={"justify"}>Platform dapat memuat tautan menuju platform milik pihak ketiga (“Platform Pihak Ketiga”) dan konten pihak ketiga (“Konten Pihak Ketiga”). Untuk keamanan Anda, Anda perlu mempelajari dan membaca dengan hati-hati kebijakan penanganan informasi pribadi yang berlaku di Platform Pihak Ketiga dan/atau Konten Pihak Ketiga.</Text>
              <ListItem fontWeight="bold" mt={2} mb={2}>Hukum Yang Berlaku</ListItem>
              <Text align={"justify"}>Kebijakan Privasi ini diatur berdasarkan hukum Negara Republik Indonesia dan Anda diwajibkan tunduk kepada semua peraturan yang berlaku di Republik Indonesia.</Text>
              <ListItem fontWeight="bold" mt={2} mb={2}>Upaya Pengamanan</ListItem>
              <OrderedList styleType="lower-alpha" textAlign="justify">
                <ListItem>Kami akan berupaya memastikan bahwa informasi yang Anda berikan kepada Kami aman dan tidak dapat digunakan oleh pihak-pihak yang tidak bertanggung jawab. Untuk keamanan data Anda, Kami sangat menyarankan agar Anda selalu memperbarui Platform dan perangkat lunak anda serta tidak mengungkapkan kata sandi anda kepada pihak manapun.</ListItem>
                <ListItem>Anda dengan ini setuju bahwa Kami dapat menyimpan Data Pribadi pada server yang terletak di pusat data yang ditunjuk oleh Kami. Pemanfaatan Data Pribadi sehubungan dengan penggunaan Platform akan terus diatur oleh Kebijakan Privasi ini sesuai dengan peraturan perundangan-undangan yang berlaku di Republik Indonesia.</ListItem>
              </OrderedList>
              <ListItem fontWeight="bold" mt={2} mb={2}>Hubungi Kami</ListItem>
              <Text mb={2} align={"justify"}>Hukum privasi Indonesia memberikan individu hak untuk mengakses, mengubah, dan menghapus informasi pribadi mereka. Jika Anda   ingin mengubah atau menghapus informasi yang kami simpan mengenai Anda, silakan hubungi kami di bawah ini.</Text>
              <Text mb={2} align={"justify"}>Kami akan menginformasikan kepada Anda secara tertulis apabila terdapat kegagalan untuk melindungi kerahasiaan informasi pribadi Anda dalam sistem elektronik kami, sesuai yang diwajibkan oleh hukum yang berlaku.</Text>
              <Text mb={2} align={"justify"}>Jika Anda memiliki pertanyaan apapun mengenai Kebijakan Privasi ini, silakan kirimkan email kepada kami di  infodokter@jumpadokter.com atau call center Kami di  +62811-6562-201.</Text>
            </OrderedList>
          </Box>
        </Content>
        <Footer />
      </PageContainer>
    </>
  );
};

export default PrivacyPolicyPage;
