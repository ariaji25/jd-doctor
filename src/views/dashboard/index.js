import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Stack, Text, Avatar, Image, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Show, Hide } from '@chakra-ui/react';
import Content from 'components/Content';
import Biodata from 'components/dashboard/biodata';
import DalamProses from 'components/dashboard/DalamProses';
import Navbar from 'components/dashboard/Navbar';
import Riwayat from 'components/dashboard/riwayat';
import Footer from 'components/Footer';
import LayananKami from 'components/home/LayananKami';
import PageContainer from 'components/PageContainer';
import { proxy, useSnapshot } from 'valtio';
import colors from 'values/colors';
import { Link } from 'react-router-dom';
import LogoWithText from 'components/LogoWithText';
import ButtonMain from 'components/button/ButtonMain';
import ListDataClinic from './components/ListDataClinic';
import ListSchedule from './components/ListSchedule';
import ListDataPatient from './components/ListDataPatient';
import SidebarDashboard from './components/SidebarDashboard';

const state = proxy({
  selectedTab: 1,
});

const tabs = [
  { id: 1, label: 'Hari ini' },
  { id: 2, label: 'Akan datang' },
];

const DashboardPage = () => {
  const { selectedTab } = useSnapshot(state);
  return (
    <>
      <PageContainer bg="unset">
        <Content>
          <Flex>
            <Box flex={3.5}>
              <Box padding={"32px 28px 16px 28px"}>
                <Box paddingBottom={'50px'}>
                  <Link to={"/landing"}>
                    <LogoWithText h={{ base: '10', md: '12' }} />
                  </Link>
                </Box>
                <Flex>
                  <ListDataClinic />
                  <ListSchedule state={state} selectedTab={selectedTab} tabs={tabs} />
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
