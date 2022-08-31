import { useDisclosure, Box, Flex, Avatar, Image, Center } from '@chakra-ui/react';
import colors from 'values/colors';
import ButtonMain from 'components/button/ButtonMain';
import SideModal from 'components/SideModal';
import DetailPatientModal from './DetailPatientModal';
import { useState } from 'react';
import EmptyComponent from 'components/EmptyComponent';

const ListSchedule = ({ state, selectedTab, tabs }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [selectedPatient, setSelectedPatient] = useState('')

  return (
    <>
      <Flex flexDirection={'column'} flex={3} maxWidth='500px' maxHeight={'468px'} width={'468px'} alignSelf={'flex-start'}>
        <Flex flex={2} justifyContent='space-between' borderBottom={'1px solid #C0C0C0'} textAlign={'center'}>
          <Box whiteSpace='pre' flex={'auto'} textAlign={'left'} fontSize={'18px'} fontWeight={'bold'} color={colors.PRIMARY} padding={'5px'}>Homecare</Box>
          {tabs && tabs.map((r) => (
            <Flex flex={1} alignItems={'center'} justifyContent={'center'} cursor={'pointer'} style={state.selectedTab === r.id ? { background: colors.PRIMARY, color: 'white', borderRadius: '6px 6px 0 0' } : {}} whiteSpace='pre' padding={'5px'}
              onClick={() => {
                state.selectedTab = r.id
              }}
            >
              {r.label} <Flex style={state.selectedTab === r.id ? { background: 'white', color: colors.PRIMARY } : { background: colors.PRIMARY, color: 'white' }} padding={'0 6px'} fontSize={'12px'} margin={'3px'} alignItems={'center'} borderRadius={'12px'}>2</Flex>
            </Flex>
          ))}
        </Flex>
        <Flex flex={2} justifyContent='space-between' flexDirection='column' overflowY={'scroll'}>
          {listRawats.length > 0 ? listRawat.map((r, i) => (
            <Flex key={i} flex={1} justifyContent={'center'} gap={2} border={'1px solid #C4C4C4'} borderRadius={'5px'} margin={'14px 0px 0px 20px'}>
              <Box flex={1} padding={'13px 0 13px 13px'}>
                <Avatar name={r.name} src={r.img} color={'black'} bg={'transparent'} border={'1px solid #C0C0C0'} />
              </Box>
              <Flex flex={5} flexDirection={'column'} padding={'13px 13px 13px 0'}>
                <Flex gap={1} justifyContent='end'>
                  <Box flex={3} color={colors.PRIMARY} fontWeight={'bold'} fontSize={'16px'}>{r.name} - {r.problem}</Box>
                  <Flex flex={1} gap={1} height={'fit-content'} color={'red'} justifyContent={'end'} fontSize={'14px'}>
                    <Image
                      src="/icon/clockRed.svg"
                      alt="clock"
                      width={'15px'} />
                    <Box>{r.time}</Box>
                  </Flex>
                </Flex>
                <Box fontSize={'13px'}><b>Hari ini</b> - {r.schedule}</Box>
                <Box fontSize={'13px'}>{r.address}</Box>
                <Box paddingTop={'6px'}>
                  <ButtonMain width={'100%'} onClick={() => {
                    setSelectedPatient(r)
                    onToggle(!isOpen)
                  }}>
                    Detail
                  </ButtonMain>
                </Box>
              </Flex>
            </Flex>
          ))
            :
            <Center minH={'430px'}>
              <EmptyComponent
                src={'/img/empty-state-homecare.svg'}
                caption={'Jadwal Homecare masih kosong'}
              />
            </Center>
          }
        </Flex>
      </Flex>
      <SideModal
        title={'Detail Pasien'}
        isOpen={isOpen}
        onToogle={onToggle}
        positionContent='center'
      >
        <DetailPatientModal data={selectedPatient} />
      </SideModal>
    </>
  )
}

export default ListSchedule

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
  },
  {
    id: 1,
    img: '/img/doctorSidebar.png',
    name: 'Andrew',
    problem: 'Perawatan luka',
    time: '15.00',
    schedule: '01:00 Wib',
    address: 'Jl. Anugrah No.12 - Medan',
  },
  {
    id: 1,
    img: '/img/doctorSidebar.png',
    name: 'Andrew',
    problem: 'Perawatan luka',
    time: '15.00',
    schedule: '01:00 Wib',
    address: 'Jl. Anugrah No.12 - Medan',
  },
  {
    id: 1,
    img: '/img/doctorSidebar.png',
    name: 'Andrew',
    problem: 'Perawatan luka',
    time: '15.00',
    schedule: '01:00 Wib',
    address: 'Jl. Anugrah No.12 - Medan',
  },
  {
    id: 1,
    img: '/img/doctorSidebar.png',
    name: 'Andrew',
    problem: 'Perawatan luka',
    time: '15.00',
    schedule: '01:00 Wib',
    address: 'Jl. Anugrah No.12 - Medan',
  },
]

