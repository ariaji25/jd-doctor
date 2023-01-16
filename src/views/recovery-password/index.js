import {
  Box,
  Button, CircularProgress, Flex, ListItem,
  OrderedList,
  Text,
  Select,
  useDisclosure,
  Badge
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
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import apiAuth from 'services/apiAuth';
import apiDoctor from 'services/apiDoctor';
import apiOtp from 'services/apiOtp';
import stateLogin from 'states/stateLogin';
import { checkPassword, setCurrentUserToStorage, setTokenToStorage } from 'utils';
import { useSnapshot } from 'valtio';
import colors from 'values/colors';
import TextSmall from 'components/text/TextSmall';
import { useQueryParams } from 'utils';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import CustomModal from 'components/CustomModal';
import { useDispatch } from 'react-redux';

const RecoveryPasswordForm = ({ onClikWaHelp, isReset, token }) => {
  const history = useHistory()
  const [mode, setMode] = useState(isReset ? 'reset' : 'ganti')
  const {isOpen, onOpen, onClose} = useDisclosure()
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


  const [isValidPassword, setIsValidPassword] = useState(false)
  const [isEqual, setIsEqual] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleShowOld = () => {
    setShowPassword({ ...showPassword, oldPassword: !showPassword.oldPassword });
  };
  const handleShowNew = () => {
    setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword });
  };
  const handleShowRepeat = () => {
    setShowPassword({ ...showPassword, repeatPassword: !showPassword.repeatPassword });
  };

  const onChangePasswordOld = (e) => {
    setPassword({ ...password, oldPassword: e.target.value })
  };
  const onChangePasswordNew = (e) => {
    setIsValidPassword(checkPassword(e.target.value))
    setPassword({ ...password, newPassword: e.target.value })
  };

  const onChangePasswordRepeat = (e) => {
    setIsEqual(e.target.value === password.newPassword)
    setPassword({ ...password, repeatPassword: e.target.value })
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(password.newPassword, token)
    if (isEqual && isValidPassword) {
      setLoading(true)
      apiAuth.resetPassword(password.newPassword, token).then((r) => {
        setLoading(false)
        setIsSuccess(true)
        onOpen()
      }).catch(err => {
        setLoading(false)
        setIsSuccess(false)
        onOpen()
      })

    }
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
          {/* <Box pt={4}>
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
          </Box> */}
          {!isReset &&
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
            {!isValidPassword && password && password.newPassword ? <Text color={colors.DANGER} fontSize={'11px'} >Password harus mengandung 8 huruf terdiri dari huruf, angka dan karakter khusus</Text> : <></>}
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
            {!isEqual && password && password.repeatPassword ?  <Text color={colors.DANGER} fontSize={'11px'} >Password tidak sama dengan password baru</Text> : <></>}
          </Box>
          <Box h="8" />
          <ButtonMain type="submit" disabled={loading} w="full">
            {loading ? <CircularProgress isIndeterminate color={colors.PRIMARY} size={'25px'} /> : 'Reset password'}
          </ButtonMain>
        </form>
      </Box>     
      <CustomModal
        isOpen={isOpen}
        message={isSuccess ? "Berhasil recovery password" : "Gagal recovery password"}
        type={isSuccess ? "success" : "danger"}
        onClose={e => {
          if (isSuccess) {
            onClose()
            window.browserHistory.push("/login")
          } else onClose()
        }} />
    </>
  );
};

const RecoveryPasswordPage = () => {
  const { showInputOtp } = useSnapshot(stateLogin);
  const { isOpen, onToggle } = useDisclosure();
  const [isReset, setIsReset] = useState(false)
  const { search, pathname } = useLocation()
  const token = useQueryParams("token")

  useEffect(() => {
    if (token && pathname.includes("reset")) {
      setIsReset(true)
    } else if (pathname.includes("reset")) {
      window.location.replace("/404")
    }
  }, [search, token, pathname])

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
              <RecoveryPasswordForm onClikWaHelp={onToggle} isReset={isReset} token={token} />

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
