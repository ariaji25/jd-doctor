import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import InputUnderlined from "components/input/InputUnderlined";

const ChestAndAxilla = () => {
  return (
    <Stack px={40} py={5}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Dada dan axilla</Box>
      <Flex>
        <Box flex={1}>Mammae  (membesar)</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4} flexWrap={'wrap'}>
              <Radio>Ya</Radio>
              <Radio>Tidak</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex alignItems={'end'}>
        <Box flex={1}>Areolla mammae</Box>
        <Box flex={1}>
          <InputUnderlined
            type='text'
          />
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Papila mammae</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4} flexWrap={'wrap'}>
              <Radio>Menonjol</Radio>
              <Radio>Datar</Radio>
              <Radio>Kedalam</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Colostrum (keluar)</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4} flexWrap={'wrap'}>
              <Radio>Ya</Radio>
              <Radio>Belum</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
    </Stack>
  )
}

export default ChestAndAxilla