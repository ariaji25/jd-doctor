import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import InputUnderlined from "components/input/InputUnderlined";

const Integumentary = () => {
  return (
    <Stack px={40} py={5}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Sistem integumen/muskuloskeletal</Box>
      <Flex>
        <Box flex={1}>Turgor kulit</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4} flexWrap={'wrap'}>
              <Radio>Elastis</Radio>
              <Radio>Sedang</Radio>
              <Radio>Buruk</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Warna kulit</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4} flexWrap={'wrap'}>
              <Radio>Pucat</Radio>
              <Radio>Sianosis</Radio>
              <Radio>Kemerahan</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Kontraktur pada persendian ekstremitas</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4} flexWrap={'wrap'}>
              <Radio>Ya</Radio>
              <Radio>Tidak</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Kesulitan dalam pergerakan</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4}>
              <Radio>Ya</Radio>
              <Radio>Tidak</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex alignItems={'end'}>
        <Box flex={1}>Lainnya</Box>
        <Box flex={1}>
          <InputUnderlined
            type='text'
            placeholder={'Isi jika ada'}
          />
        </Box>
      </Flex>
    </Stack>
  )
}

export default Integumentary