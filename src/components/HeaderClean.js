import { Box, Flex, Image, Link } from '@chakra-ui/react';
import LogoWithText from 'components/LogoWithText';
import { useHistory } from 'react-router-dom';

const HeaderClean = ({ withBackButton, withoutLogo, maxW }) => {
  const history = useHistory();

  return (
    <Box>
      <Flex
        alignItems="center"
        justifyContent="start"
        maxW={maxW ?? '6xl'}
        mx="auto"
        px={{ base: '4', md: '10' }}
        py={{ base: '6', md: '10' }}
      >
        {withBackButton && (
          <Box
            onClick={() => {
              history.goBack();
            }}
            mr={!withoutLogo ? '4' : '0'}
            cursor="pointer"
          >
            <Image h="5" src="/icon/back.svg" alt="" />
          </Box>
        )}
        {!withoutLogo && (
          <Box>
            <Link href="/">
              <LogoWithText h={{ base: '10', md: '12' }} />
            </Link>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default HeaderClean;
