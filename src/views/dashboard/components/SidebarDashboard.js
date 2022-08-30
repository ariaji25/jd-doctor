import { Box, Flex, Avatar, Image, Center } from '@chakra-ui/react';
import colors from 'values/colors';
import ButtonMain from 'components/button/ButtonMain';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'
import Calendar from 'react-calendar';
import { useState } from 'react'
import EmptyComponent from 'components/EmptyComponent';

const SidebarDashboard = () => {
  const [value, onChange] = useState(new Date());

  return (
    <Box flex={1.3} maxWidth='500px' background={'#E5E5E5'} paddingBottom={'20px'}>
      {/* <Hide breakpoint='(max-width: 1100px)'> */}
      <Flex margin={"32px 20px 16px 20px"} background='white' justifyContent={'center'} gap={5} border={'1px solid #C4C4C4'} borderRadius={'5px'}>
        <Box padding={"15px 0"}>
          <Avatar size='lg' name='dr. Jane Doe' src={'/img/doctorSidebar.png'} color={'black'} bg={'transparent'} border={'1px solid #C0C0C0'} />
        </Box>
        <Flex flexDirection={'column'} padding={"15px 0"} justifyContent={'center'} lineHeight={1}>
          <Box>Halo dokter,</Box>
          <Box fontSize={'20px'} fontWeight={'bold'}>dr. Jane Doe</Box>
        </Flex>
      </Flex>
      <Box margin={"32px 20px 16px 20px"}>
        <Flex fontSize={'18px'} fontWeight={'bold'} color={'#505050'} gap={1} alignItems={'center'} paddingBottom={'14px'}>
          <Box>
            <Image src='/icon/bell.svg' />
          </Box>
          <Box>
            Notifikasi
          </Box>
          <Flex bg={'red'} color={'white'} padding={'0 6px'} fontSize={'14px'} margin={'3px'} alignItems={'center'} borderRadius={'12px'}>2</Flex>
        </Flex>
        <Flex flex={2} justifyContent='space-between' flexDirection='column' overflowY={'scroll'} maxHeight={'568px'}>
          {listRawats.length > 0 ? listRawat.map((r, i) => (
            <Box key={i} bg={'white'} border={'1px solid #C4C4C4'} borderRadius={'5px'} margin={'6px 0px'} padding={'13px 0 13px 13px'}>
              <Box flex={3} color={colors.PRIMARY} fontWeight={'bold'} fontSize={'16px'}>{r.name} - {r.problem}</Box>
              <Box borderBottom={'1px solid #EFEFEF'} paddingBottom={'4px'} fontSize={'13px'}>
                <b>Hari ini</b> - {r.schedule}
              </Box>
              <Flex flex={1} justifyContent={'center'} gap={2} paddingTop={'8px'}>
                <Box flex={1} >
                  <Avatar name={r.name} src={r.img} color={'black'} bg={'transparent'} border={'1px solid #C0C0C0'} />
                </Box>
                <Flex flex={5} flexDirection={'column'} padding={'13px 13px 13px 0'}>
                  <Flex gap={1} justifyContent='end'>
                    <Box flex={3} color={colors.PRIMARY} fontWeight={'bold'} fontSize={'13px'}>{r.name}</Box>
                    <Flex flex={1} gap={1} height={'fit-content'} color={'red'} justifyContent={'end'} fontSize={'14px'}>
                      <Image
                        src="/icon/clockRed.svg"
                        alt="clock"
                        width={'15px'} />
                      <Box>{r.time}</Box>
                    </Flex>
                  </Flex>
                  <Box fontSize={'13px'} fontWeight={'bold'}>{r.nohp}</Box>
                  <Box fontSize={'13px'}>{r.address}</Box>
                  <Flex gap={2} paddingTop={'6px'}>
                    <ButtonMain width={'100%'}>
                      <FiCheckCircle />Terima
                    </ButtonMain>
                    <ButtonMain width={'100%'} bg="white" color={colors.PRIMARY}>
                      <FiXCircle /> Tolak
                    </ButtonMain>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          ))
            :
            <Center minH={'460px'}>
              <EmptyComponent
                src={'/img/empty-state-notif.svg'}
                caption={'Belum ada notifikasi Homecare'}
                width={20}
              />
            </Center>
          }
        </Flex>
      </Box>
      <Flex margin={"32px 20px 16px 20px"} borderRadius={'5px'} flexDirection={'column'}>
        <Flex fontSize={'18px'} fontWeight={'bold'} color={'#505050'} gap={1} alignItems={'center'} paddingBottom={'14px'}>
          <Box>
            <Image src='/icon/bell.svg' />
          </Box>
          <Box>
            Calendar
          </Box>
        </Flex>
        <Calendar onChange={onChange} value={value} />
      </Flex>
      {/* </Hide> */}
    </Box>
  )

}

export default SidebarDashboard

const listRawats = []

const listRawat = [
  {
    id: 1,
    img: '/img/doctorSidebar.png',
    name: 'Andrew',
    problem: 'Perawatan luka',
    time: '15.00',
    schedule: '01:00 Wib',
    address: 'Jl. Anugrah No.12 - Medan',
    nohp: '087755906130'
  },
  {
    id: 1,
    img: '/img/doctorSidebar.png',
    name: 'Andrew',
    problem: 'Perawatan luka',
    time: '15.00',
    schedule: '01:00 Wib',
    address: 'Jl. Anugrah No.12 - Medan',
    nohp: '087755906130'
  },
  {
    id: 1,
    img: '/img/doctorSidebar.png',
    name: 'Andrew',
    problem: 'Perawatan luka',
    time: '15.00',
    schedule: '01:00 Wib',
    address: 'Jl. Anugrah No.12 - Medan',
    nohp: '087755906130'
  },
  {
    id: 1,
    img: '/img/doctorSidebar.png',
    name: 'Andrew',
    problem: 'Perawatan luka',
    time: '15.00',
    schedule: '01:00 Wib',
    address: 'Jl. Anugrah No.12 - Medan',
    nohp: '087755906130'
  },
  {
    id: 1,
    img: '/img/doctorSidebar.png',
    name: 'Andrew',
    problem: 'Perawatan luka',
    time: '15.00',
    schedule: '01:00 Wib',
    address: 'Jl. Anugrah No.12 - Medan',
    nohp: '087755906130'
  },
]


