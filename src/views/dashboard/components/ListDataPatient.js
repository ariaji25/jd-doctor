import { Box, Flex, Text, TableContainer, Table, Thead, Tr, Tbody, Td, InputGroup, InputLeftElement, Input, Center, CircularProgress } from '@chakra-ui/react';
import colors from 'values/colors';
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator
} from "@ajna/pagination";
import { useState, useEffect, useCallback } from 'react'
import { FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import EmptyComponent from 'components/EmptyComponent';
import { apiPatient } from 'services/apiPatient';


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

const ListDataPatient = () => {
  const history = useHistory();

  const getATTRValue = (attr, key) => {
    return attr.find((e) => e.attribute === key) ? attr.find((e) => e.attribute === key).value ?? '-' : '-';
  }

  const [patients, setPatients] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [pager, setPager] = useState(null)

  const getPatients = (page) => {
    setIsLoading(true)
    apiPatient.getAllPatients(
      page
    ).then((r) => {
      var i = 1;
      let _patients = r.trackedEntityInstances.filter(e => e.attributes.length > 0).map((p) => {
        const data = {
          id: i,
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
      setIsLoading(false)
    }).catch(e => {
      setIsLoading(false)
    })
  }

  const init = useCallback(() => {
    getPatients(1);
  }, [])

  useEffect(() => {
    init()
  }, [init])

  const handlePageChange = (page) => {
    getPatients(page)
  }

  return (
    <Box maxHeight={'430px'} height={'430px'} paddingTop={8} marginBottom={5}>
      {isLoading
        ? <Center><CircularProgress isIndeterminate size='100px' thickness='4px' /></Center>
        : <Box padding={'20px 20px 0 0'}>
          <Flex justifyContent={'space-between'}>
            <Box fontSize={'18px'} fontWeight={'bold'} color={colors.PRIMARY}>
              Data pasien
            </Box>
            <Box>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'

                  children={
                    <Box borderRight={'1px solid #505050'} padding={'0 7px'}>
                      <FiSearch style={{ color: '#505050' }} />
                    </Box>
                  }
                />
                <Input type='text' placeholder='Search' minWidth={'364px'} borderRadius={'114px'} border={'1px solid #505050 !important'} />
              </InputGroup>
            </Box>
          </Flex>
          <Box maxHeight={'347px'} height={'347px'} paddingTop={'20px'} display={'grid'}>
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
                      <Tr key={i}>
                        <Td>{r.nrm}</Td>
                        <Td fontWeight={'bold'}>{r.name}</Td>
                        <Td>{r.gender}</Td>
                        <Td>{r.dob}</Td>
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
          {patients.length > 0 && pager &&
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
                  {/* <PaginationNext
                    _hover={{
                      bg: colors.BIRU_TERANG
                    }}
                    bg={colors.PRIMARY}
                    color='white'
                    borderRadius={'42px'}
                    marginLeft={4}
                    onClick={() => {
                      history.push('/dashboard/list-patient')
                      console.log(
                        "Im executing my own function along with Next component functionality"
                      )
                    }
                    }
                  >
                    <Text>Lihat semua</Text>
                  </PaginationNext> */}
                </PaginationContainer>
              </Pagination>
            </Box>
          }
        </Box>}
    </Box>
  )
}

export default ListDataPatient
