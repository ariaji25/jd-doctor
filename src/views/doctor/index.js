import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';
import Content from 'components/Content';
import Footer from 'components/Footer';
import Header from 'components/Header';
import PageContainer from 'components/PageContainer';
import SearchComponent from 'components/Search';
import qs from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import colors from 'values/colors';
import dataDoctor from 'values/dataDoctor';

const DoctorItem = ({ data, selected }) => {
  return (
    <>
      <Flex
        cursor="pointer"
        _hover={{ bg: "#F5F5F5" }}
        bg={selected === data.id ? "#F5F5F5" : colors.WHITE}
        w="full"
        mr="2"
        onClick={() => {
          window.browserHistory.push(`/doctor/${data.id}`);
        }}>
        <Image src={data.img} maxW="102px" />
        <Center ml="4">
          <Box>
            <Text
              color={colors.PRIMARY}
              fontWeight="bold">
              {data.name}
            </Text>
            <Text>
              {data.tipe}
            </Text>
          </Box>
        </Center>
      </Flex>
    </>
  );
};

const DoctorDetail = ({ data }) => {
  return (
    <>
      <Text
        mb="4"
        fontSize={['xl', '2xl']}
        color={colors.HITAM_PUDAR}
        fontWeight="extrabold">
        Detail dokter
      </Text>
      <Flex
        justifyContent="start"
        wrap="wrap">
        {!data ?
          <Text>Kami tidak menemukan data dokter.</Text>
          :
          <>
            <Image
              m="4"
              maxW="220px"
              maxH="220px"
              src={data.img} />
            <Box maxW="750px">
              <Text
                w="full"
                fontSize="24pt"
                color={colors.PRIMARY}
                fontWeight="bold">
                {data.name}
              </Text>
              <Text mb="4">
                {data.tipe}
              </Text>
              {/* <Table>
                <Tbody>
                  {data.str && <Tr>
                    <Td border="none"><Text>No STR</Text></Td>
                    <Td border="none"><Text>{data.str}</Text></Td>
                  </Tr>
                  }
                  {data.sip &&
                    <Tr>
                      <Td border="none"><Text>No SIP</Text></Td>
                      <Td border="none"><Text>{data.sip}</Text></Td>
                    </Tr>
                  }
                  <Tr>
                    <Td border="none"><Text>Jenis kelamin</Text></Td>
                    <Td border="none"><Text>{data.gender}</Text></Td>
                  </Tr>
                  <Tr>
                    <Td border="none"><Text>Nama lengkap</Text></Td>
                    <Td border="none"><Text>{data.name}</Text></Td>
                  </Tr>
                  <Tr>
                    <Td border="none"><Text>Pendidikan</Text></Td>
                    <Td border="none">
                      <UnorderedList >
                        {data.education && data.education.length > 0 && data.education.map((edu, i) => {
                          return (
                            <ListItem key={i}>{edu}</ListItem>
                          );
                        })}
                      </UnorderedList>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
              <hr />
              <Text
                mt="4"
                mb="4"
                color={colors.PRIMARY}
                fontWeight="bold"
                fontSize={18}>
                Pengalaman kerja
              </Text>
              <UnorderedList >
                {data.work_exp && data.work_exp.length > 0 && data.work_exp.map((work, i) => {
                  return (
                    <ListItem fontSize={12} key={i}>{work}</ListItem>
                  );
                })}
              </UnorderedList> */}
            </Box>
          </>
        }
      </Flex>
    </>
  );
};

const DoctorPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const query = qs.parse(location.search);
  const [search, setSearch] = useState('');

  const init = () => {
    const searchVal = (query && query.search);

    if (id) {
      const data = dataDoctor.find(item => item.id === id);

      setSelectedDoctor(data);
    } else if (searchVal) {
      setSearch(searchVal);
      filter(searchVal);
    }
  };

  const filter = (searchVal) => {
    setSelectedDoctor();
    const data = dataDoctor
      .find(val => val.name.toLowerCase().includes(searchVal));

    setSelectedDoctor(data);
  };

  useEffect(() => {
    init();

    // eslint-disable-next-line
  }, [id, query.search]);

  return (
    <>
      <PageContainer
        bg="white">
        <Header />
        <Content>
          <Flex justifyContent="center" mt="4" mb="4">
            <SearchComponent
              val={search}
              title={"Cari Dokter"}
              placeholder={""}
              onChange={e => {
                setSearch(e);
                // Clear search before do a search
                const path = location.pathname.split("/")[1];
                if (path && (search || id)) {
                  history.replace(`/${path}`);
                }

                filter(e);
              }}
            />
          </Flex>
          <Flex
            justifyContent="center">
            <Box
              display={{ base: 'none', xl: 'inline-block' }}
              borderRight='1px solid #e6e6e6'
              p="4"
              mr="4">
              {dataDoctor.map((data, i) => {
                return (
                  <DoctorItem
                    key={i}
                    data={data}
                    selected={selectedDoctor && selectedDoctor.id}
                  />
                );
              })}
            </Box>
            <Box>
              <DoctorDetail data={selectedDoctor} />
            </Box>
          </Flex>
        </Content>
        <Footer />
      </PageContainer>
    </>
  );
};

export default DoctorPage;