import {
  Box,
  Button, CircularProgress, Flex, ListItem,
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
import ToastNotif from 'components/Toast';
import React, { useState } from 'react';
import { FiFileText } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import apiAuth from 'services/apiAuth';
import apiDoctor from 'services/apiDoctor';
import apiOtp from 'services/apiOtp';
import stateLogin from 'states/stateLogin';
import { setCurrentUserToStorage, setTokenToStorage } from 'utils';
import { useSnapshot } from 'valtio';
import colors from 'values/colors';

const RegistrationStatusForm = ({ onClikWaHelp }) => {
  const history = useHistory()
  const { username, password, processing } = useSnapshot(stateLogin);
  const [showPassword, setShowPassword] = useState(false)
  const [login, setLogin] = useState({
    username: '',
    password: ''
  })
  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const onChangeUsername = (username) => {
    stateLogin.username = username;
  };

  const onChangePassword = (password) => {
    stateLogin.password = password;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      stateLogin.processing = true;
      const loginResponse = await apiAuth.login(username.target.value, password.target.value)
      if (loginResponse.code === 200) {
        setTokenToStorage(loginResponse.data.token)
        localStorage.setItem("email", username.target.value)
        const currentUser = await apiDoctor.getDetail();
        setCurrentUserToStorage(currentUser);
        window.browserHistory.push("/sign-up")
      } else {
        ToastNotif({
          message: "Username atau password tidak dikenal"
        })
      }
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
          <Text pb={8} fontSize="2xl" fontWeight="bold" color='#505050'>
            Masukkan email dan no STR
          </Text>
          <Box>
            <InputUnderlined
              isRequired
              icon="/icon/user.svg"
              label="Email"
              onChange={onChangeUsername}
              type="text"
              placeholder='mail@email.com'
              value={login.username}
            />
          </Box>
          <Box pt={4}>
            <InputUnderlined
              isRequired
              typeIcon={'library'}
              icon={<FiFileText fontSize={'25px'} color={'#505050'} />}
              label='No STR'
              onChange={onChangePassword}
              type='password'
              handleShow={handleShow}
              placeholder='Masukkan no STR'
              value={login.password}
              show={showPassword}
            />
          </Box>
          <Box h="8" />
          <ButtonMain type="submit" disabled={processing} w="full">
            {stateLogin.processing ? <CircularProgress isIndeterminate color={colors.PRIMARY} size={'25px'} /> : 'Cek status pendaftaran'}
          </ButtonMain>
          <Text
            my="6"
            fontSize={{ base: 'xs', md: 'unset' }}
            cursor="pointer"
            color='#505050'
            textAlign='center'
            onClick={() => history.push('/login')}
          >
            Kembali ke halaman masuk
          </Text>
        </form>
      </Box>
    </>
  );
};

const RegistrationStatusPage = () => {
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
              <RegistrationStatusForm onClikWaHelp={onToggle} />

              <Carousel onPage={'login'} />
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

export default RegistrationStatusPage;
