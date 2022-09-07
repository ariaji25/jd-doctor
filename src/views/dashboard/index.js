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
                  <Link to={"/"}>
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
