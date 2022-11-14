import { Box, Flex, Image, Divider, Center, CircularProgress, Avatar, Text } from '@chakra-ui/react';
import colors from 'values/colors';
import ButtonMain from 'components/button/ButtonMain';
import { FaPhone } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { keySelectedService, layananList, monthNames } from 'utils/constant';
import { useSnapshot } from 'valtio';
import stateInputMR, { clearStateInputMR } from 'states/stateInputMedicalRecord';
import stateBooking from 'states/stateBooking';
import { getInitial } from 'utils';

const DetailPatientModal = ({ data, loading }) => {
  const history = useHistory();
  console.log(data)

  const day = data.serviceDate && data.serviceDate.split("-")[2]
  const month = data.serviceDate && data.serviceDate.split("-")[2]

  return (
    <>
      {loading
        ? <Center><CircularProgress isIndeterminate size='100px' thickness='4px' /></Center>
        : <Flex mx="12" gap={2} flexDir={'column'} width={'100%'}>
          <Flex alignItems={'center'} flexDir='column'>
            <Avatar width={'100px'} height={'100px'} icon={<Text fontSize={'3xl'}>{getInitial(data.name)}</Text>} color={'black'} bg={'transparent'} border={'1px solid #C0C0C0'} />
            <Box>
              {data.name}
            </Box>
          </Flex>
          <Box>
            <ButtonMain width={'100%'} bg={'#27D1B2'} color={colors.PRIMARY} border={`1px solid #27D1B2 !important`}>
              <FaPhone /><span style={{ paddingLeft: '5px' }}>Hubungi</span>
            </ButtonMain>
          </Box>
          <Box>
            <ButtonMain width={'100%'} onClick={() => {
              clearStateInputMR()
              stateInputMR.serviceDetail = data
              history.push(`/dashboard/medical-record/${data.id}`)
            }}>
              Periksa
            </ButtonMain>
          </Box>
          <Box padding={'8px 0'}>
            <Box fontSize={'13px'}>Jadwal janji temu</Box>
            <Flex color={colors.PRIMARY} justifyContent={'space-between'} borderBottom={'1px solid #C0C0C0'} paddingBottom={2}>
              <Flex alignItems={'center'}>
                <Box fontSize={'38px'} paddingRight={1} fontWeight='bold'>{day}</Box>
                <Box fontSize={'13px'}>
                  <Box fontWeight='bold'>{monthNames[new Date(data.serviceDate).getMonth()]}</Box>
                  <Box>{new Date(data.serviceDate).getFullYear()} - Hari ini</Box>
                </Box>
              </Flex>
              <Box padding={'0 5px'}>
                <Divider orientation='vertical' border={'1px solid #C0C0C0'} />
              </Box>
              <Flex alignItems={'center'} justifyContent='center' fontSize={'13px'} gap={3}>
                <Box>
                  <Image
                    alt='patient-photo'
                    src={layananList.find(e => e.label === data.service) ? layananList.find(e => e.label === data.service).icon ?? layananList[0].icon : layananList[0].icon}
                    cursor={'pointer'}
                    width={50}
                  />
                </Box>
                <Box>{data.service}</Box>
              </Flex>
            </Flex>
          </Box>
          <Flex flexDir={'column'} gap={3} borderBottom={'1px solid #C0C0C0'} paddingBottom={4}>
            <Box fontSize={'13px'}>Keluhan yang anda rasakan</Box>
            <Box color={colors.PRIMARY} fontWeight='bold'>{data.problem}</Box>
          </Flex>
          <Flex flexDir={'column'} gap={2}>
            <Box fontSize={'13px'}>Alamat janji temu</Box>
            <Box color={colors.PRIMARY} >{data.address}</Box>
            <Flex justifyContent={'center'} fontSize={'13px'} color={colors.PRIMARY} border={`1px solid ${colors.PRIMARY}`} borderStyle='dashed' padding={4}>
              <Image
                alt='patient-photo'
                src='/icon/gmaps-pin.svg'
                cursor={'pointer'}
              />
              <Box paddingLeft={1}>
                Lihat di Google maps
              </Box>
            </Flex>
          </Flex>
        </Flex>}
    </>
  )
}

export default DetailPatientModal