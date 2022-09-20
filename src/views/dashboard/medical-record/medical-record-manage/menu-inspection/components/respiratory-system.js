import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import InputRadio, { radioType } from "components/input/InputRadio";
import InputUnderlined from "components/input/InputUnderlined";
import { useState } from "react";
import stateInputMR from "states/stateInputMedicalRecord";
import { medicalRecordID } from "utils/constant";
import { useSnapshot } from "valtio";

export const inputList = [
  {
    key: medicalRecordID.jalanNafas,
    label: "Jalan Nafas",
    state: "airway",
    type: "options",
    options: ["Bersih", "Sumbatan", "Sputum", "Lendir", "Darah", "Lidah"]
  },
  {
    key: medicalRecordID.pernafasan,
    label: "Pernafasan",
    state: "breath",
    type: "options",
    options: ["Sesak", "Tidak sesak", "Dengan aktifitas", "Tanpa aktifitas"]
  },
  {
    key: medicalRecordID.suaraNafas,
    label: "Suaran Nafas",
    state: "breathSound",
    type: "options",
    options: ["Vesikuler/Norma", "Bronkovesikuler", "Ronkhi", "Wheezing"]
  },
  {
    key: medicalRecordID.ototPernafasn,
    label: "Menggunakan otot-otot bantu pernafasan",
    state: "breathWithMuscel",
    type: "options",
    options: ["Ya", "Tidak"]
  }
]

const RespiratorySystem = () => {

  const [respirationData, setrespirationData] = useState({})
  const { generalAssesment } = useSnapshot(stateInputMR)

  const onChange = (e) => {
    var _respirationData = respirationData
    _respirationData[e.target.id] = e.target.value
    stateInputMR.generalAssesment.respirationSystem[e.target.attributes[0].value] = e.target.value
    console.log(generalAssesment.respirationSystem)
    setrespirationData(_respirationData);
  } 

  return (
    <Stack px={40} py={5}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Sistem pernafasan</Box>
      {
        inputList.map(input => {
          return <>
            <InputRadio
              radioStyle={radioType.horizontal}
              id={input.key}
              label={input.label}
              name={input.label}
              uid={input.state}
              onChange={onChange}
              value={stateInputMR.generalAssesment.respirationSystem[input.state]}
              options={input.options}
            />
          </>
        })
      }
    </Stack>
  )
}

export default RespiratorySystem