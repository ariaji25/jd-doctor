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
    key: medicalRecordID.turgorKulit,
    label: "Turgor Kulit",
    state: "skinTurgor",
    type: "options",
    options: ["Elasti", "Sedang", "Buruk"]
  },
  {
    key: medicalRecordID.warnaKulit,
    label: "Warna Kulit",
    state: "skinColor",
    type: "options",
    options: ["Pucat", "Sianosis", "Kemerahan"]
  },
  {
    key: medicalRecordID.kontraktur,
    label: "Kontraktur pada persendian ekstremitas",
    state: "contructor",
    type: "options",
    options: ["Ya", "Tidak"]
  },
  {
    key: medicalRecordID.kesulitanDalamPergerakan,
    label: "Kesulitan dalam pergerakan",
    state: "movementDificulity",
    type: "options",
    options: ["Ya", "Tidak"]
  },
  {
    key: medicalRecordID.intugmentLainnya,
    label: "lainnya",
    state: "other",
    type: "text",
  },
]

const Integumentary = ({mode}) => {
  const [mrData, setMRData] = useState({})
  const { generalAssesment } = useSnapshot(stateInputMR)

  const onChange = (e) => {
    var _mrData = mrData
    _mrData[e.target.id] = e.target.value
    stateInputMR.generalAssesment.intugmenSystem[e.target.attributes[0].value] = e.target.value
    console.log(generalAssesment.intugmenSystem)
    setMRData(_mrData);
  }
  return (
    <Stack px={40} py={5}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Sistem integumen/muskuloskeletal</Box>
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
                  value={stateInputMR.generalAssesment.intugmenSystem[input.state]}
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
                        value={stateInputMR.generalAssesment.intugmenSystem[input.state]}
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
    </Stack>
  )
}

export default Integumentary