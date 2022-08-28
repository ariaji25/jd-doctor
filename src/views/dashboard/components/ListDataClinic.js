import { Box, Flex, TableContainer, Table, Thead, Tr, Tbody, Td, Divider, Center } from '@chakra-ui/react';
import colors from 'values/colors';
import ButtonMain from 'components/button/ButtonMain';
import { useHistory } from 'react-router-dom';

const ListDataClinic = () => {
  const history = useHistory();

  return (
    <Flex flexDirection={'column'} flex={6}>
      <Flex borderBottom={'1px solid #C0C0C0'} paddingBottom={'10px'}>
        <Box fontSize={'18px'} color={colors.PRIMARY} fontWeight={'bold'} >
          Jadwal
        </Box>
        <Flex alignItems={'center'}>
          <Center height='15px' padding={'0 4px'} >
            <Divider orientation='vertical' bg={colors.BIRU_TERANG} width={'1px'} />
          </Center>
        </Flex>
        <Flex alignItems={'flex-end'} marginBottom={'2px'} fontSize={'12px'}>
          <Box fontWeight={'bold'} paddingRight={'2px'}>
            Hari ini
          </Box>
          <Box>
            - 02 Februari 2022
          </Box>
        </Flex>
      </Flex>
      <Box borderRight={'1px solid #C0C0C0'} maxHeight={'430px'} height={'430px'}>
        <Box padding={'20px 20px 0 0'}>
          <Flex justifyContent={'space-between'}>
            <Box fontSize={'18px'} fontWeight={'bold'} color={colors.PRIMARY}>
              Klinik
            </Box>
            <Box>
              <ButtonMain onClick={() => history.push('/dashboard/list-patient-clinic')}>Lihat Semua</ButtonMain>
            </Box>
          </Flex>
          <Box maxHeight={'347px'} height={'347px'} paddingTop={'20px'} display={'grid'}>
            <TableContainer overflowY={'scroll'} overflowX={'scroll'} height='inherit'>
              <Table variant='striped' colorScheme={'gray'}>
                <Thead color={'#5670CD'}>
                  <Tr>
                    <Td>No.Antrian</Td>
                    <Td>Nama lengkap pasien</Td>
                    <Td>Layanan</Td>
                    <Td>Waktu</Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {listKlinik.map((r, i) => (
                    <Tr key={i}>
                      <Td>{r.no}</Td>
                      <Td fontWeight={'bold'}>{r.name}</Td>
                      <Td>{r.service}</Td>
                      <Td fontWeight={'bold'}>{r.time}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export default ListDataClinic

const listKlinik = [
  {
    no: 1,
    name: 'Marvin McKinney',
    service: 'Pemeriksaan umum',
    time: '01:10 Wib'
  },
  {
    no: 1,
    name: 'Marvin McKinney',
    service: 'Pemeriksaan umum',
    time: '01:10 Wib'
  },
  {
    no: 1,
    name: 'Marvin McKinney',
    service: 'Pemeriksaan umum',
    time: '01:10 Wib'
  },
  {
    no: 1,
    name: 'Marvin McKinney',
    service: 'Pemeriksaan umum',
    time: '01:10 Wib'
  },
  {
    no: 1,
    name: 'Marvin McKinney',
    service: 'Pemeriksaan umum',
    time: '01:10 Wib'
  },
  {
    no: 1,
    name: 'Marvin McKinney',
    service: 'Pemeriksaan umum',
    time: '01:10 Wib'
  },
  {
    no: 1,
    name: 'Marvin McKinney',
    service: 'Pemeriksaan umum',
    time: '01:10 Wib'
  },
  {
    no: 1,
    name: 'Marvin McKinney',
    service: 'Pemeriksaan umum',
    time: '01:10 Wib'
  },
  {
    no: 1,
    name: 'Marvin McKinney',
    service: 'Pemeriksaan umum',
    time: '01:10 Wib'
  },
  {
    no: 1,
    name: 'Marvin McKinney',
    service: 'Pemeriksaan umum',
    time: '01:10 Wib'
  },
  {
    no: 1,
    name: 'Marvin McKinney',
    service: 'Pemeriksaan umum',
    time: '01:10 Wib'
  },
  {
    no: 1,
    name: 'Marvin McKinney',
    service: 'Pemeriksaan umum',
    time: '01:10 Wib'
  },
  {
    no: 1,
    name: 'Marvin McKinney',
    service: 'Pemeriksaan umum',
    time: '01:10 Wib'
  },
  {
    no: 1,
    name: 'Marvin McKinney',
    service: 'Pemeriksaan umum',
    time: '01:10 Wib'
  },
]