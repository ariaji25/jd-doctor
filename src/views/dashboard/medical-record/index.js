import { Box, Flex, Image, TableContainer, Table, Thead, Tr, Tbody, Td, InputGroup, InputLeftElement, Input, Divider, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Menu, MenuList, MenuButton, MenuItem, Center, CircularProgress, useQuery } from '@chakra-ui/react';
import colors from 'values/colors';
import ButtonMain from 'components/button/ButtonMain';
import {
  Pagination,
  PaginationPage,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator
} from "@ajna/pagination";
import { useState, useEffect, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { FiPlusCircle, FiFilter, FiSearch, FiEye, FiEdit, FiTrash } from 'react-icons/fi';
import EmptyComponent from 'components/EmptyComponent';
import { apiPatient } from 'services/apiPatient';
import { dateFormat, useQueryParams } from 'utils';
import { genders, medicalRecordProgram } from 'utils/constant';
import { useSnapshot } from 'valtio';
import stateInputMR, { clearStateInputMR } from 'states/stateInputMedicalRecord';
import apiBooking from 'services/apiBooking';
import apiMedicalrecord from 'services/apiMedicalRecord';

const MedicalRecordPage = () => {
  const history = useHistory();
  let { idPatient } = useParams();
  let query = useQueryParams();

  const [serviceHistory, setServiceHistory] = useState([])
  const [pager, setPager] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { serviceDetail } = useSnapshot(stateInputMR)
  const getServiceHistory = (page) => {
    setIsLoading(true)
    apiPatient.serviceHistory(idPatient, page)
      .then(r => {
        console.log("Data", r)
        var i = 1;
        var history = r.events.map((ev) => {
          const data = {
            id: i,
            patientId: ev.trackedEntityInstance,
            name: ev.dataValues.find((e) => e.dataElement === 'FwdxzpQ8w2I') ? ev.dataValues.find((e) => e.dataElement === 'FwdxzpQ8w2I').value ?? '-' : '-',
            schedule: ev.dataValues.find((e) => e.dataElement === 'arxuhT0GhPy') ? ev.dataValues.find((e) => e.dataElement === 'arxuhT0GhPy').value ?? '-' : '-',
            problem: ev.dataValues.find((e) => e.dataElement === 'Yh6ylx8D3tO') ? ev.dataValues.find((e) => e.dataElement === 'Yh6ylx8D3tO').value ?? '-' : '-',
            service: ev.dataValues.find((e) => e.dataElement === 'o8Yd7t1qNk6') ? ev.dataValues.find((e) => e.dataElement === 'o8Yd7t1qNk6').value ?? '-' : '-',
            docterName: ev.dataValues.find((e) => e.dataElement === 'WeZLKi92kyq') ? ev.dataValues.find((e) => e.dataElement === 'WeZLKi92kyq').value ?? '-' : '-',
            diagnosis: ev.dataValues.find((e) => e.dataElement === 'PynURTrdTEs') ? ev.dataValues.find((e) => e.dataElement === 'PynURTrdTEs').value ?? '-' : '-',
            // service: ev.dataValues.find((e) => e.dataElement === 'o8Yd7t1qNk6') ? ev.dataValues.find((e) => e.dataElement === 'o8Yd7t1qNk6').value ?? '-' : '-',
            event: ev.event
          }
          i++;
          return data;
        })
        setServiceHistory(history)
        setPager(r.pager)
        setIsLoading(false)
      })
      .catch(e => {
        console.log("Err", e)
        setIsLoading(false)
        setServiceHistory([])
      })
  }

  const init = useCallback(() => {
    console.log("Service Data", serviceDetail.service)
    getServiceHistory(1)
    getPatientDetail()
  }, [])

  useEffect(() => {
    init()
  }, [init])



  // handlers
  const handlePageChange = (nextPage) => {
    // -> request new data using the page number
    getServiceHistory(nextPage);
    console.log("request new data with ->", nextPage);
  };

  const [selectedPatient, setSelectedPatient] = useState('')

  const checkEnrollment = async (patient) => {
    const _enrollMR1 = patient.enrollments.filter(e => e.program === medicalRecordProgram.pemeriksaanFisik)
    if (_enrollMR1.length <= 0) {
      await apiMedicalrecord.createEnrollmentForMR(medicalRecordProgram.pemeriksaanFisik, patient.id)
    }
    const _enrollMR2 = patient.enrollments.filter(e => e.program === medicalRecordProgram.diagnosis)
    if (_enrollMR2.length <= 0) {
      await apiMedicalrecord.createEnrollmentForMR(medicalRecordProgram.diagnosis, patient.id)
    }
    const _enrollMR3 = patient.enrollments.filter(e => e.program === medicalRecordProgram.tindakan)
    if (_enrollMR3.length <= 0) {
      await apiMedicalrecord.createEnrollmentForMR(medicalRecordProgram.tindakan, patient.id)
    }
    const _enrollMR4 = patient.enrollments.filter(e => e.program === medicalRecordProgram.obat)
    if (_enrollMR4.length <= 0) {
      await apiMedicalrecord.createEnrollmentForMR(medicalRecordProgram.obat, patient.id)
    }
  }
  const getPatientDetail = () => {
    setIsLoading(true)
    apiPatient.getPatienDetailByID(idPatient).then((p) => {
      const data = {
        id: p.trackedEntityInstance,
        name: p.attributes.find((a) => a.attribute === "HyfzjNVhlzM") ? p.attributes.find((a) => a.attribute === "HyfzjNVhlzM").value ?? '-' : '-',
        phone: p.attributes.find((a) => a.attribute === "NCLBUYYxnWU") ? p.attributes.find((a) => a.attribute === "NCLBUYYxnWU").value ?? '-' : '-',
        address: p.attributes.find((a) => a.attribute === "aRHSGgFeOjr") ? p.attributes.find((a) => a.attribute === "aRHSGgFeOjr").value ?? '-' : '-',
        gender: p.attributes.find((a) => a.attribute === "TlO4kdMfHqa") ? p.attributes.find((a) => a.attribute === "TlO4kdMfHqa").value ?? '-' : '-',
        dob: p.attributes.find((a) => a.attribute === "SSsiEz3cVbn") ? p.attributes.find((a) => a.attribute === "SSsiEz3cVbn").value ?? '-' : '-',
        enrollments: p.enrollments
      }
      setSelectedPatient(data)
      stateInputMR.patient = data
      console.log("Enrollment", data.enrollments)
      checkEnrollment(data)
      setIsLoading(false)
    }).catch(e => {
      setIsLoading(false)
    })
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
            <BreadcrumbLink >Rekam Medis</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      {
        isLoading
          ? <Center><CircularProgress isIndeterminate size='100px' thickness='4px' /></Center>
          : <Box padding={'0px 100px 10px'}>
            <Flex  >
              <Flex flex={0} minW={'300px'} justifyContent={'end'} flexDirection={'column'}>
                <Box fontSize={'36px'} color={colors.PRIMARY} fontWeight={'bold'}>
                  Rekam medis
                </Box>
                <Box fontSize={'13px'}>
                  Data rekam medis pasien
                </Box>
              </Flex>
              <Flex flex={1} justifyContent={'end'} gap={4} whiteSpace={'pre'} color={colors.PRIMARY} alignItems={'center'} lineHeight={'26px'}>
                <Box>
                  <Image
                    alt='patient-photo'
                    src='/img/patientPhoto.png'
                    cursor={'pointer'}
                    width={100}
                  />
                </Box>
                <Box >
                  <Box fontSize={'13px'}>Nama lengkap pasien</Box>
                  <Box fontWeight={'bold'}>{selectedPatient.name}</Box>
                  <Box fontSize={'13px'}>Tanggal lahir</Box>
                  <Box fontWeight={'bold'}>{selectedPatient.dob ? selectedPatient.dob.replaceAll("-", "/") : "-"} - 23 thn</Box>
                </Box>
                <Box >
                  <Box fontSize={'13px'}>Alamat</Box>
                  <Box fontWeight={'bold'}>{selectedPatient.address}</Box>
                  <Box fontSize={'13px'}>Jenis kelamin</Box>
                  <Box fontWeight={'bold'}>{genders[selectedPatient.gender]}</Box>
                </Box>
              </Flex>
            </Flex>
            <Box paddingTop={2}>
              <Divider border={'2px solid #C0C0C0'} />
            </Box>
            <Box paddingTop={2} marginBottom={5}>
              <Box paddingTop={'10px'}>
                <Flex justifyContent={'space-between'}>
                  <Flex fontSize={'18px'} fontWeight={'bold'} color={colors.PRIMARY} gap={3} alignItems={'center'}>
                    <ButtonMain onClick={() => history.push(`/dashboard/medical-record/${idPatient}/create`)}><FiPlusCircle /><span>Tambah pemeriksaan</span></ButtonMain>
                  </Flex>
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
                      <Input type='text' placeholder='Search' minWidth={'364px'} borderRadius={'114px'} border={'2px solid #505050 !important'} />
                    </InputGroup>
                  </Flex>
                </Flex>
                <Box maxHeight={'500px'} height={'500px'} paddingTop={'10px'} display={'grid'}>
                  {serviceHistory.length > 0 ?
                    <TableContainer overflowY={'scroll'} overflowX={'scroll'} height='inherit'>
                      <Table variant='striped' colorScheme={'gray'}>
                        <Thead color={'#5670CD'}>
                          <Tr>
                            <Td p={0}></Td>
                            <Td>Tanggal periksa</Td>
                            <Td>Layanan</Td>
                            <Td>Keluhan</Td>
                            <Td>Dokter</Td>
                            <Td>Diagnosa</Td>
                            {/* 
                            <Td>Tindakan</Td>
                            <Td>Resep Dokter</Td> */}
                          </Tr>
                        </Thead>
                        <Tbody>
                          {serviceHistory.map((r, i) => (
                            <Tr key={i}>
                              <Td p={0}>
                                <Menu isLazy>
                                  {({ isOpen }) => (
                                    <>
                                      <MenuButton isActive={isOpen} >
                                        <Image src={'/icon/vertical-dot.svg'} />
                                      </MenuButton>
                                      <MenuList>
                                        <MenuItem onClick={() => history.push(`/dashboard/medical-record/${idPatient}/detail`)} display={'flex'} gap={3}>
                                          <Box><FiEye /></Box>
                                          <Box>Lihat detail</Box>
                                        </MenuItem>
                                        <MenuItem onClick={() => history.push(`/dashboard/medical-record/${idPatient}/edit`)} display={'flex'} gap={3}>
                                          <Box><FiEdit /></Box>
                                          <Box>Edit</Box>
                                        </MenuItem>
                                        <MenuItem onClick={() => alert('delete')} color={'red'} display={'flex'} gap={3}>
                                          <Box><FiTrash /></Box>
                                          <Box>Hapus</Box>
                                        </MenuItem>
                                      </MenuList>
                                    </>
                                  )}
                                </Menu>


                              </Td>
                              <Td>{r.schedule}</Td>
                              <Td>{r.service}</Td>
                              <Td>{r.problem}</Td>
                              <Td>{r.docterName}</Td>
                              <Td>{r.diagnosis}</Td>
                              {/* 
                              <Td>{r.tindakan}</Td>
                              <Td>{r.receipt}</Td> */}
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                    :
                    <EmptyComponent
                      src={'/img/empty-state-patient.svg'}
                      caption={'Belum ada rekam medis'}
                    />
                  }
                </Box>
                {serviceHistory.length > 0 && pager &&
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
          </Box>
      }
    </Box>
  )
}

export default MedicalRecordPage
