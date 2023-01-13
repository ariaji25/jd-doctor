import { FiCheckCircle, FiInfo } from "react-icons/fi";
import colors from "values/colors";
import ButtonMain from "./button/ButtonMain";

const { Modal, ModalOverlay, ModalContent, ModalBody, Box, Flex, Text } = require("@chakra-ui/react")

const CustomModal = ({ isOpen, onClose, type, message }) => {
  const color = () => {
    switch (type) {
      case "info": return colors.BIRU_TERANG
      case "success": return colors.PRIMARY
      case "danger": return colors.DANGER
      default: return colors.BIRU_TERANG
    }
  }

  const Icon = () => {
    switch (type) {
      case "info": return <FiInfo color={colors.BIRU_TERANG} fontSize={60} />
      case "success": return <FiCheckCircle color={colors.PRIMARY} fontSize={60} />
      case "danger": return <FiInfo color={colors.DANGER} fontSize={60} />
      default: return <FiInfo color={colors.BIRU_TERANG} fontSize={60} />
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl' isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Box color={color()} textAlign={'center'} py={20}>
            <Flex justifyContent={'center'}>
              <Icon />
            </Flex>
            <Text fontSize={20} textColor={colors.HITAM_PUDAR} fontWeight={'bold'}>{message}</Text>
            <Box h={"20px"} />
            <ButtonMain minW={'100px'} w={"fit-content"} onClick={e => onClose()}>
              <Text>OK</Text>
            </ButtonMain>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CustomModal;