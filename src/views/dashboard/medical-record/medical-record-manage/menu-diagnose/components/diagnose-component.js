import { Box, Flex, Stack, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react"
import InputUnderlined from "components/input/InputUnderlined";
import ButtonMain from "components/button/ButtonMain";
import { FiPlusCircle, FiTrash } from "react-icons/fi";
import EmptyComponent from "components/EmptyComponent";

const DiagnoseComponent = () => {
  return (
    <Stack px={24} py={5} gap={3}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Diagnosis</Box>
      <Flex alignItems={'end'}>
        <Box flex={1}>Coding diagnosis</Box>
        <Box flex={1}>
          <InputUnderlined
            type='text'
            placeholder='Diagnosis'
          />
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