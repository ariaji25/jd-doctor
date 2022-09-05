import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import colors from "values/colors"
import InputUnderlined from "components/input/InputUnderlined";

const HeartCirculation = () => {
  return (
    <Stack px={40} py={5}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Sirkulasi jantung</Box>
      <Flex alignItems={'end'}>
        <Box flex={1}>Kecepatan denyut apical</Box>
        <Box flex={1}>
          <Flex>
            <InputUnderlined
              type='text'
              w={'100%'}
            />
            <Flex whiteSpace={'pre'} borderBottom={'1px solid #ccc'} color={colors.PRIMARY} alignItems={'center'}>
              <Box>
                X/Menit
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Irama</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4} flexWrap={'wrap'}>
              <Radio>Teratur</Radio>
              <Radio>Tidak teratur</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Kelainan bunyi jantung</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4} flexWrap={'wrap'}>
              <Radio>Murmur</Radio>
              <Radio>Gallop</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Sakit dada</Box>
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
        <Box flex={1}>Timbul</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4}>
              <Radio>Saat beraktifitas</Radio>
              <Radio>Tanpa aktifitas</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Karakter</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4} flexWrap={'wrap'}>
              <Radio>Seperti ditusuk-tusuk</Radio>
              <Radio>Seperti terbakar</Radio>
              <Radio>Seperti tertimpa benda berat</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
    </Stack>
  )
}

export default HeartCirculation