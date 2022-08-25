import { Box, Image, Text } from '@chakra-ui/react';
import ButtonMain from 'components/button/ButtonMain';
import ButtonOutlined from 'components/button/ButtonOutlined';
import Content from 'components/Content';
import BuktiPesanan from 'components/download/BuktiPesanan';
import Footer from 'components/Footer';
import HeaderClean from 'components/HeaderClean';
import PageContainer from 'components/PageContainer';
import { useRef } from 'react';
import Pdf from "react-to-pdf";
import stateBooking from 'states/stateBooking';
import { useSnapshot } from 'valtio';

const SummaryPage = () => {
  const contentRef = useRef(null);

  const StateBooking = useSnapshot(stateBooking);

  return (
    <div>
      <PageContainer bg="unset">
        <HeaderClean withBackButton withoutLogo />
        <Content>
          <Box maxW="md" mx="auto">
            <div>
              <BuktiPesanan contentRef={contentRef} />
              {StateBooking.tipeLayanan === "Palayanan di rumah"
                ? <div></div>
                : <Box w="full">
                  <Pdf
                    targetRef={contentRef}
                    filename="jd-invoice.pdf"
                    x={45}
                    y={30}
                  >
                    {({ toPdf }) => (
                      <ButtonOutlined
                        onClick={toPdf}
                        w="full"
                        type="button"
                        mb="1"
                        alignItems="center"
                      >
                        <Image src="/icon/download.svg" alt="" h="20px" mr="4" />
                        <Text>Download bukti pesanan</Text>
                      </ButtonOutlined>

                    )}
                  </Pdf>

                  <ButtonMain
                    w="full"
                    type="submit"
                    mb="2"
                    onClick={(e) => window.browserHistory.push("/")}
                  >
                    Selesai
                  </ButtonMain>
                </Box>
              }
            </div>
          </Box>
        </Content>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default SummaryPage;
