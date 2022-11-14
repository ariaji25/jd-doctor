import { Box } from "@chakra-ui/react"
import DiagnoseComponent from "./components/diagnose-component"

const MenuDiagnose = ({ mode }) => {
  return (
    <Box px={14}>
      <DiagnoseComponent mode={mode} />
    </Box>
  )
}

export default MenuDiagnose