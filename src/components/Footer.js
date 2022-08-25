import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import colors from 'values/colors';
import contact from 'values/contact';
import urls from 'values/urls';
import LogoWithTextDark from './LogoWithTextDark';

const Footer = () => {
  return (
    <Box position="absolute" top="100%" w="100%" style={{ marginTop: "100px" }}>
      <Box bg={colors.PRIMARY}>
        <Flex
          px={{ base: '4', sm: '6' }}
          maxW="6xl"
          mx="auto"
          py="10"
          color="white"
          display={{ md: 'flex' }}
          justifyContent="space-between"
          alignItems="start"
        >
          <Box mb={{ base: '10' }}>
            <Text mb="3" fontSize="14px">
              Powered by:
            </Text>

            <LogoWithTextDark
              h={{ base: 10, sm: 'unset' }}
              mb={{ base: '4', sm: '8' }}
            />

            {/* <Flex gap="2" mb="4">
              <Image
                h={{ base: '9', sm: '10' }}
                src="/img/dhis2.svg"
                title="dhis2"
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
                src="/img/castellum.png"
                title="Castellum Digital Indonesia"
                alt=""
              />
            </Flex> */}
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

            <Flex alignItems="start" mb="6" fontSize="14px">
              <Image alt="" src="/icon/pin_map.svg" />
              &nbsp;&nbsp;
              <Text fontSize="14px">{contact.ALAMAT}</Text>
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
              <Image alt="" src="/icon/email.svg" />
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
      <Box bg={colors.BIRU_TERANG} color={colors.PRIMARY}>
        <Box
          px="6"
          mx="auto"
          py="5"
          maxW="6xl"
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            order={{ base: 2, md: 1 }}
            fontWeight="semibold"
            fontSize={{ base: '14px', sm: '18px' }}
          >
            &copy;JUMPADOKTER, 2022. ALL RIGHTS RESERVED
          </Box>
          <Flex
            order={{ base: 1, md: 2 }}
            alignItems="center"
            mb={{ base: '4', md: 0 }}
          >
            <Text fontSize={{ base: '14px', sm: '18px' }}>
              Follow kami
            </Text>
            &nbsp;&nbsp;&nbsp;
            <Image h="32px" w="32px" src="/icon/instagram.svg" alt="" mr='2' />
            <Text fontSize={{ base: '14px', sm: '18px' }} fontWeight='bold'>
              @Jumpadokter
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
