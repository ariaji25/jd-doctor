import { Box, Flex, Image, Center, CircularProgress, TableContainer, Table, Thead, Tr, Tbody, Td, InputGroup, InputLeftElement, Input, Divider, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
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
import { apiPatient } from 'services/apiPatient';
import { clearStateInputMR } from 'states/stateInputMedicalRecord';

const tabs = [
  { id: 1, name: 'Klinik' },
  { id: 2, name: 'Homecare' },
]




const ATTR = {
  nrm: 'kOJUHSrbkBS',
  nama: 'HyfzjNVhlzM',
  tempatLahir: 'Qtjs7yonSYc',
  tanggalLahir: 'SSsiEz3cVbn',
  jenisKelamin: 'TlO4kdMfHqa',
  alamatDomisili: 'aRHSGgFeOjr',
  nohp: 'x9tchw0swEu',
  nik: 'xGjeKnsJobT',
};


const ListPatientPage = () => {
  const history = useHistory();

  const getATTRValue = (attr, key) => {
    return attr.find((e) => e.attribute === key) ? attr.find((e) => e.attribute === key).value ?? '-' : '-';
  }

  const [patients, setPatients] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [pager, setPager] = useState({
    page: 1,
    pageCount: 0,
    pageSize: 15,
    total: 0
  })

  const getPatients = (page) => {
    setIsLoading(true)
    apiPatient.getAllPatients(
      page, pager.pageSize
    ).then((r) => {
      setPatientStateData(r)
      setIsLoading(false)
    }).catch(e => {
      setIsLoading(false)
    })
  }


  const setPatientStateData = (r) => {
    var i = 1;
    let _patients = r.trackedEntityInstances.filter(e => e.attributes.length > 0).map((p) => {
      const data = {
        id: i,
        patientId: p.trackedEntityInstance,
        nrm: getATTRValue(p.attributes, ATTR.nrm),
        name: getATTRValue(p.attributes, ATTR.nama),
        dob: getATTRValue(p.attributes, ATTR.tanggalLahir),
        gender: getATTRValue(p.attributes, ATTR.jenisKelamin),
        address: getATTRValue(p.attributes, ATTR.alamatDomisili),
      }
      i++;
      return data;
    })
    setPatients(c => [..._patients])
    setPager({ ...r.pager })
  }

  const isNRM = (str) => {
    return /\d/.test(str)
  }

  const searchPatient = (search) => {
    if (isNRM(search)) {
      apiPatient.searchPatientBY(
        search, ATTR.nrm
      ).then((r) => {
        setPatientStateData(r)
        setIsLoading(false)
      }).catch(e => {
        setIsLoading(false)
      })
    } else {
      apiPatient.searchPatientBY(
        search, ATTR.nama
      ).then((r) => {
        setPatientStateData(r)
        setIsLoading(false)
      }).catch(e => {
        setIsLoading(false)
      })
    }
  }

  const init = useCallback(() => {
    getPatients(1);
  }, [])

  useEffect(() => {
    init()
  }, [init])

  const handlePageChange = (page) => {
    setPager({ ...pager, page: page });
    getPatients(page)
  }

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
            <BreadcrumbLink onClick={() => history.push('/dashboard')}>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color={colors.PRIMARY} fontWeight={'bold'}>Data pasien</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Box padding={'0px 100px 10px'}>
        <Box fontSize={'36px'} color={colors.PRIMARY} fontWeight={'bold'} >
          Data semua pasien klinik
        </Box>
        <Box paddingTop={2}>
          <Divider border={'2px solid #C0C0C0'} />
        </Box>
        {isLoading
          ? <Center><CircularProgress isIndeterminate size='100px' thickness='4px' /></Center>
          :


          <Box paddingTop={2} marginBottom={5}>
            <Box paddingTop={'10px'}>
              <Flex justifyContent={'space-between'}>
                {/* <Flex fontSize={'18px'} fontWeight={'bold'} color={colors.PRIMARY} gap={3} alignItems={'center'}>
                {tabs.map((r, i) => (
                  <Box key={i} cursor={'pointer'} style={r.id === selectedTab ? { borderBottom: `2px solid ${colors.PRIMARY}` } : {}} onClick={() => setSelectedTab(r.id)}>
                    {r.name}
                  </Box>
                ))}
              </Flex> */}
                <Flex>
                  {/* <ButtonMain marginRight={'10px'} bg="white" color={'#505050'} borderColor='#505050'><FiFilter fontSize={'25px'} /> <span style={{ paddingLeft: '5px' }}></span>Filter</ButtonMain> */}
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'

                      children={
                        <Box>
                          <FiSearch style={{ color: '#505050' }} />
                        </Box>
                      }
                    />
                    <Input type='text' onChange={e => {
                      if (e.target.value && e.target.value.length > 3) {
                        searchPatient(e.target.value)
                      } else if (!e.target.value) {
                        getPatients(1)
                      }
                    }} placeholder='Cari Nama/NRM' minWidth={'364px'} borderRadius={'114px'} border={'2px solid #505050 !important'} />
                  </InputGroup>
                </Flex>
              </Flex>
              <Box minHeight={500} height={700} paddingTop={'10px'} display={'grid'}>
                {patients.length > 0 ?
                  <TableContainer overflowY={'scroll'} overflowX={'scroll'} height='inherit'>
                    <Table variant='striped' colorScheme={'gray'}>
                      <Thead color={'#5670CD'}>
                        <Tr>
                          <Td>NRM</Td>
                          <Td>Nama lengkap pasien</Td>
                          <Td>Jenis Kelamin</Td>
                          <Td>Tanggal Lahir</Td>
                          <Td>Alamat Pasien</Td>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {patients.map((r, i) => (
                          <Tr key={i} onClick={e => {
                            clearStateInputMR()
                            history.push(`/dashboard/medical-record/${r.patientId}`)
                          }}>
                            <Td>{r.nrm}</Td>
                            <Td fontWeight={'bold'}>{r.name}</Td>
                            <Td>{r.gender === 'male' ? "Laki-laki" : "Perempuan"}</Td>
                            <Td>{r.birth}</Td>
                            <Td>{r.address}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                  :
                  <EmptyComponent
                    src={'/img/empty-state-patient.svg'}
                    caption={'Belum ada data pasien'}
                  />
                }
              </Box>
              {patients.length > 0 &&
                <Box paddingTop={'20px'}>
                  <Pagination
                    pagesCount={pager.pageCount}
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
        }
      </Box>
    </Box>
  )
}

export default ListPatientPage