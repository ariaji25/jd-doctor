import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Center,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import apiOtp from 'services/apiOtp';
import LogoWithText from '../LogoWithText';


const Navbars = ({ options, currentUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  const onLogout = () => {
    apiOtp.loggedOuts();
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={"32px 48px 16px 48px"}
      color="white"
      {...options}
    >

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Box>
          <Link to={"/landing"}>
            <LogoWithText h={{ base: '10', md: '12' }} />
          </Link>
        </Box>
        {/* <Text>Examples</Text>
        <Text>Blog</Text> */}
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        alignItems={'center'}
        mt={{ base: 4, md: 0 }}
      >
        <Menu>
          <MenuButton>
            <Center>
              <Flex>
                <Center>
                  <Avatar />
                  <Flex flexDir={'column'} justifyContent={'center'} alignItems={'start'} pl={2}>
                    <Text color={"blackAlpha.800"} mr={2} fontSize={'13px'}>Halo dokter,</Text>
                    <Text color={"blackAlpha.800"} mr={2} fontWeight={'bold'}>{currentUser && currentUser.nama || 'Anonymous'}</Text>
                  </Flex>
                </Center>
              </Flex>
            </Center>
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={onLogout}
              command={
                <Image h="25px" src={`/icon/log_out.svg`} alt="" />
              }
            >
              <Text color={"red"}>Keluar</Text>
            </MenuItem>
          </MenuList>
        </Menu>

      </Box>
    </Flex>
  );
};

const mapper = (state) => {
  return {
    currentUser: state.authReducer.currentUser
  };
};

export default connect(mapper, null)(Navbars);
