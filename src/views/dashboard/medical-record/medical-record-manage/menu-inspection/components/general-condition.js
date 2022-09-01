import { Box, Flex } from "@chakra-ui/react"
import InputUnderlined from "components/input/InputUnderlined";

const GeneralCondition = () => {
  return (
    <Box px={40} py={5} >
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Pemeriksaan fisik</Box>
      <Flex gap={8} py={2}>
        <Box flex={1}>
          <InputUnderlined
            label='Keadaan umum'
            type="text"
          // onChange={onChangeUsername}
          // value={username}
          />
        </Box>
        <Box flex={1}>
          <InputUnderlined
            label='Kesadaran'
            type="text"
          />
        </Box>
      </Flex>
      <Flex gap={8} py={2}>
        <Box flex={1}>
          <InputUnderlined
            label='Tekanan darah'
            type="text"
          />
        </Box>
        <Box flex={1}>
          <InputUnderlined
            label='Nadi (X/Menit)'
            type="text"
          />
        </Box>
      </Flex>
      <Flex gap={8} py={2}>
        <Box flex={1}>
          <InputUnderlined
            label='Respirasi'
            type="text"
          />
        </Box>
        <Box flex={1}>
          <InputUnderlined
            label='Suhu (X/Menit)'
            type="text"
          />
        </Box>
      </Flex>
      <Flex gap={8} py={2}>
        <Box flex={1}>
          <InputUnderlined
            label='Berat badan (KG)'
            type="text"
          />
        </Box>
        <Box flex={1}>
          <InputUnderlined
            label='Tinggi badan (CM)'
            type="text"
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default GeneralCondition