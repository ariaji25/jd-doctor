import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import InputUnderlined from "components/input/InputUnderlined";

const DigestiveSystem = () => {
  return (
    <Stack px={40} py={5}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} >Sistem pencernaan</Box>
      <Box fontSize={'18px'} fontWeight={'bold'} color={'#505050'} pl={'20px'} pb={'12px'}>Keadaan mulut</Box>
      <Flex>
        <Box flex={1}>Gigi</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4} flexWrap={'wrap'}>
              <Radio>Carries</Radio>
              <Radio>Tidak</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Memakai gigi palsu</Box>
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

export default DigestiveSystem