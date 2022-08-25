import {
  Box, Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
} from '@chakra-ui/react';
import ButtonMain from 'components/button/ButtonMain';
import LogoWithText from 'components/LogoWithText';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { proxy, useSnapshot } from 'valtio';
import colors from 'values/colors';

const menuList = [
  {
    id: 0,
    label: 'Masuk',
    href: '/login',
  },
  {
    id: 1,
    label: 'Beranda',
    href: '/home',
  },
  {
    id: 2,
    label: 'Tentang',
    href: '/about',
  },
  {
    id: 3,
    label: 'Artikel Kesehatan',
    href: '/article',
  },
  // {
  //   id: 3,
  //   label: 'Download APP',
  //   href: '/download',
  // },
];

const ItemMenu = ({ menu }) => {
  return (
    <Box color={colors.PRIMARY} fontWeight="bold">
      <Link href={menu.href}>{menu.label}</Link>
    </Box>
  );
};

export const stateModal = proxy({
  isOpen: false,
});

const Header = ({ currentUser, withBackButton }) => {
  const { isOpen } = useSnapshot(stateModal);
  const history = useHistory();

  return (
    <Box>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        maxW="6xl"
        mx="auto"
        px={{ base: '4', md: '10' }}
        py={{ base: '6', md: '10' }}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between">
          {withBackButton && (
            <Box
              onClick={() => {
                history.goBack();
              }}
              cursor="pointer"
              mr="8"
            >
              <Image h="5" src="/icon/back.svg" alt="" />
            </Box>
          )}
          <LogoWithText h={{ base: '10', md: '12' }} />
        </Flex>
        <Box gap="9" display={{ base: 'none', md: 'flex' }}>
          {menuList.map((m) => {
            if (m.id !== 0) {
              return <ItemMenu key={m.id} menu={m} />;
            } else {
              return null;
            }
          })}
        </Box>
        {/* Will used this code in the future */}
        
        <Link href={"/login"}>
          <ButtonMain
            type="button"
            display={{ base: 'none', md: 'inline-block' }}
          >
            {currentUser && currentUser.nama ? currentUser.nama : 'Masuk'}
          </ButtonMain>
        </Link>

        <Image
          w="6"
          h="auto"
          display={{ base: 'inline-block', md: 'none' }}
          alt=""
          src="/icon/menu.svg"
          cursor="pointer"
          onClick={() => {
            stateModal.isOpen = true;
          }}
        />
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          stateModal.isOpen = false;
        }}
        preserveScrollBarGap
        size="full"
      >
        <ModalContent rounded={5} mt={[0, 0]} bg="white">
          <ModalBody>
            <Flex flexDir="column" alignItems="center" pt="8" gap="4">
              {menuList.map((m) => (
                <ItemMenu key={m.id} menu={m} />
              ))}
            </Flex>
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </Box>
  );
};

const mapper = (state) => {
  return {
    currentUser: state.authReducer.currentUser
  };
};

export default connect(mapper, null)(Header);
