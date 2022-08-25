import { Box, Flex } from '@chakra-ui/react';
import ButtonMain from 'components/button/ButtonMain';
import Content from 'components/Content';
import HeaderClean from 'components/HeaderClean';
import PageContainer from 'components/PageContainer';
import TextLabel from 'components/text/TextLabel';
import TextTitle from 'components/text/TextTitle';
import { useEffect } from 'react';
import stateBooking from 'states/stateBooking';
import { EXISTING, NEW, ORDER_FOR_OTHER, ORDER_FOR_SELF } from 'utils/constant';
import { useSnapshot } from 'valtio';
import { proxyWithComputed } from 'valtio/utils';
import colors from 'values/colors';
import OrderForNewPatientForm from './components/OrderForNewPatientForm';
import OrderForOtherPatientForm from './components/OrderForOtherPatientForm';
import OrderForSelfForm from './components/OrderForSelfForm';

const orderTypeState = proxyWithComputed(
  {
    tab: ORDER_FOR_SELF,
  },
  {
    diriSendiri: (snap) => snap.tab === ORDER_FOR_SELF,
    orangLain: (snap) => snap.tab === ORDER_FOR_OTHER,
  }
);

const patientState = proxyWithComputed(
  {
    tab: NEW,
  },
  {
    newPatient: (snap) => snap.tab === NEW,
    existingPatient: (snap) => snap.tab === EXISTING,
  }
);

const PatientPage = () => {
  const { diriSendiri, orangLain, tab } = useSnapshot(orderTypeState);
  const { newPatient, existingPatient } = useSnapshot(patientState);
  const { patient } = useSnapshot(stateBooking);

  useEffect(() => {
    if (patient) {
      stateBooking.jenisPesanan = tab;

    } else {
      orderTypeState.tab = ORDER_FOR_SELF;
    }
  }, [tab, patient]);


  return (
    <>
      <PageContainer bg="unset">
        <HeaderClean withBackButton withoutLogo />
        <Content>
          <Box px="4" maxW="md" mx="auto">
            <TextTitle>Janji Temu</TextTitle>
            <TextLabel mb="4">
              Silahkan isi form untuk membuat janji temu bersama dokter Anda
            </TextLabel>
            <Box mb="4">
              <hr />
            </Box>
            <TextLabel mb="2">Pesan dokter untuk</TextLabel>
            <Flex gap="4" mb="4">
              <ButtonMain
                width={32}
                bg={diriSendiri ? colors.PRIMARY : '#C4C4C4'}
                onClick={() => {
                  orderTypeState.tab = ORDER_FOR_SELF;
                }}
                _focus={{ outline: 'none' }}
                px={8}
              >
                {ORDER_FOR_SELF}
              </ButtonMain>
              <ButtonMain
                width={32}
                bg={!diriSendiri ? colors.PRIMARY : '#C4C4C4'}
                onClick={() => {
                  orderTypeState.tab = ORDER_FOR_OTHER;
                }}
                _focus={{ outline: 'none' }}
                border={`1px solid #C4C4C4`}
                px={8}
              >
                {ORDER_FOR_OTHER}
              </ButtonMain>
            </Flex>
            {diriSendiri && <OrderForSelfForm />}
            {orangLain &&
              <>
                <TextLabel mb="2">Pasien</TextLabel>
                <Flex gap="4" mb="4">
                  <ButtonMain
                    width={32}
                    bg={newPatient ? colors.PRIMARY : '#C4C4C4'}
                    onClick={() => {
                      patientState.tab = NEW;
                    }}
                    _focus={{ outline: 'none' }}
                    px={8}
                  >
                    {NEW}
                  </ButtonMain>
                  <ButtonMain
                    width={32}
                    bg={existingPatient ? colors.PRIMARY : '#C4C4C4'}
                    onClick={() => {
                      patientState.tab = EXISTING;
                    }}
                    _focus={{ outline: 'none' }}
                    border={`1px solid #C4C4C4`}
                    px={8}
                  >
                    {EXISTING}
                  </ButtonMain>
                </Flex>

                {newPatient && <OrderForNewPatientForm />}
                {existingPatient && <OrderForOtherPatientForm />}
              </>
            }
            <Box h="8" />
          </Box>
        </Content>
      </PageContainer>
    </>
  );
};

export default PatientPage;
