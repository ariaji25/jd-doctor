import { Box, Flex } from '@chakra-ui/react';
import moment from 'moment';
import Select from 'react-select';
import colors from 'values/colors';
import TextSmall from 'components/text/TextSmall';

const urutkanOps = [
  {
    label: 'Dibuat',
    value: 'dibuat',
  },
  {
    label: 'Jadwal temu',
    value: 'jadwalTemu',
  },
];

function Riwayat() {
  const tanggal = moment().format('LL');
  return (
    <Flex>
      <Flex
        // w={{ base: 'full', md: '35%' }}
        w="full"
        justifyContent="space-between"
        p="4"
      >
        <Box w="230px">
          <Select
            instanceId="urutkan"
            options={urutkanOps}
            placeholder="Urutkan berdasarkan"
            components={{ IndicatorSeparator: () => null }}
            styles={{
              placeholder: (s) => ({
                ...s,
                color: colors.HITAM_PUDAR,
                whiteSpace: 'nowrap',
              }),
              control: (s) => ({
                ...s,
                border: 0,
              }),
              dropdownIndicator: (s) => ({
                ...s,
                color: colors.HITAM_PUDAR,
              }),
            }}
          />
        </Box>
        <TextSmall py="2">
          <b>Hari ini</b> - {tanggal}
        </TextSmall>
      </Flex>
      {/* <Flex
        display={{ base: 'none', sm: 'block' }}
        alignItems="flex-start"
        borderLeft="1px solid #ccc"
        p="4"
      >
        <Circle overflow="hidden" mt="6">
          <Image
            src="/img/person.jpeg"
            alt=""
            h="150px"
            w="150px"
            objectFit="cover"
          />
        </Circle>
        <Box pl="6">
          <TextExtraSmall color={colors.DANGER} mb="6">
            Selesaikan proses pembayaran untuk bisa menghubungi dokter
          </TextExtraSmall>

          <ButtonMain bg={colors.UNGU_GELAP} mb="6">
            Bayar sekarang
          </ButtonMain>
          <TextTitleHitam color={colors.HITAM_PUDAR}>Dokter</TextTitleHitam>
          <TextSubTitle>Dr. Jane Doe</TextSubTitle>
          <TextExtraSmall>S1 – Kedokteran Universitas Indonesia</TextExtraSmall>
        </Box>
      </Flex> */}
    </Flex>
  );
}

export default Riwayat;
