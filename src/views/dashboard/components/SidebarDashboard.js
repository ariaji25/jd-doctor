import { Box, Flex, Avatar, Image, Center, MenuButton, MenuList, Menu, MenuItem, Text, Stack, CircularProgress, Divider } from '@chakra-ui/react';
import colors from 'values/colors';
import ButtonMain from 'components/button/ButtonMain';
import { FiCheckCircle, FiHardDrive, FiLogOut, FiUser, FiXCircle } from 'react-icons/fi'
import Calendar from 'react-calendar';
import { useCallback, useEffect, useState } from 'react'
import { dateFormat, getCurrentUserFromStorage } from 'utils';
import EmptyComponent from 'components/EmptyComponent';
import apiOtp from 'services/apiOtp';
import { useHistory } from 'react-router-dom';
import apiDoctor from 'services/apiDoctor';
import { layananList } from 'utils/constant';

const SidebarDashboard = () => {
  const history = useHistory()
  const [value, onChange] = useState(new Date());
  const [isOpenLogout, setOpenLogout] = useState(false);
  const onLogout = () => {
    apiDoctor.logOut()
  };

  const [serviceHistory, setServiceHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getServiceHistory = () => {
    console.log("DoctorId", getCurrentUserFromStorage().id)
    console.log("Date", dateFormat(new Date(), "yyyy-MM-dd"))

    apiDoctor.getServiceNotifications(
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
          id: 1,
          img: '/img/doctorSidebar.png',
          name: ev.dataValues.find((e) => e.dataElement === 'FwdxzpQ8w2I') ? ev.dataValues.find((e) => e.dataElement === 'FwdxzpQ8w2I').value ?? '-' : '-',
          problem: ev.dataValues.find((e) => e.dataElement === 'Yh6ylx8D3tO') ? ev.dataValues.find((e) => e.dataElement === 'Yh6ylx8D3tO').value ?? '-' : '-',
          time: ev.dataValues.find((e) => e.dataElement === 'X7GUfsOErZh') ? ev.dataValues.find((e) => e.dataElement === 'X7GUfsOErZh').value ?? '-' : '-',
          schedule: ev.dataValues.find((e) => e.dataElement === 'X7GUfsOErZh') ? ev.dataValues.find((e) => e.dataElement === 'X7GUfsOErZh').value ?? '-' : '-',
          service: ev.dataValues.find((e) => e.dataElement === 'o8Yd7t1qNk6') ? ev.dataValues.find((e) => e.dataElement === 'o8Yd7t1qNk6').value ?? '-' : '-',
          nohp: '087755906130'
        };
        data.img = layananList.find(a => a.label === data.service).icon
        i++;
        return data;
      })
      console.log("Response", history)
      // history = history.filter(filter)
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
    <Box flex={1.3} maxWidth='500px' background={'#E5E5E5'} paddingBottom={'20px'}>
      {/* <Hide breakpoint='(max-width: 1100px)'> */}
      <Stack margin={"32px 20px 0 20px"} gap={0}>
        <Flex onClick={() => setOpenLogout(!isOpenLogout)} cursor={'pointer'} background='white' justifyContent={'center'} gap={5} border={'1px solid #C4C4C4'} borderRadius={'5px'}>
          <Box padding={"15px 0"}>
            <Avatar size='lg' name='dr. Jane Doe' src={'/img/doctorSidebar.png'} color={'black'} bg={'transparent'} border={'1px solid #C0C0C0'} />
          </Box>
          <Flex flexDirection={'column'} padding={"15px 0"} justifyContent={'center'} lineHeight={1}>
            <Box>Halo dokter,</Box>
            <Box fontSize={'20px'} fontWeight={'bold'}>{getCurrentUserFromStorage() ? getCurrentUserFromStorage().nama ?? "-" : "-"}</Box>
          </Flex>
        </Flex>
        {isOpenLogout &&
          <Stack margin={"0px 1px 10px 1px !important"} cursor={'pointer'} background='white' borderRadius={'0 0px 5px 5px'} padding={'20px'}>
            <Flex onClick={() => history.push('/dashboard/profile')} alignItems={'center'} gap={3} fontSize={'18px'} fontWeight={'bold'} >
              <Box>
                <FiUser />
              </Box>
              <Box>
                Edit profile
              </Box>
            </Flex>
            <Flex onClick={() => history.push('/recovery-password')} alignItems={'center'} gap={3} fontSize={'18px'} fontWeight={'bold'} >
              <Box><FiHardDrive /></Box>
              <Box>
                Ubah password
              </Box>
            </Flex>
            <Box>
              <Divider border={'2px solid #C0C0C0'} />
            </Box>
            <Flex onClick={onLogout} alignItems={'center'} gap={3} fontSize={'18px'} color='red' fontWeight={'bold'} >
              <Box>
                Keluar
              </Box>
            </Flex>
          </Stack>
        }
      </Stack>
      <Box margin={"32px 20px 16px 20px"}>
        <Flex fontSize={'18px'} fontWeight={'bold'} color={'#505050'} gap={1} alignItems={'center'} paddingBottom={'14px'}>
          <Box>
            <Image src='/icon/bell.svg' />
          </Box>
          <Box>
            Notifikasi
          </Box>
          {serviceHistory.length > 0 ? <Flex bg={'red'} color={'white'} padding={'0 6px'} fontSize={'14px'} margin={'3px'} alignItems={'center'} borderRadius={'12px'}>{serviceHistory.length}</Flex> : <></>}
        </Flex>
        <Flex flex={2} justifyContent='space-between' flexDirection='column' overflowY={'scroll'} maxHeight={'568px'}>
          {isLoading
            ? <Center><CircularProgress isIndeterminate size='100px' thickness='4px' /></Center>
            : serviceHistory.length > 0 ? serviceHistory.map((r, i) => (
              <Box key={i} bg={'white'} border={'1px solid #C4C4C4'} borderRadius={'5px'} margin={'6px 0px'} padding={'13px 0 13px 13px'}>
                <Box flex={3} color={colors.PRIMARY} fontWeight={'bold'} fontSize={'16px'}>{r.name} - {r.service}</Box>
                <Box borderBottom={'1px solid #EFEFEF'} paddingBottom={'4px'} fontSize={'13px'}>
                  <b>Hari ini</b> - {r.schedule}
                </Box>
                <Flex flex={1} justifyContent={'center'} gap={2} paddingTop={'8px'}>
                  <Box flex={1} >
                    <Avatar icon={<Image src={r.img} w='25px' />} color={' black'} bg={'transparent'} border={'1px solid #C0C0C0'} />
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
                    <Box fontSize={'13px'}>{r.problem}</Box>
                    {/* <Flex gap={2} paddingTop={'6px'}>
                      <ButtonMain width={'100%'}>
                        <FiCheckCircle />Terima
                      </ButtonMain>
                      <ButtonMain width={'100%'} bg="white" color={colors.PRIMARY}>
                        <FiXCircle /> Tolak
                      </ButtonMain>
                    </Flex> */}
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
