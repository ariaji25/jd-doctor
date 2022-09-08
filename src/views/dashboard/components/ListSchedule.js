import { useDisclosure, Box, Flex, Avatar, Image, Center, CircularProgress } from '@chakra-ui/react';
import colors from 'values/colors';
import ButtonMain from 'components/button/ButtonMain';
import SideModal from 'components/SideModal';
import DetailPatientModal from './DetailPatientModal';
import { useCallback, useEffect, useState } from 'react';
import EmptyComponent from 'components/EmptyComponent';
import { dateFormat, getCurrentUserFromStorage } from 'utils';
import apiDoctor from 'services/apiDoctor';

const ListSchedule = ({ state, selectedTab, tabs }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [selectedPatient, setSelectedPatient] = useState('')

  const [serviceHistory, setServiceHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getServiceHistory = () => {
    console.log("DoctorId", getCurrentUserFromStorage().id)
    console.log("Date", dateFormat(new Date(), "yyyy-MM-dd"))
    apiDoctor.getHomeCareServiceHistory(
      dateFormat(new Date(), "yyyy-MM-dd"),
      getCurrentUserFromStorage().id
    ).then((r) => {
      console.log("ResponseHistory", r);
      var i = 1;
      const filter = (a) => {
        const aTime = new Date(`${dateFormat(new Date(), "yyyy-MM-dd")}T${a.time}:00`)
        const timenow = new Date()
        console.log(aTime.getTime() < timenow.getTime())
        return aTime.getTime() >= timenow.getTime();
      }
      var history = r.events.map((ev) => {
        const data = {
          id: i,
          img: '/img/doctorSidebar.png',
          name: ev.dataValues.find((e) => e.dataElement === 'FwdxzpQ8w2I') ? ev.dataValues.find((e) => e.dataElement === 'FwdxzpQ8w2I').value ?? '-' : '-',
          address: ev.dataValues.find((e) => e.dataElement === 'o8Yd7t1qNk6') ? ev.dataValues.find((e) => e.dataElement === 'o8Yd7t1qNk6').value ?? '-' : '-',
          schedule: ev.dataValues.find((e) => e.dataElement === 'X7GUfsOErZh') ? ev.dataValues.find((e) => e.dataElement === 'X7GUfsOErZh').value ?? '-' : '-',
          problem: ev.dataValues.find((e) => e.dataElement === 'Yh6ylx8D3tO') ? ev.dataValues.find((e) => e.dataElement === 'Yh6ylx8D3tO').value ?? '-' : '-',
        }
        i++;
        return data;
      })
      console.log("Response", history)
      history = history.filter(filter)
      setServiceHistory(history)
      setIsLoading(false)
    }).catch(e => {
      setIsLoading(false)
    })
  }

  const init = useCallback(() => {
    setIsLoading(true)
    getServiceHistory();
  }, [])

  useEffect(() => {
    init()
  }, [init])

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
          {isLoading
            ? <Center><Center><CircularProgress isIndeterminate size='100px' thickness='4px' /></Center></Center>
            : serviceHistory.length > 0 ? serviceHistory.map((r, i) => (
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

