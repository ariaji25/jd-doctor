import { Box, Flex, Image, TableContainer, Table, Thead, Tr, Tbody, Td, InputGroup, InputLeftElement, Input, Divider, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
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
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { FiPlusCircle, FiFilter, FiSearch } from 'react-icons/fi';

const MedicalRecord = () => {
  const history = useHistory();
  let { idPatient } = useParams();

  // states
  const [pokemonsTotal, setPokemonsTotal] = useState();
  const [pokemons, setPokemons] = useState([]);
  // constants
  const outerLimit = 2;
  const innerLimit = 2;
  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    setIsDisabled,
    isDisabled,
    pageSize,
    setPageSize
  } = usePagination({
    total: pokemonsTotal,
    limits: {
      outer: outerLimit,
      inner: innerLimit
    },
    initialState: {
      pageSize: 5,
      isDisabled: false,
      currentPage: 1
    }
  });

  //test
  const fetchPokemons = async (
    pageSize,
    offset
  ) => {
    return await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`
    ).then(async (res) => await res.json());
  };
  // effects
  useEffect(() => {
    fetchPokemons(pageSize, offset)
      .then((pokemons) => {
        setPokemonsTotal(pokemons.count);
        setPokemons(pokemons.results);
      })
      .catch((error) => console.log("App =>", error));
  }, [currentPage, pageSize, offset]);

  // handlers
  const handlePageChange = (nextPage) => {
    // -> request new data using the page number
    setCurrentPage(nextPage);
    console.log("request new data with ->", nextPage);
  };

  const handlePageSizeChange = (
    event
  ) => {
    const pageSize = Number(event.target.value);

    setPageSize(pageSize);
  };

  const handleDisableClick = () => {
    setIsDisabled((oldState) => !oldState);
  };
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

      <Box padding={'0px 100px 10px'}>
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
              <Box fontWeight={'bold'}>Carissa Amanda</Box>
              <Box fontSize={'13px'}>Tanggal lahir</Box>
              <Box fontWeight={'bold'}>22/02/1998 - 23 thn</Box>
            </Box>
            <Box >
              <Box fontSize={'13px'}>Alamat</Box>
              <Box fontWeight={'bold'}>2972 Westheimer Rd. Santa Ana, Illinois....</Box>
              <Box fontSize={'13px'}>Jenis kelamin</Box>
              <Box fontWeight={'bold'}>Jenis kelamin</Box>
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
              <TableContainer overflowY={'scroll'} overflowX={'scroll'} height='inherit'>
                <Table variant='striped' colorScheme={'gray'}>
                  <Thead color={'#5670CD'}>
                    <Tr>
                      <Td>Tanggal periksa</Td>
                      <Td>Layanan</Td>
                      <Td>Keluhan</Td>
                      <Td>Dokter</Td>
                      <Td>Diagnosa</Td>
                      <Td>Tindakan</Td>
                      <Td>Resep Dokter</Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {listPasien.map((r, i) => (
                      <Tr key={i}>
                        <Td>{r.time}</Td>
                        <Td>{r.service}</Td>
                        <Td>{r.problem}</Td>
                        <Td>{r.docter}</Td>
                        <Td>{r.diagnosa}</Td>
                        <Td>{r.tindakan}</Td>
                        <Td>{r.receipt}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            <Box paddingTop={'20px'}>
              <Pagination
                pagesCount={pagesCount}
                currentPage={currentPage}
                isDisabled={isDisabled}
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
                    {pages.map((page) => (
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
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MedicalRecord


const listPasien = [
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    service: 'Umum',
    problem: 'Batuk',
    docter: 'dr. abay',
    diagnosa: 'Demam berdarah',
    tindakan: 'Ganti perban',
    receipt: 'Paracetamol, Amox..',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    service: 'Umum',
    problem: 'Batuk',
    docter: 'dr. abay',
    diagnosa: 'Demam berdarah',
    tindakan: 'Ganti perban',
    receipt: 'Paracetamol, Amox..',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    service: 'Umum',
    problem: 'Batuk',
    docter: 'dr. abay',
    diagnosa: 'Demam berdarah',
    tindakan: 'Ganti perban',
    receipt: 'Paracetamol, Amox..',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    service: 'Umum',
    problem: 'Batuk',
    docter: 'dr. abay',
    diagnosa: 'Demam berdarah',
    tindakan: 'Ganti perban',
    receipt: 'Paracetamol, Amox..',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    service: 'Umum',
    problem: 'Batuk',
    docter: 'dr. abay',
    diagnosa: 'Demam berdarah',
    tindakan: 'Ganti perban',
    receipt: 'Paracetamol, Amox..',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    service: 'Umum',
    problem: 'Batuk',
    docter: 'dr. abay',
    diagnosa: 'Demam berdarah',
    tindakan: 'Ganti perban',
    receipt: 'Paracetamol, Amox..',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    service: 'Umum',
    problem: 'Batuk',
    docter: 'dr. abay',
    diagnosa: 'Demam berdarah',
    tindakan: 'Ganti perban',
    receipt: 'Paracetamol, Amox..',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    service: 'Umum',
    problem: 'Batuk',
    docter: 'dr. abay',
    diagnosa: 'Demam berdarah',
    tindakan: 'Ganti perban',
    receipt: 'Paracetamol, Amox..',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    service: 'Umum',
    problem: 'Batuk',
    docter: 'dr. abay',
    diagnosa: 'Demam berdarah',
    tindakan: 'Ganti perban',
    receipt: 'Paracetamol, Amox..',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    service: 'Umum',
    problem: 'Batuk',
    docter: 'dr. abay',
    diagnosa: 'Demam berdarah',
    tindakan: 'Ganti perban',
    receipt: 'Paracetamol, Amox..',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    service: 'Umum',
    problem: 'Batuk',
    docter: 'dr. abay',
    diagnosa: 'Demam berdarah',
    tindakan: 'Ganti perban',
    receipt: 'Paracetamol, Amox..',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    service: 'Umum',
    problem: 'Batuk',
    docter: 'dr. abay',
    diagnosa: 'Demam berdarah',
    tindakan: 'Ganti perban',
    receipt: 'Paracetamol, Amox..',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    service: 'Umum',
    problem: 'Batuk',
    docter: 'dr. abay',
    diagnosa: 'Demam berdarah',
    tindakan: 'Ganti perban',
    receipt: 'Paracetamol, Amox..',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    service: 'Umum',
    problem: 'Batuk',
    docter: 'dr. abay',
    diagnosa: 'Demam berdarah',
    tindakan: 'Ganti perban',
    receipt: 'Paracetamol, Amox..',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    service: 'Umum',
    problem: 'Batuk',
    docter: 'dr. abay',
    diagnosa: 'Demam berdarah',
    tindakan: 'Ganti perban',
    receipt: 'Paracetamol, Amox..',
    address: '516 Pawling Road'
  },
]