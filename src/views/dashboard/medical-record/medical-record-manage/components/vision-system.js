import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import colors from "values/colors"
import { useSnapshot } from 'valtio';
import stateMedicalRecord from "states/stateMedicalRecord";
import InputUnderlined from "components/input/InputUnderlined";
import ButtonMain from "components/button/ButtonMain";

const VisionSystem = () => {
  return (
    <Stack px={40} py={5}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Sistem pengelihatan</Box>
      <Flex>
        <Box flex={4}>Posisi mata</Box>
        <Box flex={4}>
          <RadioGroup>
            <Flex gap={4}>
              <Radio>Simetris</Radio>
              <Radio>Asimetris</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Kelopak mata</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4}>
              <Radio>Normal</Radio>
              <Radio>Ptosis</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Gerakan mata</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4}>
              <Radio>Normal</Radio>
              <Radio>Abnormal</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Pergerakan bola mata</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4}>
              <Radio>Normal</Radio>
              <Radio>Abnormal</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Konjungtiva</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4} flexWrap={'wrap'}>
              <Radio>Normal/merah</Radio>
              <Radio>Anemis</Radio>
              <Radio>Sangan merah</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Kornea</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4} flexWrap={'wrap'}>
              <Radio>Normal</Radio>
              <Radio>Keruh berkabut</Radio>
              <Radio>Terdapat perdarahan</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
      <Flex>
        <Box flex={1}>Sklera</Box>
        <Box flex={1}>
          <RadioGroup>
            <Flex gap={4}>
              <Radio>Ikterik</Radio>
              <Radio>Anikterik</Radio>
            </Flex>
          </RadioGroup>
        </Box>
      </Flex>
    </Stack>
  )
}

export default VisionSystem