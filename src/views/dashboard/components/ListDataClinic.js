import { Box, Flex, TableContainer, Table, Thead, Tr, Tbody, Td, Divider, Center, CircularProgress, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import colors from 'values/colors';
import ButtonMain from 'components/button/ButtonMain';
import { useHistory } from 'react-router-dom';
import EmptyComponent from 'components/EmptyComponent';
import { useCallback, useEffect, useState } from 'react';
import { addZeroPad, dateFormat, getCurrentUserFromStorage } from 'utils';
import apiDoctor from 'services/apiDoctor';
import stateInputMR, { clearStateInputMR } from 'states/stateInputMedicalRecord';
import { FiSearch } from 'react-icons/fi';
import { medicalRecordID } from 'utils/constant';

const ListDataClinic = () => {
  const history = useHistory();
  const [serviceHistory, setServiceHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchPatient, setSearchPatient] = useState(null)

  const getServiceHistory = () => {
    console.log("DoctorId", getCurrentUserFromStorage().id)
    console.log("Date", dateFormat(new Date(), "yyyy-MM-dd"))
    apiDoctor.getClinicServiceHistory(
      dateFormat(new Date(), "yyyy-MM-dd"),
      getCurrentUserFromStorage().id
    ).then((r) => {
      console.log("ResponseHistory", r);
      var i = 1;
      const filterFinishedService = (a) => {
        return a.serviceStatus.length > 0;
      }
      const filterActiveService = (a) => {
        return a.serviceStatus.length <= 0;
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
          serviceStatus: ev.dataValues.find((e) => e.dataElement === medicalRecordID.referensiDiagnosis) ? ev.dataValues.find((e) => e.dataElement === medicalRecordID.referensiDiagnosis).value ?? '' : '',
          serviceID: ev.event,
          expired: false
        }
        i++;
        return data;
      })
      console.log("Response", history)
      let finishedService = history.filter(filterFinishedService)
      history = history.filter(filterActiveService)
      if (finishedService) {
        finishedService.forEach(eS => {
          history.push({ ...eS, expired: true })
        })
      }
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
            {serviceHistory && serviceHistory.length > 0
              ? <Box>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'

                    children={
                      <Box borderRight={'1px solid #505050'} padding={'0 7px'}>
                        <FiSearch style={{ color: '#505050' }} />
                      </Box>
                    }
                  />
                  <Input type='text' onChange={e => {
                    if (e.target.value && e.target.value.length > 3) {
                      let _search = serviceHistory.filter(p => `${p.name}`.toLocaleLowerCase().includes(`${e.target.value}`.toLocaleLowerCase()))
                      console.log("Search", _search)
                      if (_search) setSearchPatient(c => [..._search])
                    } else if (!e.target.value) {
                      setSearchPatient(null)
                    }
                  }} placeholder='Cari Nama' minWidth={'364px'} borderRadius={'114px'} border={'1px solid #505050 !important'} />
                </InputGroup>
              </Box>
              : <></>}
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
                        <Td>Status Pelayanan</Td>
                        <Td>Waktu</Td>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {(searchPatient ?? serviceHistory).map((r, i) => (
                        <Tr onClick={(e) => {
                          clearStateInputMR()
                          stateInputMR.serviceDetail = r
                          history.push(`/dashboard/medical-record/${r.patientId}`)
                        }} key={i}
                        >
                          <Td>{addZeroPad(r.id, 4)}</Td>
                          <Td fontWeight={'bold'}>{r.name}</Td>
                          <Td>{r.service}</Td>
                          <Td>{r.serviceStatus ? "Sudah Dilayani" : "Menunggu Pelayanan"}</Td>
                          <Td textColor={r.expired ? "Red" : null} fontWeight={'bold'}>{r.schedule}</Td>
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
