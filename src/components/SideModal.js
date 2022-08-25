import {
  Box,
  Center,
  Flex,
  IconButton,
  Fade,
  Slide,
  Text,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons';
import colors from 'values/colors';

export default function SideModal({ title, children, isOpen, onToogle }) {
  return (
    <>
      <Fade in={isOpen}>
        <Box
          position="fixed"
          left={0}
          top={0}
          right={0}
          bottom={0}
          bg="rgba(0,0,0,0.5)"
          display={isOpen ? 'flex' : 'none'}>
          <Slide direction='right' in={isOpen} style={{ zIndex: 10 }}>
            <Flex
              bg={"white"}
              pos="absolute"
              h="100vh"
              w={"md"}
              flexDir="column"
              right='0'
              top={0}
            >
              <Flex
                p="5%"
                flexDir={'row'}
              >
                <IconButton
                  onClick={() => onToogle()}
                  background="none"
                  _hover={{ background: 'none' }}
                  icon={<CloseIcon />}
                />
                <Center w={'full'}>
                  <Text color={colors.PRIMARY}
                    fontSize='16pt'>
                    {title}
                  </Text>
                </Center>
              </Flex>
              <hr />
              <Box marginTop={8}>
                {children}
              </Box>
            </Flex>
          </Slide>
        </Box>
      </Fade>
    </>
  )
}
