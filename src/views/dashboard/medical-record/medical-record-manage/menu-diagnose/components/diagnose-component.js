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

const countries = [
  "nigeria",
  "japan",
  "india",
  "united states",
  "south korea",
];
const DiagnoseComponent = () => {
  const [diagnosisSearch, setDiagnosisSearch] = useState([])

  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null)

  const getDiagnosisSearch = (search) => {
    console.log(search)
    if (search && search.length >= 3) apiDoctor.searchDiagnosis(search).then(d => {
      setDiagnosisSearch(d.data)
    })
  }
  // const init = useCallback(() => {

  // }, [])

  // useEffect(() => {
  //   init();
  // }, [init])
  return (
    <Stack px={24} py={5} gap={3}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Diagnosis</Box>
      <Flex alignItems={'end'}>
        <Box flex={1}>Coding diagnosis</Box>
        <Box flex={1}>
          <AutoComplete openOnFocus>
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
                  value={diagnosis.name}
                  textTransform="capitalize"
                >
                  {diagnosis.name}-{diagnosis.description}
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </AutoComplete>
        </Box>
      </Flex>
      <Flex alignItems={'end'}>
        <Box flex={1}>Keterangan</Box>
        <Box flex={1}>
          <InputUnderlined
            type='text'
            placeholder='Keterangan'
          />
        </Box>
      </Flex>
      <Flex justifyContent={'end'} pt={2}>
        <ButtonMain><FiPlusCircle /> Tambahkan diagnosis</ButtonMain>
      </Flex>
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
              {listDiagnose.length > 0 ? listDiagnose.map((r, i) => (
                <Tr key={i} bg={'#F9F9FC'}>
                  <Td>{r.diagnose}</Td>
                  <Td>{r.ket}</Td>
                  <Td><FiTrash color="red" /></Td>
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

const listDiagnoses = []
const listDiagnose = [
  {
    id: 1,
    diagnose: 'AA12',
    ket: 'Sakit hati'
  },
  {
    id: 2,
    diagnose: 'AA12',
    ket: 'Sakit hati'
  },
  {
    id: 3,
    diagnose: 'AA12',
    ket: 'Sakit hati'
  },
  {
    id: 3,
    diagnose: 'AA12',
    ket: 'Sakit hati'
  },
  {
    id: 4,
    diagnose: 'AA12',
    ket: 'Sakit hati'
  },
  {
    id: 5,
    diagnose: 'AA12',
    ket: 'Sakit hati'
  },
]