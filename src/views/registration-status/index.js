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
  const [email, setEmail] = useState('')
  const [str, setStr] = useState('')
  const [processing, setOnProcessing] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setOnProcessing(true)
      const statusRes = await apiDoctor.checkRegistrationStatus(email, str)
      if (statusRes) {
        console.log("Status", statusRes)
        switch (statusRes.status) {
          case "0":
            window.browserHistory.push("/sign-up/1")
            break
          case "1":
            window.browserHistory.push("/sign-up/3")
            break
          case "2":
            window.browserHistory.push("/sign-up/2")
            break
          default:
            window.browserHistory.push("/sign-up/1")
            break

        }
      }

      setOnProcessing(false)
    } catch (error) {
      console.error('❌ onSubmit:', e);
    } finally {
      setOnProcessing(false)
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
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              type="text"
              placeholder='mail@email.com'
              key={"email"}
              value={email}
            />
          </Box>
          <Box pt={4}>
            <InputUnderlined
              isRequired
              typeIcon={'library'}
              icon={<FiFileText fontSize={'25px'} color={'#505050'} />}
              label='No STR'
              onChange={(e) => {
                setStr(e.target.value)
              }}
              type='text'
              placeholder='Masukkan no STR'
              value={str}
              key={"str"}
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
        </Content>
      </PageContainer>
    </>
  );
};

export default RegistrationStatusPage;
