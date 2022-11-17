import { Box, Flex, Image, TableContainer, Table, Thead, Tr, Tbody, Td, InputGroup, InputLeftElement, Input, Divider, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Center, CircularProgress } from '@chakra-ui/react';
import colors from 'values/colors';
import ButtonMain from 'components/button/ButtonMain';
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator
} from "@ajna/pagination";
import { useState, useEffect, useCallback } from 'react'
import { FiFilter, FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import EmptyComponent from 'components/EmptyComponent';
import { getCurrentUserFromStorage } from 'utils';
import apiDoctor from 'services/apiDoctor';
import stateInputMR, { clearStateInputMR } from 'states/stateInputMedicalRecord';

const ListPatientClinicPage = () => {
  const history = useHistory();
  const [serviceHistory, setServiceHistory] = useState([])
  const [pager, setPager] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getServiceHistory = (page) => {
    apiDoctor.getAllClinicServiceHistory(
      getCurrentUserFromStorage().id,
      page
    ).then((r) => {
      console.log("ResponseHistory", r);
      setPager(r.pager)
      var i = 1;
      var history = r.events.map((ev) => {
        const data = {
          id: i,
          patientId: ev.trackedEntityInstance,
          img: '/img/doctorSidebar.png',
          name: ev.dataValues.find((e) => e.dataElement === 'FwdxzpQ8w2I') ? ev.dataValues.find((e) => e.dataElement === 'FwdxzpQ8w2I').value ?? '-' : '-',
          schedule: ev.dataValues.find((e) => e.dataElement === 'arxuhT0GhPy') ? ev.dataValues.find((e) => e.dataElement === 'arxuhT0GhPy').value ?? '-' : '-',
          problem: ev.dataValues.find((e) => e.dataElement === 'Yh6ylx8D3tO') ? ev.dataValues.find((e) => e.dataElement === 'Yh6ylx8D3tO').value ?? '-' : '-',
          service: ev.dataValues.find((e) => e.dataElement === 'o8Yd7t1qNk6') ? ev.dataValues.find((e) => e.dataElement === 'o8Yd7t1qNk6').value ?? '-' : '-',
          serviceID: ev.event
        }
        i++;
        return data;
      })
      console.log("Response", history)
      setServiceHistory(history)
      setIsLoading(false)
    }).catch(e => {
      setIsLoading(false)
    })
  }

  // handlers
  const handlePageChange = (nextPage) => {
    // -> request new data using the page number
    getServiceHistory(nextPage);
    console.log("request new data with ->", nextPage);
  };

  const init = useCallback(() => {
    setIsLoading(true)
    getServiceHistory(1);
  }, [])

  useEffect(() => {
    init()
  }, [init])
  return (
    <Box>
      <Flex alignItems={'center'} padding={'30px'}>
        <Box>
          <Image
            onClick={() => history.push('/dashboard')}
            cursor={'pointer'}
            alt={'arrow-left'}
            src='/icon/arrow-left.svg'
          />
        </Box>
        <Breadcrumb separator='>' paddingLeft={'25px'}>
          <BreadcrumbItem>
            <BreadcrumbLink textDecor={'underline'} onClick={() => history.push('/dashboard')}
            >Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color={colors.PRIMARY} fontWeight={'bold'}>Semua data pasien klinik</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      {isLoading
        ? <Center><CircularProgress isIndeterminate size='100px' thickness='4px' /></Center>
        : <Box padding={'0px 100px 10px'}>
          <Box fontSize={'36px'} color={colors.PRIMARY} fontWeight={'bold'} >
            Semua pasien klinik
          </Box>
          <Box paddingTop={2}>
            <Divider border={'2px solid #C0C0C0'} />
          </Box>
          <Box paddingTop={2} marginBottom={5}>
            <Box paddingTop={'10px'}>
              <Flex justifyContent={'end'}>
                <Flex>
                  <ButtonMain marginRight={'10px'} bg="white" color={'#505050'} borderColor='#505050'><FiFilter fontSize={'25px'} /> <span style={{ paddingLeft: '5px' }}></span>Filter</ButtonMain>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'

                      children={
                        <Box>
                          <FiSearch style={{ color: '#505050' }} />
                        </Box>
                      }
                    />
                    <Input type='text' placeholder='Cari Nama' minWidth={'364px'} borderRadius={'114px'} border={'2px solid #505050 !important'} />
                  </InputGroup>
                </Flex>
              </Flex>
              <Box maxHeight={'500px'} height={'500px'} paddingTop={'10px'} display={'grid'}>
                {serviceHistory.length > 0 ?
                  <TableContainer overflowY={'scroll'} overflowX={'scroll'} height='inherit'>
                    <Table variant='striped' colorScheme={'gray'}>
                      <Thead color={'#5670CD'}>
                        <Tr >
                          <Td>Tanggal periksa</Td>
                          <Td>Nama Pasien</Td>
                          <Td>Layanan</Td>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {serviceHistory.map((r, i) => (
                          <Tr onClick={(e) => {
                            clearStateInputMR()
                            stateInputMR.serviceDetail = r
                            history.push(`/dashboard/medical-record/${r.patientId}`)
                          }} key={i}>
                            <Td>{r.schedule}</Td>
                            <Td fontWeight={'bold'}>{r.name}</Td>
                            <Td>{r.service}</Td>
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
              {serviceHistory.length > 0 && pager &&
                <Box paddingTop={'20px'}>
                  <Pagination
                    pagesCount={pager.pagesCount}
                    currentPage={pager.page}
                    isDisabled={false}
                    onPageChange={handlePageChange}
                  >
                    <PaginationContainer
                      align="center"
                      justify="flex-end"
                      p={4}
                      w="full"
                    >
                      <PaginationPageGroup
                        isInline
                        align="center"
                        separator={
                          <PaginationSeparator
                            onClick={() =>
                              console.log(
                                "Im executing my own function along with Separator component functionality"
                              )
                            }
                            bg={'white'}
                            color={colors.PRIMARY}
                            border={`1px solid ${colors.PRIMARY}`}
                            borderRadius={'34px'}
                            fontSize="sm"
                            padding={'20px'}
                            w={7}
                            jumpSize={11}
                          />
                        }
                      >
                        {Array.from({ length: pager.pageCount }, (_, i) => i + 1).map((page) => (
                          <PaginationPage
                            w={7}
                            bg="white"
                            color={colors.PRIMARY}
                            border={`1px solid ${colors.PRIMARY}`}
                            padding={'20px'}
                            borderRadius={'34px'}
                            key={`pagination_page_${page}`}
                            page={page}
                            onClick={() =>
                              console.log(
                                "Im executing my own function along with Page component functionality"
                              )
                            }
                            fontSize="sm"
                            _hover={{
                              bg: colors.BIRU_TERANG
                            }}
                            _current={{
                              bg: colors.PRIMARY,
                              color: 'white',
                              fontSize: "sm",
                              w: 7
                            }}
                          />
                        ))}
                      </PaginationPageGroup>
                    </PaginationContainer>
                  </Pagination>
                </Box>
              }
            </Box>
          </Box>
        </Box>}
    </Box>
  )
}

export default ListPatientClinicPage

const listKliniks = []

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