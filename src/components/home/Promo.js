
import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';
import colors from 'values/colors';

function Promo() {
  return (
    <Center mb="16" px={{ base: '0', md: '4' }}>
      <Box maxW="5xl" position="relative">
        <Box>
          <Text
            color={colors.PRIMARY}
            mb="1"
            textAlign="center"
            fontSize={{ base: '24', sm: '36px' }}
            fontWeight="bold"
          >
            Promo dan penawaran
          </Text>
          <Text
            color={colors.HITAM_PUDAR}
            textAlign="center"
            fontSize={{ base: '12', sm: '16px' }}
            fontWeight="medium"
            mb="8"
          >
            Kami memberikan penawaran terbaik buat kamu
          </Text>
        </Box>
        <Flex
          w="full"
          flexDir={{ base: 'column', md: 'row' }}
          borderRadius="10px"
        >
          <Image src='/img/promo.png' />
        </Flex>
      </Box>
    </Center>
  );
}

export default Promo;
