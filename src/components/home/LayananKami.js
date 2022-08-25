import {
  Box,
  Center,
  Image, Text,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import colors from 'values/colors';

const ItemLayanan = ({ layanan }) => {
  return (
    <Box
      cursor="pointer"
      _hover={{ bg: colors.GRAY }}
      bg="white"
      color={colors.PRIMARY}
      borderRadius="10px"
      border="1px solid #DCDCDC"
      h={{ base: '28', sm: '32', md: '40' }}
      w={{ base: '28', sm: '32', md: '40' }}
      py={{ base: '3', md: '8' }}
      px={{ base: '3', md: '6' }}
      onClick={layanan.onClick}
    >
      <Center mb="4">
        <Image alt="" src={layanan.icon} height={{ base: '10', md: '14' }} />
      </Center>
      <Text
        textAlign="center"
        fontSize={{ base: '12px', sm: '14px' }}
        fontWeight="medium"
      >
        {layanan.label}
      </Text>
    </Box>
  );
};

const LayananKami = ({
  maxW,
  withHeader = true,
  titleAlign,
  subtitle,
  onCallback,
}) => {
  const layananList = [
    {
      id: 'kLr9G2oYWd0',
      label: 'Pemeriksaan Umum',
      icon: '/icon/cek_stetoskop.svg',
      onClick: () => {
        window.browserHistory.push(`/services?serviceId=kLr9G2oYWd0`);
        if (onCallback) {
          onCallback();
        }
      },
    },
    {
      id: 'xsVqUjolJnH',
      label: 'Swab Antigen',
      icon: '/icon/cek_swab.svg',
      onClick: () => {
        window.browserHistory.push(`/services?serviceId=xsVqUjolJnH`);
        if (onCallback) {
          onCallback();
        }
      },
    },
    {
      id: 'achrBAs8luI',
      label: 'Periksa Gula Darah',
      icon: '/icon/cek_gula.svg',
      onClick: () => {
        window.browserHistory.push(`/services?serviceId=achrBAs8luI`);
        if (onCallback) {
          onCallback();
        }
      },
    },
    {
      id: 'ARTdo7ftC7G',
      label: 'Periksa Kolesterol',
      icon: '/icon/cek_kolesterol.svg',
      onClick: () => {
        window.browserHistory.push(`/services?serviceId=ARTdo7ftC7G`);
        if (onCallback) {
          onCallback();
        }
      },
    },
    {
      id: 'JNaZn3n6HaN',
      label: 'Periksa Asam Urat',
      icon: '/icon/cek_asam_urat.svg',
      onClick: () => {
        window.browserHistory.push(`/services?serviceId=JNaZn3n6HaN`);
        if (onCallback) {
          onCallback();
        }
      },
    },
    {
      id: 'gZ0DSZ2v3p6',
      label: 'Khitanan',
      icon: '/icon/cek_khitan.svg',
      onClick: () => {
        window.browserHistory.push(`/services?serviceId=gZ0DSZ2v3p6`);
        if (onCallback) {
          onCallback();
        }
      },
    },
    {
      id: 'iDo55FW5PBH',
      label: 'Perawatan Luka',
      icon: '/icon/cek_luka.svg',
      onClick: () => {
        window.browserHistory.push('/services?serviceId=iDo55FW5PBH');
        if (onCallback) {
          onCallback();
        }
      },
    },
  ];
  return (
    <Center mt='12' mb='8'>
      <Box mb="16" maxW={maxW ?? '3xl'}>
        {withHeader &&
          <>
            <Text
              color={colors.PRIMARY}
              mb="1"
              textAlign={titleAlign ?? 'center'}
              fontSize={{ base: '24', sm: '36px' }}
              fontWeight="bold"
            >
              Layanan kami
            </Text>
            <Text
              color={colors.HITAM_PUDAR}
              textAlign={titleAlign ?? 'center'}
              fontSize={{ base: '12', sm: '16px' }}
              fontWeight="medium"
              mb="8"
            >
              {subtitle ?? 'Layanan'}
            </Text>
          </>
        }
        <Wrap
          justify="center"
          columns={{ base: 3, md: 4 }}
          spacing={{ base: 2, sm: 4, md: 5 }}
        >
          {layananList.map((l) => (
            <WrapItem key={l.id}>
              <ItemLayanan layanan={l} />
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </Center>
  );
};

export default LayananKami;
