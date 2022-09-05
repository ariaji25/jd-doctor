import { Box, Divider, Flex, Modal, ModalBody, ModalContent, ModalOverlay, Text, useDisclosure, } from "@chakra-ui/react"
import colors from "values/colors"
import { useSnapshot } from 'valtio';
import stateMedicalRecord from "states/stateMedicalRecord";
import ButtonMain from "components/button/ButtonMain";
import MenuInspection from "./menu-inspection";
import MenuDiagnose from "./menu-diagnose";
import MenuAction from "./menu-action";
import MenuTreatment from "./menu-treatment";
import MedicalNavigation from "./components/MedicalNavigation";
import MedicalHeader from "./components/MedicalHeader";
import { FiClipboard } from "react-icons/fi";

const NotificationStatus = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl' isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Box color={colors.PRIMARY} textAlign={'center'} py={20}>
            <Flex justifyContent={'center'}>
              <FiClipboard fontSize={60} />
            </Flex>
            <Text fontSize={40} fontWeight={'bold'}>BERHASIL</Text>
            <Text color={'#8E8E8E'}>Data rekam medis berhasil disimpan</Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const MedicalRecordManagePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const state = useSnapshot(stateMedicalRecord);

  return (
    <>
      <Flex minH={'100vh'}>
        <MedicalNavigation />
        <Box minW={0} flex={'auto'}>
          <MedicalHeader />
          <Flex flexDir={'column'} flex={4} justifyContent={'center'}>
            <Flex px={14} >
              <Flex flex={1} justifyContent={'space-between'} gap={4} color={colors.PRIMARY} lineHeight={'26px'}>
                <Box flex={1}>
                  <Box color={'#505050'} fontSize={'13px'}>Nama lengkap pasien</Box>
                  <Box fontWeight={'bold'}>Carissa Amanda</Box>
                </Box>
                <Box flex={1}>
                  <Box color={'#505050'} fontSize={'13px'}>Tanggal lahir</Box>
                  <Box fontWeight={'bold'}>22/02/1998 - 23 thn</Box>
                </Box>
                <Box flex={3}>
                  <Box color={'#505050'} fontSize={'13px'}>Keluhan yang dirasakan</Box>
                  <Box fontWeight={'bold'}>Pilek, batuk, sakit setiap sendi kehidupan, lemas dan kurang uang. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</Box>
                </Box>
              </Flex>
            </Flex>
            <Box px={14} pt={10} pb={5} >
              <Box ><Divider border={'1px solid #C0C0C0'} /></Box>
            </Box>
            {state.selectedTab === 1 &&
              <MenuInspection />
            }
            {state.selectedTab === 2 &&
              <MenuDiagnose />
            }
            {state.selectedTab === 3 &&
              <MenuAction />
            }
            {state.selectedTab === 4 &&
              <MenuTreatment />
            }
          </Flex>
          <Box px={40} py={5}>
            <ButtonMain width={'100%'} onClick={onOpen}>Simpan</ButtonMain>
          </Box>
        </Box>
      </Flex>
      <NotificationStatus isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default MedicalRecordManagePage