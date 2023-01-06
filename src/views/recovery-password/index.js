import {
  Box,
  Button, CircularProgress, Flex, ListItem,
  OrderedList,
  Text,
  Select,
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
import TextLabel from 'components/text/TextLabel';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import apiAuth from 'services/apiAuth';
import apiDoctor from 'services/apiDoctor';
import apiOtp from 'services/apiOtp';
import stateLogin from 'states/stateLogin';
import { setCurrentUserToStorage, setTokenToStorage } from 'utils';
import { useSnapshot } from 'valtio';
import colors from 'values/colors';
import TextSmall from 'components/text/TextSmall';

const RecoveryPasswordForm = ({ onClikWaHelp }) => {
  const history = useHistory()
  const [mode, setMode] = useState('reset')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    repeatPassword: ''
  })
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    repeatPassword: false
  })

  const handleShowOld = () => {
    setShowPassword({ ...showPassword, oldPassword: !showPassword.oldPassword });
  };
  const handleShowNew = () => {
    setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword });
  };
  const handleShowRepeat = () => {
    setShowPassword({ ...showPassword, repeatPassword: !showPassword.repeatPassword });
  };

  const onChangeMode = (mode) => {
    setMode(mode)
  };
  const onChangePasswordOld = (password) => {
    setPassword({ ...password, oldPassword: password })
  };
  const onChangePasswordNew = (password) => {
    setPassword({ ...password, newPassword: password })
  };
  const onChangePasswordRepeat = (password) => {
    setPassword({ ...password, repeatPassword: password })
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setLoading(false)

    // try {
    //   stateLogin.processing = true;
    //   const loginResponse = await apiAuth.login(username.target.value, password.target.value)
    //   if (loginResponse.code === 200) {
    //     setTokenToStorage(loginResponse.data.token)
    //     localStorage.setItem("email", username.target.value)
    //     const currentUser = await apiDoctor.getDetail();
    //     setCurrentUserToStorage(currentUser);
    //     window.browserHistory.push("/login")
    //   } else {
    //     ToastNotif({
    //       message: "Username atau password tidak dikenal"
    //     })
    //   }
    // } catch (error) {
    //   console.error('❌ onSubmit:', e);
    // } finally {
    //   stateLogin.processing = false;
    // }
  };

  return (
    <>
      <Box w="full" color={colors.PRIMARY}>
        <form onSubmit={onSubmit}>
          <Box color='#505050'>
            <Text pb={4} fontSize="3xl" fontWeight="bold" >
              Halo dokter!
            </Text>
            <Text >
              Silahkan mengganti password sebelum login demi keamanan
            </Text>
          </Box>
          <Box pt={4}>
            <Flex>
              <TextSmall fontWeight="thin">Mode</TextSmall>
              <Text fontSize="xs" color={colors.DANGER}>
                *
              </Text>
            </Flex>
            <Select value={mode} onChange={(e) => {
              const val = e.target.value
              onChangeMode(val)
            }}>
              <option value='reset'>Reset Password</option>
              <option value='ganti'>Ganti Password</option>
            </Select>
          </Box>
          {mode === 'reset' &&
            <Box pt={4}>
              <InputUnderlined
                isRequired
                icon="/icon/credit_card.svg"
                label='Password lama'
                onChange={onChangePasswordOld}
                type='password'
                handleShow={handleShowOld}
                placeholder='Masukkan password lama'
                value={password.oldPassword}
                show={showPassword.oldPassword}
              />
            </Box>
          }
          <Box pt={4}>
            <InputUnderlined
              isRequired
              icon="/icon/credit_card.svg"
              label='Password baru'
              onChange={onChangePasswordNew}
              type='password'
              handleShow={handleShowNew}
              placeholder='Masukkan password baru'
              value={password.newPassword}
              show={showPassword.newPassword}
            />
          </Box>
          <Box pt={4}>
            <InputUnderlined
              isRequired
              icon="/icon/credit_card.svg"
              label='Ulangi password'
              onChange={onChangePasswordRepeat}
              type='password'
              handleShow={handleShowRepeat}
              placeholder='Ulangi password'
              value={password.repeatPassword}
              show={showPassword.repeatPassword}
            />
          </Box>
          <Box h="8" />
          <ButtonMain type="submit" disabled={loading} w="full">
            {loading ? <CircularProgress isIndeterminate color={colors.PRIMARY} size={'25px'} /> : 'Reset password'}
          </ButtonMain>
        </form>
      </Box>
    </>
  );
};

const RecoveryPasswordPage = () => {
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
              <RecoveryPasswordForm onClikWaHelp={onToggle} />

              <Carousel onPage={'recovery'} />
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

export default RecoveryPasswordPage;
