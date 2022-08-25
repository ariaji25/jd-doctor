import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  useDisclosure
} from '@chakra-ui/react';
import ButtonMainLarge from 'components/button/ButtonMainLarge';
import Content from 'components/Content';
import Footer from 'components/Footer';
import HeaderClean from 'components/HeaderClean';
import LayananKami from 'components/home/LayananKami';
import TextLabel from 'components/text/TextLabel';
import TextSubTitle from 'components/text/TextSubTitle';
import TextTitle from 'components/text/TextTitle';
import queryString from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import apiBooking from 'services/apiBooking';
import stateBooking, { resetStateBooking } from 'states/stateBooking';
import colors from 'values/colors';

const LAYANAN_LIST_DUMMY = [
  {
    id: 'gZ0DSZ2v3p6',
    icon: '/icon/cek_khitan.svg',
  },
  {
    id: 'kLr9G2oYWd0',
    icon: '/icon/cek_stetoskop.svg',
  },
  {
    id: 'iDo55FW5PBH',
    icon: '/icon/cek_luka.svg',
  },
  {
    id: 'JNaZn3n6HaN',
    icon: '/icon/cek_asam_urat.svg',
  },
  {
    id: 'achrBAs8luI',
    icon: '/icon/cek_gula.svg',
  },
  {
    id: 'ARTdo7ftC7G',
    icon: '/icon/cek_kolesterol.svg',
  },
  {
    id: 'xsVqUjolJnH',
    icon: '/icon/cek_swab.svg',
  },
];

const LayananMessage = (id) => {
  let msg = '';
  switch (id) {
    case 'xsVqUjolJnH':
      msg = 'Tujuan SWAB antigen';
      break;

    default:
      msg = 'Keluhan yang Anda rasakan';
      break;
  }
  return msg;
};

const ServicePage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, getValues } = useForm();
  const [namaLayanan, setNamaLayanan] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [title, setTitle] = useState("Keluhan yang Anda rasakan");

  const onLanjut = () => {
    stateBooking.layananId = serviceId;
    stateBooking.namaLayanan = namaLayanan;
    stateBooking.keluhan = getValues('keluhan');
    window.browserHistory.push(`/services/patient?serviceId=${serviceId}`);
  };

  const iconLayanan = useMemo(() => {
    const layanan = LAYANAN_LIST_DUMMY.find((l) => l.id === serviceId);
    if (layanan) {
      return layanan.icon;
    }
    return '';
  }, [serviceId]);

  const init = async () => {
    // reset stateBooking
    resetStateBooking();

    const query = queryString.parse(location.search);
    setTitle(LayananMessage(query.serviceId));
    setServiceId(query.serviceId);

    const data = await apiBooking.getLayananList();
    const { options } = data;
    const layanan = options.find((op) => op.id === query.serviceId);
    setNamaLayanan(layanan.displayName);

    if (query.serviceId && layanan.displayName) {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, [location.search]);

  return (
    <>
      <Flex>
        <Box w="full" marginBottom={"100px"}>
          <HeaderClean withBackButton withoutLogo />
          <Content>
            <Box maxW="md" mx="auto">
              <TextTitle color={colors.HITAM_PUDAR}>{title}</TextTitle>
              <TextSubTitle color={colors.HITAM_PUDAR} fontWeight="thin" mb="5">
                {!title.toLowerCase().includes("swab") && 'Tembahkan rincian keluhan Anda'}
              </TextSubTitle>
              <Box mb="5">
                <hr />
              </Box>
              <TextLabel mb="2">Layanan yang dipilih</TextLabel>
              <Button
                bg="white"
                rounded="5px"
                border={`1px solid ${colors.GRAY_BORDER_2}`}
                w="full"
                color={colors.PRIMARY}
                fontWeight="normal"
                h="75px"
                mb="4"
                onClick={onOpen}
              >
                {!loading && (
                  <Flex alignItems="center">
                    <Image h="25px" src={iconLayanan} alt="" mr="4" />
                    <Text>{namaLayanan}</Text>
                  </Flex>
                )}
                {loading && (
                  <Flex alignItems="center">
                    <Spinner />
                  </Flex>
                )}
              </Button>
              <TextLabel mb="2">{title}</TextLabel>
              <Textarea
                fontSize="sm"
                fontWeight="thin"
                rows={10}
                placeholder="Demam dan batuk pilek..."
                border={`1px solid ${colors.GRAY_BORDER_2}`}
                rounded="5px"
                mb="4"
                {...register('keluhan', { required: true })}
              />
              <ButtonMainLarge onClick={handleSubmit(onLanjut)} w="full">
                Lanjut
              </ButtonMainLarge>
            </Box>
          </Content>
        </Box>
        <Footer />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <LayananKami
              onCallback={() => {
                onClose();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ServicePage;
