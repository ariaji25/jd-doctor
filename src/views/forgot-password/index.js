import {
  Box,
  Button, Flex, ListItem,
  OrderedList,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import ButtonMain from 'components/button/ButtonMain';
import InputOTP from 'components/button/login/InputOTP';
import Carousel from 'components/Carousel';
import Content from 'components/Content';
import HeaderClean from 'components/HeaderClean';
import InputNoHP from 'components/input/InputNoHP';
import InputUnderlined from 'components/input/InputUnderlined';
import PageContainer from 'components/PageContainer';
import SideModal from 'components/SideModal';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiOtp from 'services/apiOtp';
import stateLogin from 'states/stateLogin';
import { useSnapshot } from 'valtio';
import colors from 'values/colors';

const ForgotPasswordForm = ({ onClikWaHelp }) => {
  const { email, processing } = useSnapshot(stateLogin);
  const [showPassword, setShowPassword] = useState(false)

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const onChangeEmail = (email) => {
    stateLogin.email = email;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      stateLogin.processing = true;
      await apiOtp.request(stateLogin.nohp);
      stateLogin.showInputOtp = true;
    } catch (error) {
      console.error('❌ onSubmit:', e);
    } finally {
      stateLogin.processing = false;
    }
  };

  return (
    <>
      <Box w="full" color={colors.PRIMARY}>
        <form onSubmit={onSubmit}>
          <Box color='#505050'>
            <Text pb={4} fontSize="3xl" fontWeight="bold" >
              Jangan khawatir
            </Text>
            <Text pb={8}>
              Kami disini membantu untuk mengembalikan akun anda
              silahkan masukkan email yang anda gunakan untuk registrasi
              dan kami akan mengirimkan link untuk mengatur ulang kata sandi
            </Text>
          </Box>
          <Box>
            <InputUnderlined
              isRequired
              icon="/icon/mail.svg"
              label="Email"
              onChange={onChangeEmail}
              type="text"
              placeholder='mail@email.com'
              value={email}
            />
          </Box>
          <Box h="8" />
          <ButtonMain type="submit" disabled={processing} w="full">
            Kirim
          </ButtonMain>
          <Text
            my="6"
            fontSize={{ base: 'xs', md: 'unset' }}
            cursor="pointer"
            color='#505050'
            textAlign='center'
            onClick={e => {
              window.browserHistory.push("/");
            }}
          >
            Kembali
          </Text>
        </form>
      </Box>
    </>
  );
};

const ForgotPasswordPage = () => {
  const { showInputOtp } = useSnapshot(stateLogin);
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <PageContainer bg="unset">
        <HeaderClean />
        <Content>
          {!showInputOtp && (
            <Box
              px="4"
              maxW={{ base: 'md', lg: '5xl' }}
              mx="auto"
              display={{ lg: 'flex' }}
              alignItems="baseline"
              gap={{ lg: '200px' }}
            >
              <ForgotPasswordForm onClikWaHelp={onToggle} />

              <Carousel onPage={'forgot-password'} />
            </Box>
          )}
          {showInputOtp && (
            <Box px="4" maxW="5xl" mx="auto" alignItems="center">
              <InputOTP />
            </Box>
          )}
        </Content>
      </PageContainer>
      <SideModal
        title={'Kesulitan Login?'}
        isOpen={isOpen}
        onToogle={onToggle}>
        <Box mx="8" >
          <OrderedList mt={2}>
            <ListItem>Pastikan kamu memasukkan no HP yang benar.</ListItem>
            <ListItem>No hp yang dimasukkan harus sudah terdaftar ke “Whatsapp” karena kode OTP akan dikirimkan melalui Whatsapp.</ListItem>
            <ListItem>Jika masih mengalami kendala saat login cobalah menggunakan no HP (Whatsapp) yang lain.</ListItem>
            <ListItem>Dan pastikan kamu tidak memberitahukan kode OTP kepada siapapun yang mengatasnamakan JumpaDokter maupun pihak lain.</ListItem>
          </OrderedList>
        </Box>
      </SideModal>
    </>
  );
};

export default ForgotPasswordPage;
