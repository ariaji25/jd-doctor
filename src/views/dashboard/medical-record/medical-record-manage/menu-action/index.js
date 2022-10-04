import { Box } from "@chakra-ui/react"
import ActionComponent from "./components/action-component"

const MenuAction = ({mode}) => {
  return (
    <Box px={14}>
      <ActionComponent mode={mode}/>
    </Box>
  )
}

export default MenuAction