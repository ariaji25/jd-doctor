import { Avatar, Box, Center, Flex, Image, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react"
import ButtonMain from "components/button/ButtonMain";
import Navbar from "components/dashboard/Navbar"
import EmptyComponent from "components/EmptyComponent";
import { FiCalendar, FiCircle, FiCreditCard, FiEdit, FiEye, FiFile, FiFileText, FiHeart, FiMail, FiMap, FiMapPin, FiPlusCircle, FiUser } from "react-icons/fi";
import colors from "values/colors";


const DetailSubProfile = ({ profileDetail }) => {
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
                  <Box fontWeight={'bold'} color={colors.PRIMARY} fontSize={'18px'}>{profileDetail.strNumber}</Box>
                </Flex>
              </Box>
              <Flex flex={4} alignItems={'end'}>
                <ButtonMain
                  onClick={(e) => {
                    window.open(profileDetail.strUrl)
                  }}
                  bg="white" color={colors.PRIMARY}
                  width={180}>
                  <FiEye /> Lihat dokumen STR
                </ButtonMain>
              </Flex>
            </Flex>
            <Flex>
              <Box flex={3}>
                <Text>No SIP</Text>
                <Flex alignItems={'start'} gap={3}>
                  <Box pt={'5px'}><FiFileText fontSize={'18px'} /></Box>
                  <Box fontWeight={'bold'} color={colors.PRIMARY} fontSize={'18px'}>{profileDetail.sipNumber}</Box>
                </Flex>
              </Box>
              <Flex flex={4} alignItems={'end'}>
                <ButtonMain
                  onClick={(e) => {
                    window.open(profileDetail.sipUrl)
                  }}
                  bg="white"
                  color={colors.PRIMARY}
                  width={180}>
                  <FiEye />Lihat dokumen SIP
                </ButtonMain>
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
                  <Box fontWeight={'bold'} color={colors.PRIMARY} fontSize={'18px'}>{profileDetail.nama}</Box>
                </Flex>
              </Box>
              <Box flex={4}>
                <Text>Alamat Domisili</Text>
                <Flex alignItems={'start'} gap={3}>
                  <Box pt={'5px'}><FiMap fontSize={'18px'} /></Box>
                  <Box fontWeight={'bold'} color={colors.PRIMARY} fontSize={'18px'}>{profileDetail.alamatDomisili}</Box>
                </Flex>
              </Box>
            </Flex>
            <Flex>
              <Box flex={3}>
                <Text>No KTP</Text>
                <Flex alignItems={'start'} gap={3}>
                  <Box pt={'5px'}><FiCreditCard fontSize={'18px'} /></Box>
                  <Box fontWeight={'bold'} color={colors.PRIMARY} fontSize={'18px'}>{profileDetail.nik}</Box>
                </Flex>
              </Box>
              <Box flex={4}>
                <Text>Nomor Hp Dokter</Text>
                <Flex alignItems={'start'} gap={3}>
                  <Box fontWeight={'bold'} color={colors.PRIMARY} fontSize={'18px'}>{profileDetail.nohp}</Box>
                </Flex>
              </Box>
            </Flex>
            <Flex>
              <Box flex={3}>
                <Text>Tanggal Lahir</Text>
                <Flex alignItems={'start'} gap={3}>
                  <Box pt={'5px'}><FiCalendar fontSize={'18px'} /></Box>
                  <Box fontWeight={'bold'} color={colors.PRIMARY} fontSize={'18px'}>{profileDetail.tanggalLahir}</Box>
                </Flex>
              </Box>
              <Box flex={4}>
                <Text>Email</Text>
                <Flex alignItems={'start'} gap={3}>
                  <Box pt={'5px'}><FiMail fontSize={'18px'} /></Box>
                  <Box fontWeight={'bold'} color={colors.PRIMARY} fontSize={'18px'}>{profileDetail.email}</Box>
                </Flex>
              </Box>
            </Flex>
            <Flex>
              <Box flex={3}>
                <Text>Jenis Kelamin</Text>
                <Flex alignItems={'start'} gap={3}>
                  <RadioGroup value={'Laki-laki'}>
                    <Radio value='Laki-laki'>{profileDetail.jenisKelamin}</Radio>
                  </RadioGroup>
                </Flex>
              </Box>
              {/* <Box flex={4}>
                <Text>Nama Ibu Kandung</Text>
                <Flex alignItems={'start'} gap={3}>
                  <Box pt={'5px'}><FiUser fontSize={'18px'} /></Box>
                  <Box fontWeight={'bold'} color={colors.PRIMARY} fontSize={'18px'}>Jane Doe</Box>
                </Flex>
              </Box> */}
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default DetailSubProfile