import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import colors from "values/colors"
import { useSnapshot } from 'valtio';
import stateMedicalRecord from "states/stateMedicalRecord";
import InputUnderlined from "components/input/InputUnderlined";
import ButtonMain from "components/button/ButtonMain";

const RespiratorySystem = () => {
  return (
    <Stack px={40} py={5}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Sistem pernafasan</Box>
      <Flex>
        <Box flex={1}>Jalan nafas</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4} flexWrap={'wrap'}>
              <Radio>Bersih</Radio>
              <Radio>Sumbatan</Radio>
              <Radio>Sputum</Radio>
              <Radio>Lendir</Radio>
              <Radio>Darah</Radio>
              <Radio>Lidah</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Pernafasan</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4} flexWrap={'wrap'}>
              <Radio>Sesak</Radio>
              <Radio>Tidak sesak</Radio>
              <Radio>Dengan aktifitas</Radio>
              <Radio>Tanpa aktifitas</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Suara nafas</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4} flexWrap={'wrap'}>
              <Radio>Vesikuler/Normal</Radio>
              <Radio>Bronkovesikuler</Radio>
              <Radio>Ronkhi</Radio>
              <Radio>Wheezing</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Menggunakan otot-otot bantu pernafasan</Box>
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

export default RespiratorySystem