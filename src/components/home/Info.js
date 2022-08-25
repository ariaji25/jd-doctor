import { Box, Center, Flex, Image, Link, Text } from '@chakra-ui/react';
import ButtonMain from 'components/button/ButtonMain';
import colors from 'values/colors';
import contact from 'values/contact';
import urls from 'values/urls';

const Info = () => {
  return (
    <Flex flexDir="column" justifyContent="center" mb="14">
      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        mb="6"
        gap="10"
        justifyContent="center"
        alignItems="center"
      >
        <ButtonMain
          onClick={() => {
            const link = document.createElement('a');
            link.href = urls.WA_ME;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            link.remove();
          }}
          px="5"
          py="7"
        >
          Buat janji dokter
        </ButtonMain>
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

      <Flex
        justifyContent="center"
        alignItems="center"
        mb={{ base: '0', sm: '6' }}
        fontSize="14px"
        color={colors.DANGER}
      >
        <Image alt="" src="/icon/virus.svg" />
        &nbsp;&nbsp;
        <Text fontWeight="medium">Informasi tentang Covid-19</Text>
      </Flex>

      <Center h={{ base: 600, sm: 800 }} position="relative">
        <Image
          width={'md'}
          src="/img/dokter.png"
          alt=""
          objectFit="contain"
          layout="fill"
        />
      </Center>

      {/* <Flex
        zIndex={99}
        mt={{ base: '-32', sm: '-32', md: '-20' }}
        mb="24"
        justifyContent="center"
        gap="2"
      >
        <Link href="https://play.google.com/store/apps/details?id=" target={"_blank"}>
          <Image
            h={{ base: '10', sm: '16' }}
            alt=""
            src="/img/google_play.svg"
          />
        </Link>
        <Link href="https://apps.apple.com/ke/app" target={"_blank"}>
          <Image
            h={{ base: '10', sm: '16' }}
            alt=""
            src="/img/app_store.svg"
          />
        </Link>
      </Flex> */}

      <Box color={colors.PRIMARY}>
        <Center mb="3">
          <Image src="/icon/hospital.svg" alt="" />
        </Center>
        <Text
          mb="3"
          textAlign="center"
          fontSize={{ base: '16px', sm: '20px' }}
          fontWeight="bold"
        >
          Alamat praktek umum
        </Text>
        <Text
          color={colors.HITAM_PUDAR}
          textAlign="center"
          fontSize={{ base: '12px', sm: '16px' }}
          fontWeight="medium"
        >
          {contact.ALAMAT}
        </Text>
      </Box>
    </Flex>
  );
};

export default Info;
