import { Box, Flex, Text, TableContainer, Table, Thead, Tr, Tbody, Td, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
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
import { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

const ListDataPatient = () => {
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
    <Box maxHeight={'430px'} height={'430px'} paddingTop={8} marginBottom={5}>
      <Box padding={'20px 20px 0 0'}>
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
          <TableContainer overflowY={'scroll'} overflowX={'scroll'} height='inherit'>
            <Table variant='striped' colorScheme={'gray'}>
              <Thead color={'#5670CD'}>
                <Tr>
                  <Td>Tanggal berobat</Td>
                  <Td>Nama lengkap pasien</Td>
                  <Td>Jenis Kelamin</Td>
                  <Td>Tanggal Lahir</Td>
                  <Td>Alamat Pasien</Td>
                </Tr>
              </Thead>
              <Tbody>
                {listPasien.map((r, i) => (
                  <Tr key={i}>
                    <Td>{r.time}</Td>
                    <Td fontWeight={'bold'}>{r.name}</Td>
                    <Td>{r.gender}</Td>
                    <Td>{r.birth}</Td>
                    <Td>{r.address}</Td>
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
              <PaginationNext
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
              </PaginationNext>
            </PaginationContainer>
          </Pagination>
        </Box>
      </Box>
    </Box>
  )
}

export default ListDataPatient


const listPasien = [
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    address: '516 Pawling Road'
  },
  {
    no: 1,
    time: '01-01-2022',
    name: 'Guy Hawkins',
    gender: 'Laki-laki',
    birth: '30-07-2020',
    address: '516 Pawling Road'
  },
]