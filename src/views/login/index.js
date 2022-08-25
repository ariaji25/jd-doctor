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
import PageContainer from 'components/PageContainer';
import SideModal from 'components/SideModal';
import React from 'react';
import { Link } from 'react-router-dom';
import apiOtp from 'services/apiOtp';
import stateLogin from 'states/stateLogin';
import { useSnapshot } from 'valtio';
import colors from 'values/colors';

const LoginForm = ({ onClikWaHelp }) => {
  const { nohp, processing } = useSnapshot(stateLogin);
  const onClear = () => {
    stateLogin.nohp = '';
  };

  const onChangeNoHp = (nohp) => {
    stateLogin.nohp = nohp;
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
          <Text fontSize="3xl" fontWeight="bold">
            Masuk
          </Text>
          <Text color={colors.HITAM_PUDAR} mb="8">
            Masuk dengan nomor Whatsapp
          </Text>
          <Flex>
            <Text fontSize="lg" fontWeight="thin">
              Nomor Whatsapp
            </Text>
            <Text color={colors.DANGER}>*</Text>
          </Flex>
          <InputNoHP
            isRequired
            isDisabled={processing}
            w="full"
            value={nohp}
            onChangeNoHp={onChangeNoHp}
            placeholder=""
            name="nohp"
            onClear={onClear}
          />
          <Box h="4" />
          <Text
            mb="8"
            fontSize={{ base: 'xs', md: 'unset' }}
          >
            <Button
              variant={"unstyled"}
              onClick={() => onClikWaHelp()}
              _focus={{ border: "none" }}
              _active={{ border: "none" }}
              style={{ textDecoration: 'underline' }}>
              Terjadi kendala dengan nomor Whatsapp-mu?
            </Button>
          </Text>
          <ButtonMain type="submit" disabled={processing} w="full">
            Masuk
          </ButtonMain>
          <Text
            mt="8"
            fontSize={{ base: 'xs', md: 'unset' }}
            color={colors.HITAM_PUDAR}
          >
            Dengan masuk, Anda telah menerima
            <Link to={"/term-and-condition"} style={{ fontWeight: 'bold', color: colors.PRIMARY }}> Ketentuan Layanan</Link> dan
            <Link to={"/privacy-policy"} style={{ fontWeight: 'bold', color: colors.PRIMARY }}> Kebijakan privasi</Link>
          </Text>
        </form>
      </Box>
    </>
  );
};

const LoginPage = () => {
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
              alignItems="center"
              gap={{ lg: '200px' }}
            >
              <LoginForm onClikWaHelp={onToggle} />

              <Carousel />
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

export default LoginPage;
