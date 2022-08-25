import {
  Box,
  Center,
  Flex,
  Image, Text
} from '@chakra-ui/react';
import colors from 'values/colors';

const ItemLayanan = ({ layanan }) => {
  return (
    <Box
      bg="white"
      boxSizing='border-box'
      p='6'
      onClick={layanan.onClick}>
      <Flex justifyContent='center' flexDir='column'>
        <Box
          cursor={"pointer"}
          w='230px'
          h='230px'>
          <Center>
            <Image alt="" src={layanan.icon} />
          </Center>
        </Box>
        <Text
          cursor={"pointer"}
          mt="4"
          align='center'
          fontWeight='bold'
          color={colors.PRIMARY}>
          {layanan.label}
        </Text>
        <Text align='center'>
          {layanan.tipe}
        </Text>
      </Flex>
    </Box>
  );
};

const DaftarDokter = ({
  maxW,
  titleAlign,
  subtitle,
  onCallback,
}) => {
  const layananList = [
    {
      label: 'dr. Akbar Jaidi M.K.M',
      tipe: 'Dokter Umum',
      icon: '/img/doctor/doctor.svg',
      onClick: () => {
        window.browserHistory.push("doctor/45c4a29f2fb0");
      },
    },
    {
      label: 'dr. Farhan Kelvin',
      tipe: 'Dokter Umum',
      icon: '/img/doctor/doctor.svg',
      onClick: () => {
        window.browserHistory.push("doctor/23832c2c1c33");
      },
    },
    {
      label: 'dr. Hadiguna Ahmad',
      tipe: 'Dokter Umum',
      icon: '/img/doctor/doctor.svg',
      onClick: () => {
        window.browserHistory.push("doctor/441888a8b1c7");
      },
    },
    {
      label: 'dr. Yusuf Muhumbar M.K.M',
      tipe: 'Dokter Umum',
      icon: '/img/doctor/doctor.svg',
      onClick: () => {
        window.browserHistory.push("doctor/18bd62dc75a1");
      },
    },
  ];
  return (
    <Box mb="16" maxW='full'>
      <Text
        color={colors.PRIMARY}
        mb="12"
        textAlign={titleAlign ?? 'center'}
        fontSize={{ base: '24', sm: '36px' }}
        fontWeight="bold"
      >
        Jumpa dokter terbaik
      </Text>
      <Flex wrap='wrap' justifyContent='center'>
        {layananList.map((l, index) => (
          <ItemLayanan key={index} layanan={l} />
        ))}
      </Flex>
    </Box>
  );
};

export default DaftarDokter;
