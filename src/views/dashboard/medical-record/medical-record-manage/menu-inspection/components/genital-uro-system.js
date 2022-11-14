import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import colors from "values/colors"
import InputUnderlined from "components/input/InputUnderlined";
import { medicalRecordID, siteMode } from "utils/constant";
import InputRadio, { radioType } from "components/input/InputRadio";
import { useState } from "react";
import stateInputMR from "states/stateInputMedicalRecord";
import { useSnapshot } from "valtio";

export const inputList = [
  {
    key: medicalRecordID.polaRutin,
    label: "Pola rutin",
    state: "patternRoutine",
    type: "number",
    hotfix: "x/hari",
    placeholder: 'Pola'
  },
  {
    key: medicalRecordID.polaRutin + "-1",
    label: "",
    state: "patternRoutine1",
    type: "options",
    options: ["Carries", "Tidak"]
  },
  {
    key: medicalRecordID.jumlahCC,
    label: "Jumlah",
    state: "count",
    type: "number",
    hotfix: "cc/24jam"
  },
  {
    key: medicalRecordID.warna,
    label: "Warna",
    state: "color",
    type: "options",
    options: ["Kuning jerni", "Kuning kecoklatan", "Merah", "Putih"]
  },
  {
    key: medicalRecordID.uroLainnya,
    label: "lainnya",
    state: "other",
    type: "text",
    hotfix: "",
    placeholder: 'Isi jika ada'
  },
]

const GenitalUroSystem = ({ mode }) => {
  const [mrData, setMRData] = useState({})
  const { generalAssesment } = useSnapshot(stateInputMR)

  const onChange = (e) => {
    var _mrData = mrData
    _mrData[e.target.id] = e.target.value
    stateInputMR.generalAssesment.uroGenitalSystem[e.target.attributes[0].value] = e.target.value
    console.log(generalAssesment.uroGenitalSystem)
    setMRData(_mrData);
  }
  return (
    <Stack px={40} py={5}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} >Sistem uro genital</Box>
      <Box fontSize={'18px'} fontWeight={'bold'} color={'#505050'} pl={'20px'} pb={'12px'}>
        <ul>
          <li>BAK</li>
        </ul>
      </Box>
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
                  value={stateInputMR.generalAssesment.uroGenitalSystem[input.state]}
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
                        value={stateInputMR.generalAssesment.uroGenitalSystem[input.state]}
                        onChange={onChange}
                        type={input.type}
                        w={'100%'}
                        readOnly={mode === siteMode.detail}
                        placeholder={input.placeholder}
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

export default GenitalUroSystem