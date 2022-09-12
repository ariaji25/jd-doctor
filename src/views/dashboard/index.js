import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Stack, Text, Avatar, Image, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Show, Hide } from '@chakra-ui/react';
import Content from 'components/Content';
import PageContainer from 'components/PageContainer';
import { proxy, useSnapshot } from 'valtio';
import { Link } from 'react-router-dom';
import LogoWithText from 'components/LogoWithText';
import ListDataClinic from './components/ListDataClinic';
import ListSchedule from './components/ListSchedule';
import ListDataPatient from './components/ListDataPatient';
import SidebarDashboard from './components/SidebarDashboard';
import { dateFormat, getCurrentUserFromStorage } from 'utils';
import apiDoctor from 'services/apiDoctor';
import { layananList, queryConditions } from 'utils/constant';
import { useCallback, useEffect, useState } from 'react';

const state = proxy({
  selectedTab: 1,
});

const tabs = [
  { id: 1, label: 'Hari ini' },
  { id: 2, label: 'Akan datang' },
];

const DashboardPage = () => {
  const { selectedTab } = useSnapshot(state);
  const [isLoading, setIsLoading] = useState(false);
  const [todayService, setTodayService] = useState([])
  const [inComingService, setIncomingService] = useState([])
  const [totals, setTotals] = useState([0, 0])

  const getServiceHistory = (query, onComplete) => {
    console.log("DoctorId", getCurrentUserFromStorage().id)
    console.log("Date", dateFormat(new Date(), "yyyy-MM-dd"))
    apiDoctor.getHomeCareServiceHistory(
      dateFormat(new Date(), "yyyy-MM-dd"),
      getCurrentUserFromStorage().id,
      query ?? queryConditions.equal
    ).then((r) => {
      console.log("ResponseHistory", r);
      var i = 1;
      var history = r.events.map((ev) => {
        const data = {
          id: i,
          patientId: ev.trackedEntityInstance,
          img: '/img/doctorSidebar.png',
          name: ev.dataValues.find((e) => e.dataElement === 'FwdxzpQ8w2I') ? ev.dataValues.find((e) => e.dataElement === 'FwdxzpQ8w2I').value ?? '-' : '-',
          schedule: ev.dataValues.find((e) => e.dataElement === 'X7GUfsOErZh') ? ev.dataValues.find((e) => e.dataElement === 'X7GUfsOErZh').value ?? '-' : '-',
          problem: ev.dataValues.find((e) => e.dataElement === 'Yh6ylx8D3tO') ? ev.dataValues.find((e) => e.dataElement === 'Yh6ylx8D3tO').value ?? '-' : '-',
          service: ev.dataValues.find((e) => e.dataElement === 'o8Yd7t1qNk6') ? ev.dataValues.find((e) => e.dataElement === 'o8Yd7t1qNk6').value ?? '-' : '-',
        }

        data.img = layananList.find(a => a.label === data.service).icon
        i++;
        return data;
      })
      console.log("Response", history)
      // history = history.filter(filter)
      onComplete(history)
      setIsLoading(false)
    }).catch(e => {
      setIsLoading(false)
    })
  }
  const init = useCallback(() => {
    setIsLoading(true)
    getServiceHistory(queryConditions.equal, (h) => {
      setTotals([h.length], totals[1])
      setTodayService(h)
    })
    getServiceHistory(queryConditions.greaterThen, (h) => {
      setTotals([totals[0], h.length])
      setTodayService(h)
    })
  }, [])

  useEffect(() => {
    init()
  }, [init])

  return (
    <>
      <PageContainer bg="unset">
        <Content>
          <Flex>
            <Box flex={3.5}>
              <Box padding={"32px 28px 16px 28px"}>
                <Box paddingBottom={'50px'}>
                  <Link to={"/"}>
                    <LogoWithText h={{ base: '10', md: '12' }} />
                  </Link>
                </Box>
                <Flex>
                  <ListDataClinic />
                  <ListSchedule state={state} selectedTab={selectedTab} tabs={tabs} isLoading={isLoading} serviceHistory={state.selectedTab === 1 ? todayService ?? [] : inComingService ?? []} totals={totals} />
                </Flex>
                <Box>
                  <ListDataPatient />
                </Box>
              </Box>
            </Box>
            <SidebarDashboard />
          </Flex>
        </Content>
      </PageContainer>
    </>
  );
};

export default DashboardPage;
