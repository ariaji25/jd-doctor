import { Box, Flex, Stack, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react"
import InputUnderlined from "components/input/InputUnderlined";
import ButtonMain from "components/button/ButtonMain";
import { FiPlusCircle, FiTrash } from "react-icons/fi";
import EmptyComponent from "components/EmptyComponent";

const ActionComponent = () => {
  return (
    <Stack px={24} py={5} gap={3}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Tindakan</Box>
      <Flex alignItems={'end'}>
        <Box flex={1}>Tindakan</Box>
        <Box flex={1}>
          <InputUnderlined
            type='text'
            placeholder='Tindakan'
          />
        </Box>
      </Flex>
      <Flex alignItems={'end'}>
        <Box flex={1}>Waktu</Box>
        <Box flex={1}>
          <InputUnderlined
            type='date'
            placeholder='Waktu'
          />
        </Box>
      </Flex>
      <Flex justifyContent={'end'} pt={2}>
        <ButtonMain><FiPlusCircle /> Tambahkan tindakan</ButtonMain>
      </Flex>
      <Box paddingTop={'10px'} display={'grid'}>
        <TableContainer height='inherit'>
          <Table colorScheme={'gray'}>
            <Thead color={'#484964'}>
              <Tr bg={'#F9F9FC'} fontWeight={'bold'}>
                <Td>Tindakan</Td>
                <Td>Waktu</Td>
                <Td></Td>
              </Tr>
            </Thead>
            <Tbody w={'100%'}>
              {listAction.length > 0 ? listAction.map((r, i) => (
                <Tr key={i} bg={'#F9F9FC'}>
                  <Td>{r.action}</Td>
                  <Td>{r.time}</Td>
                  <Td><FiTrash color="red" /></Td>
                </Tr>
              ))
                :
                <Tr>
                  <Td colSpan={3} border={'none'}>
                    <EmptyComponent
                      caption={<Stack gap={3} textAlign={'center'}>
                        <Text>Belum ada tindakan</Text>
                        <Text fontWeight={'bold'}>Tindakan akan muncul disini<br />setelah “Tambahkan tindakan”</Text>
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

export default ActionComponent

const listActions = []
const listAction = [
  {
    id: 1,
    action: 'Move on',
    time: '22-07-2022'
  },
  {
    id: 2,
    action: 'Move on',
    time: '22-07-2022'
  },
  {
    id: 3,
    action: 'Move on',
    time: '22-07-2022'
  },
  {
    id: 3,
    action: 'Move on',
    time: '22-07-2022'
  },
  {
    id: 4,
    action: 'Move on',
    time: '22-07-2022'
  },
  {
    id: 5,
    action: 'Move on',
    time: '22-07-2022'
  },
]