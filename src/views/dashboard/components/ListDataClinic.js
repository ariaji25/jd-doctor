import { Box, Flex, TableContainer, Table, Thead, Tr, Tbody, Td, Divider, Center, CircularProgress } from '@chakra-ui/react';
import colors from 'values/colors';
import ButtonMain from 'components/button/ButtonMain';
import { useHistory } from 'react-router-dom';
import EmptyComponent from 'components/EmptyComponent';
import { useCallback, useEffect, useState } from 'react';
import { addZeroPad, dateFormat, getCurrentUserFromStorage } from 'utils';
import apiDoctor from 'services/apiDoctor';
import stateInputMR, { clearStateInputMR } from 'states/stateInputMedicalRecord';

const ListDataClinic = () => {
  const history = useHistory();
  const [serviceHistory, setServiceHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getServiceHistory = () => {
    console.log("DoctorId", getCurrentUserFromStorage().id)
    console.log("Date", dateFormat(new Date(), "yyyy-MM-dd"))
    apiDoctor.getClinicServiceHistory(
      dateFormat(new Date(), "yyyy-MM-dd"),
      getCurrentUserFromStorage().id
    ).then((r) => {
      console.log("ResponseHistory", r);
      var i = 1;
      const filter = (a, b) => {
        const aTime = new Date(`${dateFormat(new Date(), "yyyy-MM-dd")}T${a.schedule}:00`)
        const timenow = new Date()
        console.log(aTime.getTime() < timenow.getTime())
        console.log(aTime.getTime())
        console.log(timenow.getTime())
        return aTime.getTime() >= timenow.getTime();
      }
      var history = r.events.map((ev) => {
        const data = {
          id: i,
          patientId: ev.trackedEntityInstance,
          img: '/img/doctorSidebar.png',
          name: ev.dataValues.find((e) => e.dataElement === 'FwdxzpQ8w2I') ? ev.dataValues.find((e) => e.dataElement === 'FwdxzpQ8w2I').value ?? '-' : '-',
          schedule: ev.dataValues.find((e) => e.dataElement === 'X7GUfsOErZh') ? ev.dataValues.find((e) => e.dataElement === 'X7GUfsOErZh').value ?? '-' : '-',
          problem: ev.dataValues.find((e) => e.dataElement === 'Yh6ylx8D3tO') ? ev.dataValues.find((e) => e.dataElement === 'Yh6ylx8D3tO').value ?? '-' : '-',
          service: ev.dataValues.find((e) => e.dataElement === 'o8Yd7t1qNk6') ? ev.dataValues.find((e) => e.dataElement === 'o8Yd7t1qNk6').value ?? '-' : '-',
          serviceID: ev.event
        }
        i++;
        return data;
      })
      console.log("Response", history)
      history = history.filter(filter)
      setServiceHistory(history)
      setIsLoading(false)
    }).catch(e => {
      setIsLoading(false)
    })
  }

  const init = useCallback(() => {
    setIsLoading(true)
    getServiceHistory();
  }, [])

  useEffect(() => {
    init()
  }, [init])

  return (
    <Flex flexDirection={'column'} flex={6}>
      <Flex borderBottom={'1px solid #C0C0C0'} paddingBottom={'10px'}>
        <Box fontSize={'18px'} color={colors.PRIMARY} fontWeight={'bold'} >
          Jadwal Klinik
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
            {dateFormat(new Date(), "d MMMM yyyy")}
          </Box>
        </Flex>
      </Flex>
      <Box borderRight={'1px solid #C0C0C0'} maxHeight={'430px'} height={'430px'}>
        <Box padding={'20px 20px 0 0'}>

          <Flex justifyContent={'space-between'}>
            <Box fontSize={'18px'} fontWeight={'bold'} color={colors.PRIMARY}>
              Antrian Klinik
            </Box>
          </Flex>

          <Box maxHeight={'347px'} height={'347px'} paddingTop={'20px'} display={'grid'}>
            {isLoading
              ? <Center><CircularProgress isIndeterminate size='100px' thickness='4px' /></Center>
              : serviceHistory.length > 0 ?
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
                      {serviceHistory.map((r, i) => (
                        <Tr onClick={(e) => {
                          clearStateInputMR()
                          stateInputMR.serviceDetail = r
                          history.push(`/dashboard/medical-record/${r.patientId}`)
                        }} key={i}>
                          <Td>{addZeroPad(r.id, 4)}</Td>
                          <Td fontWeight={'bold'}>{r.name}</Td>
                          <Td>{r.service}</Td>
                          <Td fontWeight={'bold'}>{r.schedule}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
                :
                <EmptyComponent
                  src={'/img/empty-state-clinic.svg'}
                  caption={'Jadwal klinik masih kosong'}
                />
            }
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export default ListDataClinic
