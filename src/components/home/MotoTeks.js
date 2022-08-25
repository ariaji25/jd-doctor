import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import ButtonMain from 'components/button/ButtonMain';
import SearchComponent from 'components/Search';
import colors from 'values/colors';
import contact from 'values/contact';
import urls from 'values/urls';

const MotoTeks = () => {
  return (
    <Flex
      justifyContent="center"
      wrap="wrap-reverse"
      mb='4'>
      <Box
        mt={{ base: '6', md: 'uset' }}
        fontSize={{ base: '4xl', sm: '6xl' }}
      >
        <Box>
          <Text mb={{ base: '-2', sm: '-5' }} fontWeight="light">
            Membantu kamu
          </Text>
          <Text mb={{ base: '-2', sm: '-5' }} fontWeight="light">
            menjaga orang
          </Text>
          <Text color={colors.BIRU_TERANG} fontWeight="semibold">
            “Tersayang”
          </Text>
        </Box>

        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          mt="12"
          gap="10"
          justifyContent="start"
          alignItems="center"
        >
          <Link href={urls.WA_ME}>
            <ButtonMain
              px="5"
              py="7"
            >
              Buat janji dokter <Image ml={2} h="24px" src="/icon/forward.svg" alt="" />
            </ButtonMain>
          </Link>
          <Flex
            justifyContent="center"
            alignItems="center"
            fontSize="14px"
            color={colors.PRIMARY}
          >
            <Image alt="" src="/icon/telephone_light.svg" />
            &nbsp;&nbsp;
            <Link href={urls.WA_ME}>
              <Text
                _hover={{ color: colors.BIRU_TERANG }}
                cursor="pointer"
                fontWeight="medium"
              >
                {contact.TELEPON}
              </Text>
            </Link>
          </Flex>
        </Flex>

        <Flex justifyContent={'start'} mt="12">
          <SearchComponent
            title={"Cari Dokter"}
            placeholder={""}
            onChange={e => {
              window.browserHistory.push(`/doctor?search=${e}`);
            }}
          />
        </Flex>

        <Flex
          justifyContent="start"
          alignItems="center"
          mb={{ base: '0', sm: '6' }}
          fontSize="14px"
          color={colors.DANGER}
        >
          <Image alt="" src="/icon/virus.svg" />
          &nbsp;&nbsp;
          <Text fontWeight="medium">Informasi tentang Covid-19</Text>
        </Flex>
      </Box>
      <Image alt="" src="/img/doctor/doctors.svg" maxW='512px' display={{ base: 'none', md: 'inline-block' }} />
    </Flex>
  );
};

export default MotoTeks;
