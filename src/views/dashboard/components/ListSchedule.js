import { useDisclosure, Box, Flex, Avatar, Image, Center, CircularProgress } from '@chakra-ui/react';
import colors from 'values/colors';
import ButtonMain from 'components/button/ButtonMain';
import SideModal from 'components/SideModal';
import DetailPatientModal from './DetailPatientModal';
import { useCallback, useEffect, useState } from 'react';
import EmptyComponent from 'components/EmptyComponent';
import { dateFormat, getCurrentUserFromStorage } from 'utils';
import apiDoctor from 'services/apiDoctor';
import { apiPatient } from 'services/apiPatient';
import { layananList, queryConditions } from 'utils/constant';

const ListSchedule = ({ state, selectedTab, tabs, isLoading, serviceHistory, totals }) => {
  const { isOpen, onToggle } = useDisclosure(false);
  const [selectedPatient, setSelectedPatient] = useState('')

  const [modalLoading, setModalLoading] = useState(false)

  const getPatientDetail = (ev) => {
    setModalLoading(true)
    apiPatient.getPatienDetailByID(ev.patientId).then((p) => {
      const data = {
        id: ev.patientId,
        name: p.attributes.find((a) => a.attribute === "HyfzjNVhlzM") ? p.attributes.find((a) => a.attribute === "HyfzjNVhlzM").value ?? '-' : '-',
        phone: p.attributes.find((a) => a.attribute === "NCLBUYYxnWU") ? p.attributes.find((a) => a.attribute === "NCLBUYYxnWU").value ?? '-' : '-',
        address: p.attributes.find((a) => a.attribute === "aRHSGgFeOjr") ? p.attributes.find((a) => a.attribute === "aRHSGgFeOjr").value ?? '-' : '-',
        photo: '/img/doctorSidebar.png',
        service: ev.service,
        serviceDate: ev.serviceDate,
        problem: ev.problem,
        serviceID: ev.event
      }
      setSelectedPatient(data)
      setModalLoading(false)
    }).catch(e => {
      setModalLoading(false)
      onToggle(false)
    })
  }

  console.log(totals);

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
              {r.label} <Flex style={state.selectedTab === r.id ? { background: 'white', color: colors.PRIMARY } : { background: colors.PRIMARY, color: 'white' }} padding={'0 6px'} fontSize={'12px'} margin={'3px'} alignItems={'center'} borderRadius={'12px'}>{totals ? totals[r.id] : 0}</Flex>
            </Flex>
          ))}
        </Flex>
        <Flex flex={2} justifyContent='space-between' flexDirection='column' overflowY={'scroll'}>
          {isLoading
            ? <Center><CircularProgress isIndeterminate size='100px' thickness='4px' /></Center>
            : serviceHistory.length > 0 ? serviceHistory.map((r, i) => (
              <Flex key={i} flex={1} justifyContent={'center'} gap={2} border={'1px solid #C4C4C4'} borderRadius={'5px'} margin={'14px 0px 0px 20px'}>
                <Box flex={1} padding={'13px 0 13px 13px'}>
                  <Avatar icon={<Image src={r.img} w='25px' />} color={'black'} bg={'transparent'} border={'1px solid #C0C0C0'} />
                </Box>
                <Flex flex={5} flexDirection={'column'} padding={'13px 13px 13px 0'}>
                  <Flex gap={1} justifyContent='end'>
                    <Box flex={3} color={colors.PRIMARY} fontWeight={'bold'} fontSize={'16px'}>{r.name} - {r.service}</Box>
                    <Flex flex={1} gap={1} height={'fit-content'} color={'red'} justifyContent={'end'} fontSize={'14px'}>
                      <Image
                        src="/icon/clockRed.svg"
                        alt="clock"
                        width={'15px'} />
                      <Box>{r.time}</Box>
                    </Flex>
                  </Flex>
                  <Box fontSize={'13px'}><b>Hari ini</b> - {r.schedule}</Box>
                  <Box fontSize={'13px'}>{r.problem}</Box>
                  <Box paddingTop={'6px'}>
                    <ButtonMain width={'100%'} onClick={() => {
                      getPatientDetail(r)
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
        isOpen={selectedPatient && isOpen}
        onToogle={onToggle}
        positionContent='center'
      >
        <DetailPatientModal data={selectedPatient} loading={modalLoading} />
      </SideModal>
    </>
  )
}

export default ListSchedule
