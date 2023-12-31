import { Box, Flex, Stack, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react"
import InputUnderlined from "components/input/InputUnderlined";
import ButtonMain from "components/button/ButtonMain";
import { FiPlusCircle, FiTrash } from "react-icons/fi";
import EmptyComponent from "components/EmptyComponent";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import colors from "values/colors";
import { useCallback, useEffect, useState } from "react";
import apiDoctor from "services/apiDoctor";
import { s4 } from "utils";
import stateInputMR from "states/stateInputMedicalRecord";
import { useSnapshot } from "valtio";
import apiMedicalrecord from "services/apiMedicalRecord";
import { siteMode } from "utils/constant";

const DiagnoseComponent = ({ mode }) => {

  const [diagnosisSearch, setDiagnosisSearch] = useState([])

  const { diagnosis } = useSnapshot(stateInputMR)

  const [selectedDiagnosis, setSelectedDiagnosis] = useState({})

  const [diagnosisList, setDiagnosisList] = useState([])

  const getDiagnosisSearch = (search) => {
    console.log(search)
    if (search && search.length >= 3) apiDoctor.searchDiagnosis(search).then(d => {
      setDiagnosisSearch(d.data)
    })
  }

  const onItemSelected = (e) => {
    setSelectedDiagnosis({ ...selectedDiagnosis, diagnosisCode: e })
  }

  const onDiagnosisNoteChange = (e) => {
    setSelectedDiagnosis({ ...selectedDiagnosis, diagnosisNote: e.target.value })
  }

  const onButtonAddClicked = () => {
    // Add id needed to remove the item
    if (!diagnosisList || (diagnosisList && diagnosisList.length < 6)) {
      setSelectedDiagnosis({ ...selectedDiagnosis, id: s4(), saved: false })
      setDiagnosisList(current => [...diagnosisList, selectedDiagnosis])
      stateInputMR.diagnosis = [...stateInputMR.diagnosis, selectedDiagnosis]
    }
  }

  const onDeleteDiagnosis = (id, isSaved) => {
    console.log("DELETE", isSaved)
    setDiagnosisList(current => current.filter(c => c.id !== id))
    stateInputMR.diagnosis = stateInputMR.diagnosis.filter(c => c.id !== id)
  }
  useEffect(() => {
    console.log("INIT DIagnosis 1", diagnosis)
    console.log("INIT is ", (diagnosis.length))
    if (diagnosis && diagnosis.length > 0) setDiagnosisList(current => [...diagnosis])
  }, [])

  return (
    <Stack px={24} py={5} gap={3}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Diagnosis</Box>
      {
        mode === siteMode.detail
          ? <></>
          : <Flex alignItems={'end'}>
            <Box flex={1}>Coding diagnosis</Box>
            <Box flex={1}>
              <AutoComplete openOnFocus onChange={onItemSelected}>
                <AutoCompleteInput
                  variant="filled"
                  placeholder="Diagnosis"
                  borderBottom={'1.5px solid #e0e0e0'}
                  bg={'transparent'}
                  marginStart={0}
                  marginInlineStart={0}
                  marginEnd={0}
                  marginInlineEnd={0}
                  paddingLeft={0}
                  fontSize={{ base: 'sm', sm: 'md' }}
                  color={colors.PRIMARY}
                  fontWeight="bold"
                  border="0"
                  _hover={{ background: 'transparent' }}
                  onChange={(e) => getDiagnosisSearch(e.target.value)}
                  rounded="none"
                  h="35px" />
                <AutoCompleteList>
                  {diagnosisSearch.map((diagnosis, cid) => (
                    <AutoCompleteItem
                      key={`option-${cid}`}
                      value={`${diagnosis.name}-${diagnosis.description}`}
                      textTransform="capitalize"
                    >
                      {diagnosis.name}-{diagnosis.description}
                    </AutoCompleteItem>
                  ))}
                </AutoCompleteList>
              </AutoComplete>
            </Box>
          </Flex>
      }
      {
        mode === siteMode.detail
          ? <></>
          : <Flex alignItems={'end'}>
            <Box flex={1}>Keterangan</Box>
            <Box flex={1}>
              <InputUnderlined
                type='text'
                placeholder='Keterangan'
                onChange={onDiagnosisNoteChange}
              />
            </Box>
          </Flex>
      }
      {
        mode === siteMode.detail
          ? <></>
          : (diagnosisList && diagnosisList.length === 6) ? <Text color={"Red"}>Input diagnosis hanya bisa 1 diagnosis primer dan 5 diagnosis sekunder</Text> : <></>
      }
      {
        mode === siteMode.detail
          ? <></>
          : <Flex justifyContent={'end'} pt={2}>
            <ButtonMain onClick={onButtonAddClicked} ><FiPlusCircle /> Tambahkan diagnosis</ButtonMain>
          </Flex>
      }
      <Box paddingTop={'10px'} display={'grid'}>
        <TableContainer height='inherit'>
          <Table colorScheme={'gray'}>
            <Thead color={'#484964'}>
              <Tr bg={'#F9F9FC'} fontWeight={'bold'}>
                <Td>Coding diagnosis</Td>
                <Td>Keterangan</Td>
                <Td></Td>
              </Tr>
            </Thead>
            <Tbody w={'100%'}>
              {diagnosisList.length > 0 ? diagnosisList.map((r, i) => (
                <Tr key={i} bg={'#F9F9FC'}>
                  <Td>{r.diagnosisCode}</Td>
                  <Td>{r.diagnosisNote}</Td>
                  {
                    mode === siteMode.detail
                      ? <></>
                      : <Td><FiTrash color="red" onClick={(e) => onDeleteDiagnosis(r.id, r.saved)} /></Td>
                  }
                </Tr>
              ))
                :
                <Tr>
                  <Td colSpan={3} border={'none'}>
                    <EmptyComponent
                      caption={<Stack gap={3} textAlign={'center'}>
                        <Text>Belum ada diagnosis</Text>
                        <Text fontWeight={'bold'}>Diagnosis akan muncul disini<br />setelah “Tambahkan diagnosis”</Text>
                      </Stack>}
                    />
                  </Td>
                </Tr>
              }
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  )
}

export default DiagnoseComponent
