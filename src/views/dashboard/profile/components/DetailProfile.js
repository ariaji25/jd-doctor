import { Avatar, Box, Center, Flex, Image, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react"
import ButtonMain from "components/button/ButtonMain";
import Navbar from "components/dashboard/Navbar"
import EmptyComponent from "components/EmptyComponent";
import { FiCalendar, FiCircle, FiCreditCard, FiEdit, FiEye, FiFile, FiFileText, FiHeart, FiMail, FiMap, FiMapPin, FiPlusCircle, FiUser } from "react-icons/fi";
import { getCurrentUserFromStorage } from "utils";
import colors from "values/colors";


function nFormatter(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "K" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "G" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + ' ' + si[i].symbol;
}

const DetailProfile = () => {
  return (
    <Flex pt={4} borderBottom={'1px solid #C4C4C4'} pb={8} gap={8}>
      <Flex flex={2.5} justifyContent={'center'} gap={4}>
        <Box marginTop={'-100px'}>
          <Avatar size='3xl' name='dr. Jane Doe' src={'/img/dr. romy.png'} color={'black'} bg={'transparent'} border={'1px solid #C0C0C0'} />
        </Box>
        <Stack>
          <Text fontSize={'24px'} fontWeight={'bold'} color={colors.PRIMARY}>
            {getCurrentUserFromStorage() ? getCurrentUserFromStorage().nama ?? '-' : '-'}
          </Text>
          <Text fontWeight={'bold'} color={colors.PRIMARY}>
            🔬 Dokter Umum
          </Text>
          <Flex alignItems={'center'}>
            <Box><FiMapPin color="red" /></Box>
            <Text pl={2}>Klinik antasari - RS Antasari</Text>
          </Flex>
        </Stack>
      </Flex>
      <Flex flex={3}>
        <Stack flex={1}>
          <Flex alignItems={'center'}>
            <Box>
              <Image
                src={'/icon/heart.svg'}
                cursor={'pointer'}
              />
            </Box>
            <Box pl={2}>
              {nFormatter(126000, 1)}
            </Box>
          </Flex>
          <Box>Orang yang menyukai anda</Box>
        </Stack>
        <Box><ButtonMain><FiEdit />Edit biodata</ButtonMain></Box>
      </Flex>
    </Flex>
  )
}

export default DetailProfile