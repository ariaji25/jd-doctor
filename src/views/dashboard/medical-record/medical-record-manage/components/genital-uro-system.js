import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import colors from "values/colors"
import { useSnapshot } from 'valtio';
import stateMedicalRecord from "states/stateMedicalRecord";
import InputUnderlined from "components/input/InputUnderlined";
import ButtonMain from "components/button/ButtonMain";

const GenitalUroSystem = () => {
  return (
    <Stack px={40} py={5}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} >Sistem uro genital</Box>
      <Box fontSize={'18px'} fontWeight={'bold'} color={'#505050'} pl={'20px'} pb={'12px'}>
        <ul>
          <li>BAK</li>
        </ul>
      </Box>
      <Flex >
        <Box flex={1} pt={2}>Pola rutin</Box>
        <Box flex={1} flexWrap={'wrap'}>
          <Box >
            <Flex>
              <InputUnderlined
                type='text'
                w={'100%'}
              />
              <Flex whiteSpace={'pre'} borderBottom={'1px solid #ccc'} color={colors.PRIMARY} alignItems={'center'}>
                <Box>
                  X/Hari
                </Box>
              </Flex>
            </Flex>
          </Box>
          <RadioGroup pt={2}>
            <Flex gap={4} flexWrap={'wrap'}>
              <Radio>Carries</Radio>
              <Radio>Tidak</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex alignItems={'end'}>
        <Box flex={1}>Jumlah</Box>
        <Box flex={1}>
          <Flex>
            <InputUnderlined
              type='text'
              w={'100%'}
            />
            <Flex whiteSpace={'pre'} borderBottom={'1px solid #ccc'} color={colors.PRIMARY} alignItems={'center'}>
              <Box>
                cc/24 Jam
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Warna</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4} flexWrap={'wrap'}>
              <Radio>Kuning jernih</Radio>
              <Radio>Kuning kecoklatan</Radio>
              <Radio>Merah</Radio>
              <Radio>Putih</Radio>
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

export default GenitalUroSystem