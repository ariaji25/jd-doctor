import { Box } from "@chakra-ui/react"
import TreatmentComponent from "./components/treatment-component"

const MenuTreatment = ({ mode }) => {
  return (
    <Box px={14}>
      <TreatmentComponent mode={mode} />
    </Box>
  )
}

export default MenuTreatment