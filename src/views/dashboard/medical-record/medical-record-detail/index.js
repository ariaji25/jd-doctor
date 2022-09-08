import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Divider, Flex, Image, Modal, ModalBody, ModalContent, ModalOverlay, Stack, Text, useDisclosure, } from "@chakra-ui/react"
import { useHistory, useParams } from "react-router-dom";
import colors from "values/colors"

const MedicalRecordDetailPage = () => {
  const history = useHistory()
  let { idPatient } = useParams()

  return (
    <Box minW={0} flex={'auto'}>
      <Flex padding={'30px'}>
        <Box pt={1}>
          <Image
            onClick={() => history.push(`/dashboard/medical-record/${idPatient}`)}
            cursor={'pointer'}
            alt={'arrow-left'}
            src='/icon/arrow-left.svg'
          />
        </Box>
        <Box flex={1} paddingLeft={'25px'} pr={'50px'}>
          <Text fontSize={'36px'} color={colors.PRIMARY} >
            Detail Rekam Medis
          </Text>
          <Text>Data rekam medis pasien</Text>
          <Box paddingTop={6} paddingBottom={12}>
            <Divider border={'2px solid #C0C0C0'} />
          </Box>
          <Stack>
            <Flex bg={'#F9F9FC'} p={2}>
              <Text flex={1} fontWeight={'bold'} fontSize={'18px'} color={colors.PRIMARY}>Tanggal Periksa</Text>
              <Text flex={1}>02-01-2022</Text>
            </Flex>
            <Flex bg={'#F9F9FC'} p={2}>
              <Text flex={1} fontWeight={'bold'} fontSize={'18px'} color={colors.PRIMARY}>Layanan</Text>
              <Text flex={1}>Pemeriksaan umum</Text>
            </Flex>
            <Flex bg={'#F9F9FC'} p={2} minH={'120px'}>
              <Text flex={1} fontWeight={'bold'} fontSize={'18px'} color={colors.PRIMARY}>Keluhan</Text>
              <Text flex={1}>Sesak nafas di tinggal ayang</Text>
            </Flex>
            <Flex bg={'#F9F9FC'} p={2}>
              <Text flex={1} fontWeight={'bold'} fontSize={'18px'} color={colors.PRIMARY}>Dokter</Text>
              <Text flex={1}>Dr. Fahrul</Text>
            </Flex>
            <Flex bg={'#F9F9FC'} p={2} minH={'120px'}>
              <Text flex={1} fontWeight={'bold'} fontSize={'18px'} color={colors.PRIMARY}>Diagnosis</Text>
              <Text flex={1} pl={10}>
                <ul>
                  <li>Sakit</li>
                  <li>Sakit</li>
                  <li>Sakit</li>
                  <li>Sakit</li>
                </ul>
              </Text>
            </Flex>
            <Flex bg={'#F9F9FC'} p={2} minH={'120px'}>
              <Text flex={1} fontWeight={'bold'} fontSize={'18px'} color={colors.PRIMARY}>Tindakan</Text>
              <Text flex={1} pl={10}>
                <ul>
                  <li>Sabar</li>
                  <li>Sabar</li>
                  <li>Sabar</li>
                  <li>Sabar</li>
                </ul>
              </Text>
            </Flex>
            <Flex bg={'#F9F9FC'} p={2} minH={'120px'}>
              <Text flex={1} fontWeight={'bold'} fontSize={'18px'} color={colors.PRIMARY}>Pengobatan</Text>
              <Text flex={1} pl={10}>
                <ul>
                  <li>Berdoa</li>
                  <li>Berdoa</li>
                  <li>Berdoa</li>
                  <li>Berdoa</li>
                </ul>
              </Text>
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </Box>
  )
}

export default MedicalRecordDetailPage