import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import InputRadio, { radioType } from "components/input/InputRadio";
import InputUnderlined from "components/input/InputUnderlined";
import { useState } from "react";
import stateInputMR from "states/stateInputMedicalRecord";
import { medicalRecordID, siteMode } from "utils/constant";
import { useSnapshot } from "valtio";
import colors from "values/colors";


export const inputList = [
  {
    key: medicalRecordID.mammae,
    label: "Mammae (membesar)",
    state: "mammae",
    type: "options",
    options: ["Ya", "Tidak"]
  },
  {
    key: medicalRecordID.areolla,
    label: "Areolla Mammae",
    state: "mammeAreolla",
    type: "text",
  },
  {
    key: medicalRecordID.papila,
    label: "Papila Mammae",
    state: "mammaePapila",
    type: "options",
    options: ["Menonjol", "Datar", "Kedalam"]
  },
  {
    key: medicalRecordID.colostrum,
    label: "Kolostrum (keluar",
    state: "colostrum",
    type: "options",
    options: ["Ya", "Belum"]
  },
]

const ChestAndAxilla = ({ mode }) => {
  const [mrData, setMRData] = useState({})
  const { generalAssesment } = useSnapshot(stateInputMR)

  const onChange = (e) => {
    var _mrData = mrData
    _mrData[e.target.id] = e.target.value
    stateInputMR.generalAssesment.chestAndAxila[e.target.attributes[0].value] = e.target.value
    console.log(generalAssesment.chestAndAxila)
    setMRData(_mrData);
  }
  return (
    <Stack px={40} py={5}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Dada dan axilla</Box>
      {
        inputList.map(input => {
          return <>
            {
              input.type === "options"
                ?
                <InputRadio
                  radioStyle={radioType.horizontal}
                  id={input.key}
                  label={input.label}
                  name={input.label}
                  value={stateInputMR.generalAssesment.chestAndAxila[input.state]}
                  uid={input.state}
                  onChange={onChange}
                  options={input.options}
                  readOnly={mode === siteMode.detail}
                />
                : <Flex alignItems={'end'}>
                  <Box flex={1}>{input.label}</Box>
                  <Box flex={1}>
                    <Flex>
                      <InputUnderlined
                        id={input.key}
                        uid={input.state}
                        value={stateInputMR.generalAssesment.chestAndAxila[input.state]}
                        onChange={onChange}
                        type={input.type}
                        w={'100%'}
                        readOnly={mode === siteMode.detail}
                      />
                      <Flex whiteSpace={'pre'} borderBottom={'1px solid #ccc'} color={colors.PRIMARY} alignItems={'center'}>
                        <Box>
                          {input.hotfix ?? ""}
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
            }
          </>
        })
      }
      {/* <Flex>
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
      </Flex> */}
    </Stack>
  )
}

export default ChestAndAxilla