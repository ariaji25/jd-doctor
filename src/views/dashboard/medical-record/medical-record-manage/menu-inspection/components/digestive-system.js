import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import InputRadio, { radioType } from "components/input/InputRadio";
import InputUnderlined from "components/input/InputUnderlined";
import { useState } from "react";
import stateInputMR from "states/stateInputMedicalRecord";
import { medicalRecordID } from "utils/constant";
import { useSnapshot } from "valtio";

export const inputList = [
  {
    key: medicalRecordID.gigi,
    label: "Gigi",
    state: "tooth",
    type: "options",
    options: ["Carries", "Tidak"]
  },
  {
    key: medicalRecordID.gigiPalsu,
    label: "Memakai gigi palsu",
    state: "isFakeTooth",
    type: "options",
    options: ["Ya", "Tidak"]
  },
  {
    key: medicalRecordID.sakitData,
    label: "Sakit Data",
    state: "chestPain",
    type: "options",
    options: ["Ya", "Tidak"]
  },
  {
    key: medicalRecordID.keadaanMulutLainnya,
    label: "Lainnya",
    state: "other",
    type: "text"
  }
]

const DigestiveSystem = () => {
  const [mrData, setMRData] = useState({})
  const { generalAssesment } = useSnapshot(stateInputMR)

  const onChange = (e) => {
    var _mrData = mrData
    _mrData[e.target.id] = e.target.value
    stateInputMR.generalAssesment.digestionSystem[e.target.attributes[0].value] = e.target.value
    console.log(generalAssesment.digestionSystem)
    setMRData(_mrData);
  }
  return (
    <Stack px={40} py={5}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} >Sistem pencernaan</Box>
      <Box fontSize={'18px'} fontWeight={'bold'} color={'#505050'} pl={'20px'} pb={'12px'}>Keadaan mulut</Box>
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
                  uid={input.state}
                  onChange={onChange}
                  value={stateInputMR.generalAssesment.digestionSystem[input.state]}
                  options={input.options}
                />
                : <Flex alignItems={'end'}>
                  <Box flex={1}>{input.label}</Box>
                  <Box flex={1}>
                    <Flex>
                      <InputUnderlined
                        id={input.key}
                        uid={input.state}
                        onChange={onChange}
                        value={stateInputMR.generalAssesment.digestionSystem[input.state]}
                        type={input.type}
                        w={'100%'}
                      />
                    </Flex>
                  </Box>
                </Flex>
            }
          </>
        })
      }
    </Stack>
  )
}

export default DigestiveSystem