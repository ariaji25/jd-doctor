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
import { FiFilter, FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

const ListCompPatientClinic = () => {
  const history = useHistory();

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
            <BreadcrumbLink textDecor={'underline'} onClick={() => history.push('/dashboard')}
            >Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color={colors.PRIMARY} fontWeight={'bold'}>Semua data pasien klinik</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Box padding={'0px 100px 10px'}>
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
                      <Td>Dokter</Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {listKlinik.map((r, i) => (
                      <Tr key={i}>
                        <Td>{r.time}</Td>
                        <Td>{r.service}</Td>
                        <Td fontWeight={'bold'}>{r.name}</Td>
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

export default ListCompPatientClinic

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