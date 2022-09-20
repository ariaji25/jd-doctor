import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import InputRadio, { radioType } from "components/input/InputRadio"
import { useState } from "react"
import stateInputMR from "states/stateInputMedicalRecord"
import { medicalRecordID } from "utils/constant"
import { useSnapshot } from "valtio"

export const inputList = [
  {
    key: medicalRecordID.posisiMata,
    label: "Posisi Mata",
    state: "eyesPosition",
    type: "options",
    options: ["Simetris", "Asimetris"]
  },
  {
    key: medicalRecordID.kelopakMata,
    label: "Kelopak Mata",
    state: "eyelid",
    type: "options",
    options: ["Normal", "Ptosis"]
  },
  {
    key: medicalRecordID.gerakanMata,
    label: "Gerakan Mata",
    state: "eyeMovement",
    type: "options",
    options: ["Normal", "Abnormal"]
  },
  {
    key: medicalRecordID.gerakBolaMata,
    label: "Pergerakan Bola Mata",
    state: "eyeBoalMovement",
    type: "options",
    options: ["Normal", "Abnormal"]
  },
  {
    key: medicalRecordID.konjungtiva,
    label: "Konjungtiva",
    state: "conjungtiva",
    type: "options",
    options: ["Normal/Merah", "Anemis", "Sangat Merah"]
  },
  {
    key: medicalRecordID.kornea,
    label: "Kornea",
    state: "cornea",
    type: "options",
    options: ["Normal", "Keruh Berkabu", "Terdapat pendarahan"]
  },
  {
    key: medicalRecordID.sklera,
    label: "Sklera",
    state: "sklera",
    type: "options",
    options: ["Ikterik", "Anikterik"]
  }
]

const VisionSystem = () => {
  const [visionSystem, setVisionSystem] = useState({})
  const { generalAssesment } = useSnapshot(stateInputMR)

  const onChange = (e) => {
    var _visionSystem = visionSystem
    _visionSystem[e.target.id] = e.target.value
    stateInputMR.generalAssesment.visualSystem[e.target.attributes[0].value] = e.target.value
    console.log(generalAssesment.visualSystem)
    setVisionSystem(_visionSystem);
  }
  return (
    <Stack px={40} py={5}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Sistem pengelihatan</Box>
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
              value={stateInputMR.generalAssesment.visualSystem[input.state]}
              options={input.options}
            />
          </>
        })
      }
    </Stack>
  )
}

export default VisionSystem