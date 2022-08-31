import { Avatar, Box, Center, Flex, Image, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react"
import ButtonMain from "components/button/ButtonMain";
import Navbar from "components/dashboard/Navbar"
import EmptyComponent from "components/EmptyComponent";
import { FiCalendar, FiCircle, FiCreditCard, FiEdit, FiEye, FiFile, FiFileText, FiHeart, FiMail, FiMap, FiMapPin, FiPlusCircle, FiUser } from "react-icons/fi";
import colors from "values/colors";


const DetailSubProfile = () => {
  return (
    <Flex pt={12} flexWrap='wrap' gap={8}>
      <Stack flex={2.5} >
        <Flex>
          <Stack flex={2.5} gap={4}>
            <Flex>
              <Box flex={3}>
                <Text>No STR</Text>
                <Flex alignItems={'start'} gap={3}>
                  <Box pt={'5px'}><FiFileText fontSize={'18px'} /></Box>
                  <Box fontWeight={'bold'} color={colors.PRIMARY} fontSize={'18px'}>200952118-2271420</Box>
                </Flex>
              </Box>
              <Flex flex={4} alignItems={'end'}>
                <ButtonMain bg="white" color={colors.PRIMARY} width={180}><FiEye /> Lihat dokumen STR</ButtonMain>
              </Flex>
            </Flex>
            <Flex>
              <Box flex={3}>
                <Text>No SIP</Text>
                <Flex alignItems={'start'} gap={3}>
                  <Box pt={'5px'}><FiFileText fontSize={'18px'} /></Box>
                  <Box fontWeight={'bold'} color={colors.PRIMARY} fontSize={'18px'}>441/352727/IX/2017</Box>
                </Flex>
              </Box>
              <Flex flex={4} alignItems={'end'}>
                <ButtonMain bg="white" color={colors.PRIMARY} width={180}><FiEye />Lihat dokumen SIP</ButtonMain>
              </Flex>
            </Flex>
          </Stack>
        </Flex>
      </Stack>
      <Stack flex={3}>
        <Flex>
          <Stack flex={2.5} gap={4}>
            <Flex>
              <Box flex={3}>
                <Text>Nama Lengkap</Text>
                <Flex alignItems={'start'} gap={3}>
                  <Box pt={'5px'}><FiUser fontSize={'18px'} /></Box>
                  <Box fontWeight={'bold'} color={colors.PRIMARY} fontSize={'18px'}>Dr. John Doe</Box>
                </Flex>
              </Box>
              <Box flex={4}>
                <Text>Alamat Domisili</Text>
                <Flex alignItems={'start'} gap={3}>
                  <Box pt={'5px'}><FiMap fontSize={'18px'} /></Box>
                  <Box fontWeight={'bold'} color={colors.PRIMARY} fontSize={'18px'}>2972 Westheimer Rd. Santa Ana, Illinois....</Box>
                </Flex>
              </Box>
            </Flex>
            <Flex>
              <Box flex={3}>
                <Text>No KTP</Text>
                <Flex alignItems={'start'} gap={3}>
                  <Box pt={'5px'}><FiCreditCard fontSize={'18px'} /></Box>
                  <Box fontWeight={'bold'} color={colors.PRIMARY} fontSize={'18px'}>52123456789123</Box>
                </Flex>
              </Box>
              <Box flex={4}>
                <Text>Nomor Hp Dokter</Text>
                <Flex alignItems={'start'} gap={3}>
                  <Box fontWeight={'bold'} color={colors.PRIMARY} fontSize={'18px'}>08123456789</Box>
                </Flex>
              </Box>
            </Flex>
            <Flex>
              <Box flex={3}>
                <Text>Tanggal Lahir</Text>
                <Flex alignItems={'start'} gap={3}>
                  <Box pt={'5px'}><FiCalendar fontSize={'18px'} /></Box>
                  <Box fontWeight={'bold'} color={colors.PRIMARY} fontSize={'18px'}>01-01-2022</Box>
                </Flex>
              </Box>
              <Box flex={4}>
                <Text>Email</Text>
                <Flex alignItems={'start'} gap={3}>
                  <Box pt={'5px'}><FiMail fontSize={'18px'} /></Box>
                  <Box fontWeight={'bold'} color={colors.PRIMARY} fontSize={'18px'}>email@mail.com</Box>
                </Flex>
              </Box>
            </Flex>
            <Flex>
              <Box flex={3}>
                <Text>Jenis Kelamin</Text>
                <Flex alignItems={'start'} gap={3}>
                  <RadioGroup value={'Laki-laki'}>
                    <Radio value='Laki-laki'>Laki-laki</Radio>
                  </RadioGroup>
                </Flex>
              </Box>
              <Box flex={4}>
                <Text>Nama Ibu Kandung</Text>
                <Flex alignItems={'start'} gap={3}>
                  <Box pt={'5px'}><FiUser fontSize={'18px'} /></Box>
                  <Box fontWeight={'bold'} color={colors.PRIMARY} fontSize={'18px'}>Jane Doe</Box>
                </Flex>
              </Box>
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default DetailSubProfile