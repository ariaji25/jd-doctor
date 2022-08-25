import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';
import TextMedium from 'components/text/TextMedium';
import TextSmall from 'components/text/TextSmall';
import colors from 'values/colors';
import contact from 'values/contact';

const Alamat = () => {
  return (
    <>
      <Center>
        <Box
          bg="rgba(30, 56, 105, 0.1)"
          boxSizing='border-box'
          borderRadius='15px'
          color={colors.PRIMARY}
          p='6'
          w={[300, 500, 700, 900, 1100]}
          mx="auto"
          maxW='full'>
          <Flex justifyContent='start' wrap='wrap'>
            <Image alt="" src="/icon/map-pin.svg" mb='4' w={['32px', '48px']} />
            <Box w="3xl" ml='2'>
              <TextMedium fontWeight='bold'>Alamat praktek dokter umum</TextMedium>
              <TextSmall
                mt='2'
                color={colors.PRIMARY}>
                {contact.ALAMAT}
              </TextSmall>
              <Text color={colors.PRIMARY}></Text>
            </Box>
          </Flex>
        </Box>
      </Center>
    </>
  );
};

export default Alamat;
