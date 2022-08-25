import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
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

const state = proxy({
  selectedTab: 0,
});

const tabs = [
  { id: 1, label: 'Biodata' },
  { id: 2, label: 'Riwayat' },
  { id: 3, label: 'Dalam Proses' },
];

const DashboardPage = () => {
  const { selectedTab } = useSnapshot(state);

  return (
    <>
      <PageContainer bg="unset">
        <Navbar />
        <Content>
          <Box px="2" mb="8">
            <LayananKami
              subtitle="Pilih layanan sesuai dengan keluhan Anda"
              maxW="8xl"
              titleAlign="left"
            />
          </Box>

          <Box maxW="8xl" mx="auto" px={{ base: 0, md: '2' }}>
            <Tabs
              onChange={(tabId) => {
                state.selectedTab = tabId;
              }}
            >
              <TabList>
                {tabs.map((t) => (
                  <Tab
                    key={`tab-${t.id}`}
                    _focus={{ outline: 'none' }}
                    _selected={{ bg: colors.PRIMARY, color: 'white' }}
                    // bg={selectedTab === t.id ? colors.PRIMARY : 'unset'}
                    // color={selectedTab === t.id ? 'white' : colors.PRIMARY}
                    borderTopRadius="5px"
                  >
                    {t.label}
                  </Tab>
                ))}
              </TabList>

              <TabPanels>
                <TabPanel p="0">
                  <Biodata />
                </TabPanel>
                <TabPanel>
                  <Riwayat />
                </TabPanel>
                <TabPanel>
                  <DalamProses />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Content>
        <Footer />
      </PageContainer>
    </>
  );
};

export default DashboardPage;
