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
import { FiXCircle } from 'react-icons/fi';

export default function SideModal({ title, children, isOpen, onToogle, positionContent }) {
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
          display={isOpen ? 'flex' : 'none'}
          zIndex={2}
        >
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
                p="2%"
                flexDir={'row'}
              >
                <IconButton
                  onClick={() => onToogle()}
                  background="none"
                  position={'absolute'}
                  left={2}
                  _hover={{ background: 'none' }}
                  icon={<FiXCircle fontSize={30} />}
                />
                <Center w={'full'} padding='10px 0'>
                  <Text color={colors.PRIMARY}>
                    {title}
                  </Text>
                </Center>
              </Flex>
              <Flex marginTop={2} height={'100%'} justifyContent={'center'} alignItems={positionContent} overflow={'scroll'} padding={'20px 0'}>
                {children}
              </Flex>
            </Flex>
          </Slide>
        </Box>
      </Fade>
    </>
  )
}
