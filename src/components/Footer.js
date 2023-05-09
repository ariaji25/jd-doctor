import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import colors from 'values/colors';
import contact from 'values/contact';
import urls from 'values/urls';
import LogoWithTextDark from './LogoWithTextDark';

const Footer = () => {
  return (
    <Box position="absolute" top="100%" w="100%" style={{ marginTop: "20px" }}>
      <Box bg={colors.PRIMARY}>
        <Flex
          px={{ base: '4', sm: '6' }}
          maxW="6xl"
          mx="auto"
          pt={'20'}
          pb="10"
          color="white"
          display={{ md: 'flex' }}
          justifyContent="space-between"
          alignItems="start"
        >
          <Box mb={{ base: '10' }}>

            <LogoWithTextDark
              h={{ base: 10, sm: 'unset' }}
              mb={{ base: '4', sm: '8' }}
            />

            <Text mb="3" fontSize="14px">
              Powered by:
            </Text>
            <Flex gap="2" mb="4">
              <Image
                h={{ base: '9', sm: '10' }}
                src="/img/castellum.png"
                title="Castellum Digital Indonesia"
                alt=""
              />
              <Image
                h={{ base: '9', sm: '10' }}
                src="/img/hisp_id.png"
                title="HISP ID"
                alt=""
              />
              <Image
                h={{ base: '9', sm: '10' }}
                src="/img/dhis2.svg"
                title="dhis2"
                alt=""
              />
            </Flex>
            {/* <Text fontWeight="bold" mb="3" fontSize="14px">
              Download JumpaDokter
            </Text>
            <Flex gap="2">
              <Link
                href="https://play.google.com/store/apps/details?id="
                isExternal
              >
                <Image h="12" alt="" src="/img/google_play.svg" />
              </Link>

              <Link href="https://apps.apple.com/ke/app" isExternal>
                <Image h="12" alt="" src="/img/app_store.svg" />
              </Link>
            </Flex> */}
          </Box>
          <Box>
            <Text fontWeight="bold" mb="6" fontSize="16px">
              Site Map
            </Text>

            <Text mb="6" fontSize="14px">
              <Link href="/about">Tentang</Link>
            </Text>
            <Text mb="6" fontSize="14px">
              <Link href="/article">Artikel Kesehatan</Link>
            </Text>
            <Text mb="6" fontSize="14px">
              <Link href="/term-and-condition">
                Syarat &amp; Ketentuan
              </Link>
            </Text>
            <Text fontSize="14px">
              <Link href="/privacy-policy">Kebijakan Privasi</Link>
            </Text>
          </Box>
          <Box maxW={{ md: '30%' }}>
            <Text fontWeight="bold" mb="6" fontSize="16px">
              Hubungi Kami
            </Text>

            {/* <Flex alignItems="start" mb="6" fontSize="14px">
              <Image alt="" src="/icon/pin_map.svg" />
              &nbsp;&nbsp;
              <Text fontSize="14px">{contact.ALAMAT}</Text>
            </Flex> */}
            <Flex alignItems="start" mb="6" fontSize="14px">
              <Image alt="" src="/icon/ig.svg" />
              &nbsp;&nbsp;
              <Text fontSize="14px">{contact.IG}</Text>
            </Flex>
            <Flex alignItems="start" mb="6" fontSize="14px">
              <Image alt="" src="/icon/telephone.svg" />
              &nbsp;&nbsp;
              <Link
                href={urls.WA_ME}
                cursor="pointer"
                fontSize="14px"
                fontWeight="semibold"
                _hover={{ color: colors.BIRU_TERANG }}
              >
                {contact.TELEPON}
              </Link>
            </Flex>
            <Flex alignItems="start" fontSize="14px">
              <Image alt="" src="/icon/envelope.svg" />
              &nbsp;&nbsp;
              <Text fontSize="14px">
                <Link
                  href="mailto:infodokter@jumpadokter.com"
                  isExternal
                  cursor="pointer"
                  _hover={{ color: colors.BIRU_TERANG }}
                >
                  {contact.EMAIL}
                </Link>
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box bg={colors.PRIMARY} color={'white'}>
        <Box
          px="6"
          mx="auto"
          py="5"
          maxW="6xl"
        >
          <Box
            order={{ base: 2, md: 1 }}
            fontWeight="semibold"
            textAlign={'center'}
            fontSize={{ base: '14px', sm: '14px' }}
          >
            &copy;JUMPADOKTER, {new Date().getFullYear()}. ALL RIGHTS RESERVED
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
