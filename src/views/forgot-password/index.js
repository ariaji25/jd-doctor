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
import LogoWithText from 'components/LogoWithText';
import PageContainer from 'components/PageContainer';
import SideModal from 'components/SideModal';
import TextTitle from 'components/text/TextTitle';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiAuth from 'services/apiAuth';
import apiOtp from 'services/apiOtp';
import stateLogin from 'states/stateLogin';
import { isValidEmail } from 'utils';
import { useSnapshot } from 'valtio';
import colors from 'values/colors';

const ForgotPasswordForm = ({ onClikWaHelp }) => {
  const { email, processing } = useSnapshot(stateLogin);
  const [showPassword, setShowPassword] = useState(false)
  const [isValidEmailAddress, setIsValidEmailAddress] = useState(false)

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const onChangeEmail = (email) => {
    setIsValidEmailAddress(isValidEmail(email.target.value))
    stateLogin.email = email.target.value;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isValidEmailAddress) {
      try {
        stateLogin.processing = true;
        await apiAuth.requestResetPassword(stateLogin.email);
      } catch (error) {
      } finally {
        stateLogin.processing = false;
        stateLogin.successRequestRecoveryPassword = true;
      }
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
          {!isValidEmailAddress && email ? <Text color={colors.DANGER} fontSize={'11px'} >Alamat email tidak valid.</Text> : <></>}
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
              window.browserHistory.push("/")
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
  const { successRequestRecoveryPassword } = useSnapshot(stateLogin);
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    stateLogin.successRequestRecoveryPassword = false
  }, [])

  return (
    <>
      <PageContainer bg="unset">
        <HeaderClean disabled={successRequestRecoveryPassword} />
        <Content>
          {!successRequestRecoveryPassword && (
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
          {successRequestRecoveryPassword && (
            <Box
              maxW={{ base: 'md', lg: '5xl' }}
              marginTop={'200px'}
              mx="auto"
              display={{ lg: 'flex' }}
              alignItems="center"
              gap={{ lg: '100px' }}>
              <Box w={'full'}>
                <Box>
                  <Link href="/">
                    <LogoWithText h={{ base: '10', md: '12' }} />
                  </Link>
                </Box>
                <Box h={'20px'} />

                <TextTitle>Permintaan Recovery Password</TextTitle>
                <Box h={'20px'} />
                <Text width={'400px'}>
                  Jika email anda terdaftar pada JumpaDokter anda akan menerima tautan untuk recovery password pada email dalam beberapa menit.
                </Text>
              </Box>
              <Box h={'20px'} />
              <Carousel onPage={'success-email'} />
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
