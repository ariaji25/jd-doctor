import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import colors from "values/colors"
import InputUnderlined from "components/input/InputUnderlined";
import InputRadio, { radioType } from "components/input/InputRadio";
import { medicalRecordID, siteMode } from "utils/constant";
import { useState } from "react";
import { useSnapshot } from "valtio";
import stateInputMR from "states/stateInputMedicalRecord";

export const inputList = [
  {
    key: medicalRecordID.kecepatanDenyutApical,
    label: "Kecepatan denyut apical",
    state: "pulseSpeed",
    type: "number"
  },
  {
    key: medicalRecordID.iramaJantung,
    label: "Irama",
    state: "pulseRhytm",
    type: "options",
    options: ["Teratur", "Tidak teratur"]
  },
  {
    key: medicalRecordID.kelainanBunyiJantung,
    label: "Kelainan bunyi jantung",
    state: "abnormalHearthSound",
    type: "options",
    options: ["Murmur", "Gallop"]
  },
  {
    key: medicalRecordID.sakitData,
    label: "Sakit data",
    state: "chestPain",
    type: "options",
    options: ["Ya", "Tidak"]
  },
  {

    key: medicalRecordID.timbul,
    label: "Timbul",
    state: "shown",
    type: "options",
    options: ["Saat beraktifitas", "Tanpa aktifitas"]
  },
  {
    key: medicalRecordID.karakter,
    label: "Karakter",
    state: "character",
    type: "options",
    options: ["Seperti ditusuk-tusuk", "Seperti terbakar", "Seperti tertimpa benda berat"]
  }
]

const HeartCirculation = ({ mode }) => {
  const [mrData, setMRData] = useState({})
  const { generalAssesment } = useSnapshot(stateInputMR)

  const onChange = (e) => {
    var _mrData = mrData
    _mrData[e.target.id] = e.target.value
    stateInputMR.generalAssesment.hearthCirculation[e.target.attributes[0].value] = e.target.value
    console.log(generalAssesment.hearthCirculation)
    setMRData(_mrData);
  }
  return (
    <Stack px={40} py={5}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Sirkulasi jantung</Box>
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
                  value={stateInputMR.generalAssesment.hearthCirculation[input.state]}
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
                        onChange={onChange}
                        value={stateInputMR.generalAssesment.hearthCirculation[input.state]}
                        type={input.type}
                        w={'100%'}
                        readOnly={mode === siteMode.detail}
                      />
                      <Flex whiteSpace={'pre'} borderBottom={'1px solid #ccc'} color={colors.PRIMARY} alignItems={'center'}>
                        <Box>
                          X/Menit
                        </Box>
                      </Flex>
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

export default HeartCirculation