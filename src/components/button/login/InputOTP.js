import { Box, Center, Flex, Input, Text } from '@chakra-ui/react';
import ButtonMain from 'components/button/ButtonMain';
import ButtonOutlined from 'components/button/ButtonOutlined';
import TextSubTitle from 'components/text/TextSubTitle';
import TextTitle from 'components/text/TextTitle';
import ToastNotif from 'components/Toast';
import { useEffect, useRef } from 'react';
import Countdown from 'react-countdown';
import { connect } from 'react-redux';
import { loggedIn } from 'redux/actions/authAction';
import apiOtp from 'services/apiOtp';
import { apiPatient } from 'services/apiPatient';
import stateLogin from 'states/stateLogin';
import { setDataToStorage, setTokenToStorage } from 'utils';
import { proxy, useSnapshot } from 'valtio';
import colors from 'values/colors';
import keyStorage from 'values/keyStorage';

const state = proxy({
  otp1: '',
  otp2: '',
  otp3: '',
  otp4: '',
  otp5: '',
  otp6: '',
  processing: false,
  error: '',
});

const Inputs = () => {
  const {
    otp1, otp2, otp3,
    otp4, otp5, otp6,
    processing,
  } = useSnapshot(state);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  useEffect(() => {
    ref1.current?.focus();
  }, []);

  return (
    <Flex justifyContent="center" gap={{ base: '3', md: '6' }} mb="8">
      <Input
        required
        disabled={processing}
        ref={ref1}
        maxLength={1}
        w="40px"
        px="0"
        textAlign="center"
        bg={colors.GRAY}
        type="text"
        border={`1px solid ${colors.GRAY_BORDER}`}
        value={otp1}
        onPaste={(e) => {
          let otpValue = e.clipboardData.getData('text/plain');
          otpValue = otpValue.replace(/\s/g, '');
          state.otp2 = otpValue[1];
          state.otp3 = otpValue[2];
          state.otp4 = otpValue[3];
          state.otp5 = otpValue[4];
          state.otp6 = otpValue[5];
        }}
        onChange={(e) => {
          const { value } = e.target;
          state.otp1 = value.toUpperCase();
          if (value) {
            ref2.current?.focus();
          }
        }}
      />
      <Input
        disabled={processing}
        ref={ref2}
        maxLength={1}
        w="40px"
        px="0"
        textAlign="center"
        bg={colors.GRAY}
        type="text"
        border={`1px solid ${colors.GRAY_BORDER}`}
        value={otp2}
        onChange={(e) => {
          const { value } = e.target;
          state.otp2 = value.toUpperCase();
          if (value) {
            ref3.current?.focus();
          } else {
            ref1.current?.focus();
          }
        }}
      />
      <Input
        required
        disabled={processing}
        ref={ref3}
        maxLength={1}
        w="40px"
        px="0"
        textAlign="center"
        bg={colors.GRAY}
        type="text"
        border={`1px solid ${colors.GRAY_BORDER}`}
        value={otp3}
        onChange={(e) => {
          const { value } = e.target;
          state.otp3 = value.toUpperCase();
          if (value) {
            ref4.current?.focus();
          } else {
            ref2.current?.focus();
          }
        }}
      />
      <Input
        required
        disabled={processing}
        ref={ref4}
        maxLength={1}
        w="40px"
        px="0"
        textAlign="center"
        bg={colors.GRAY}
        type="text"
        border={`1px solid ${colors.GRAY_BORDER}`}
        value={otp4}
        onChange={(e) => {
          const { value } = e.target;
          state.otp4 = value.toUpperCase();
          if (value) {
            ref5.current?.focus();
          } else {
            ref3.current?.focus();
          }
        }}
      />
      <Input
        required
        disabled={processing}
        ref={ref5}
        maxLength={1}
        w="40px"
        px="0"
        textAlign="center"
        bg={colors.GRAY}
        type="text"
        border={`1px solid ${colors.GRAY_BORDER}`}
        value={otp5}
        onChange={(e) => {
          const { value } = e.target;
          state.otp5 = value.toUpperCase();
          if (value) {
            ref6.current?.focus();
          } else {
            ref4.current?.focus();
          }
        }}
      />
      <Input
        required
        disabled={processing}
        ref={ref6}
        maxLength={1}
        w="40px"
        px="0"
        textAlign="center"
        bg={colors.GRAY}
        type="text"
        border={`1px solid ${colors.GRAY_BORDER}`}
        value={otp6}
        onChange={(e) => {
          const { value } = e.target;
          state.otp6 = value.toUpperCase();
          if (!value) {
            ref5.current?.focus();
          }
        }}
      />
    </Flex>
  );
};

const InputOTP = ({ loggedIn }) => {
  const { nohp, error, processing } = useSnapshot(stateLogin);

  const onLanjut = async (e) => {
    e.preventDefault();

    try {
      state.processing = true;
      const phone = stateLogin.nohp;
      const secret = `${state.otp1}${state.otp2}${state.otp3}${state.otp4}${state.otp5}${state.otp6}`;

      const data = await apiOtp.check(phone, secret);
      setTokenToStorage(data.data.token);
      setDataToStorage(keyStorage.PHONE, phone);
      setDataToStorage(keyStorage.NRM, data.data.nrm);

      const biodata = await apiPatient.getDetail();
      loggedIn({ currentUser: { isAuthenticated: true, ...biodata } });

      window.browserHistory.push('/');
    } catch (error) {
      console.error('❌', error);
      ToastNotif({
        message: 'OTP yang Anda masukkan salah.',
        type: 'error'
      });
    } finally {
      state.processing = false;
    }
  };

  return (
    <Box maxW="md" mx="auto">
      <form onSubmit={onLanjut}>
        <TextTitle mb="6">Kode OTP_</TextTitle>
        <TextSubTitle mb="6" color={colors.HITAM_PUDAR} fontWeight="normal">
          Kami sudah mengirimkan kode OTP melalui SMS ke nomor <b>{nohp}</b>
        </TextSubTitle>
        <Flex mb="6">
          <Text fontSize="lg" fontWeight="thin">
            Kode OTP
          </Text>
          <Text color={colors.DANGER}>*</Text>
        </Flex>
        <Inputs />
        <Center
          mb="8"
          fontWeight="bold"
          fontSize="lg"
          color={colors.HITAM_PUDAR}
        >
          <Countdown
            date={Date.now() + 240000}
            renderer={({ minutes, seconds }) => {
              let m = minutes + '';
              let s = seconds + '';
              m = m.length === 1 ? `0${m}` : m;
              s = s.length === 1 ? `0${s}` : s;
              return `${m}:${s}`;
            }}
          />
        </Center>
        <Box w="full">
          {error && (
            <Text fontSize="xs" color="red.500" mb="4" textAlign="center">
              {error}
            </Text>
          )}
          <ButtonMain disabled={processing} w="full" type="submit" mb="2">
            Lanjut
          </ButtonMain>
          <ButtonOutlined
            disabled={processing}
            w="full"
            type="button"
            onClick={() => {
              state.otp1 = '';
              state.otp2 = '';
              state.otp3 = '';
              state.otp4 = '';
              state.otp5 = '';
              state.otp6 = '';
              stateLogin.showInputOtp = false;
            }}
          >
            Kembali
          </ButtonOutlined>
        </Box>
      </form>
    </Box>
  );
};

const dispatcher = (dispatch) => {
  return {
    loggedIn: (payload) => dispatch(loggedIn(payload)),
  };
};

export default connect(null, dispatcher)(InputOTP);
