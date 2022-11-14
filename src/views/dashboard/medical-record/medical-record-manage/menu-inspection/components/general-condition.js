import { Box, Flex } from "@chakra-ui/react"
import InputUnderlined from "components/input/InputUnderlined";
import { useCallback, useState } from "react";
import stateInputMR from "states/stateInputMedicalRecord";
import { layananList, medicalRecordID, siteMode } from "utils/constant";
import { useSnapshot } from "valtio";

export const inputList = [
  [
    {
      key: medicalRecordID.keadaanUmum,
      label: "Keadaan Umum",
      state: "condition",
      type: "text",
      placeholder: "Keadaan umum pasien"
    },
    {
      key: medicalRecordID.kesadaraan,
      label: "Kesadaraan",
      state: "awareness",
      type: "text",
      placeholder: 'Keadaan pasien'
    },
  ],
  [
    {
      key: medicalRecordID.teknanDarah,
      label: "Tekanan Darah",
      state: "bloodPresure",
      type: "text",
      placeholder: "Tekanan darah"
    },
    {
      key: medicalRecordID.nadi,
      label: "Nadi (x/menit)",
      state: "pulse",
      type: "number",
      placeholder: 'Keadaan nadi'
    }
  ],
  [
    {
      key: medicalRecordID.respirasi,
      label: "Respirasi (x/menit)",
      state: "respiration",
      type: "text",
      placeholder: 'Respirasi pasien'

    },
    {
      key: medicalRecordID.suhu,
      label: "Suhu (°C)",
      state: "bodyTemperature",
      type: "number",
      placeholder: 'Suhu tubuh pasien'
    },
  ],
  [
    {
      key: medicalRecordID.beratBadan,
      label: "Berat Badan (kg)",
      state: "bodyWeight",
      type: "number",
      placeholder: 'Berat badan pasien'
    },
    {
      key: medicalRecordID.tinggiBadan,
      label: "Tinggi Badan (cm)",
      state: "bodyHeight",
      type: "number",
      placeholder: 'Tinggi badan pasien'
    },
  ]
]

const GeneralCondition = ({ mode }) => {
  const [conditions, setConditions] = useState({})
  const { generalAssesment } = useSnapshot(stateInputMR)

  const onChange = (e) => {
    var _conditions = conditions
    _conditions[e.target.id] = e.target.value
    stateInputMR.generalAssesment.generalCondition[e.target.attributes[0].value] = e.target.value
    console.log(generalAssesment.generalCondition)
    setConditions(_conditions);
  }

  return (
    <Box px={40} py={5} >
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Pemeriksaan fisik</Box>
      {inputList.map(inputs => {
        return <Flex gap={8} py={2}>
          {
            inputs.map(input => {
              console.log("Ass condition", generalAssesment.generalCondition[input.state])
              return <Box flex={1}>
                <InputUnderlined
                  label={input.label}
                  type={input.type}
                  id={input.key}
                  uid={input.state}
                  onChange={onChange}
                  validator={(e) => { }}
                  value={generalAssesment.generalCondition[input.state]}
                  readOnly={mode === siteMode.detail ? true : false}
                  placeholder={input.placeholder}
                // value={username}
                />
              </Box>
            }
            )
          }
        </Flex>
      })
      }

    </Box>
  )
}

export default GeneralCondition