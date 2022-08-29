import { Box, Center, Divider, Flex, Image, Stack } from "@chakra-ui/react"
import ButtonMain from "components/button/ButtonMain"
import { useHistory } from "react-router-dom"
import colors from 'values/colors';
import LogoWithText from 'components/LogoWithText';

const PageNotFound = () => {
  const history = useHistory()
  return (
    <Flex alignItems={'center'} minH={'100vh'}>
      <Flex flex={1} justifyContent={'end'}>
        <Box padding={'0 10px 0 100px'}>
          <Image
            cursor={'pointer'}
            src='/img/404-img.svg'
            minWidth={400}
          />
        </Box>
      </Flex>
      <Box flex={1} >
        <Stack padding={'0 50px 0 10px'} maxW={'600px'} color={colors.PRIMARY} fontWeight={'bold'} textAlign={'center'}>
          <Box fontSize={'144px'}>Oops!</Box>
          <Box fontSize={'24px'}>Sepertinya kamu menyelam terlalu dalam</Box>
          <Flex>
            <Center flex={1} ><LogoWithText /></Center>
            <Box  ><Divider orientation="vertical" /></Box>
            <Center flex={1} fontSize={'64px'}>404</Center>
          </Flex>
          <Box>
            <ButtonMain w={'100%'} onClick={() => history.goBack()}>Kembali</ButtonMain>
          </Box>
        </Stack>
      </Box>
    </Flex>
  )
}

export default PageNotFound