import { Box, Flex, Stack, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react"
import InputUnderlined from "components/input/InputUnderlined";
import ButtonMain from "components/button/ButtonMain";
import { FiPlusCircle, FiTrash } from "react-icons/fi";
import EmptyComponent from "components/EmptyComponent";

const TreatmentComponent = () => {
  return (
    <Stack px={24} py={5} gap={3}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Pengobatan</Box>
      <Flex alignItems={'end'}>
        <Box flex={1}>Nama obat</Box>
        <Box flex={1}>
          <InputUnderlined
            type='text'
            placeholder='Obat yang diberikan'
          />
        </Box>
      </Flex>
      <Flex alignItems={'end'}>
        <Box flex={1}>Pemberian (Dosis)</Box>
        <Box flex={1}>
          <InputUnderlined
            type='text'
            placeholder='Pemberina, cth : (3 x 1 )'
          />
        </Box>
      </Flex>
      <Flex justifyContent={'end'} pt={2}>
        <ButtonMain><FiPlusCircle /> Tambahkan obat</ButtonMain>
      </Flex>
      <Box paddingTop={'10px'} display={'grid'}>
        <TableContainer height='inherit'>
          <Table colorScheme={'gray'}>
            <Thead color={'#484964'}>
              <Tr bg={'#F9F9FC'} fontWeight={'bold'}>
                <Td>Nama obat</Td>
                <Td>Pemberian</Td>
                <Td></Td>
              </Tr>
            </Thead>
            <Tbody w={'100%'}>
              {listTreatment.length > 0 ? listTreatment.map((r, i) => (
                <Tr key={i} bg={'#F9F9FC'}>
                  <Td>{r.treatment}</Td>
                  <Td>{r.give}</Td>
                  <Td><FiTrash color="red" /></Td>
                </Tr>
              ))
                :
                <Tr>
                  <Td colSpan={3} border={'none'}>
                    <EmptyComponent
                      caption={<Stack gap={3} textAlign={'center'}>
                        <Text>Belum ada obat</Text>
                        <Text fontWeight={'bold'}>Obat akan muncul disini<br />setelah “Tambahkan obat”</Text>
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

export default TreatmentComponent

const listTreatments = []
const listTreatment = [
  {
    id: 1,
    treatment: 'Paracetamol',
    give: '3x1'
  },
  {
    id: 2,
    treatment: 'Paracetamol',
    give: '3x1'
  },
  {
    id: 3,
    treatment: 'Paracetamol',
    give: '3x1'
  },
  {
    id: 3,
    treatment: 'Paracetamol',
    give: '3x1'
  },
  {
    id: 4,
    treatment: 'Paracetamol',
    give: '3x1'
  },
  {
    id: 5,
    treatment: 'Paracetamol',
    give: '3x1'
  },
]