import { LinkIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import Content from 'components/Content';
import Footer from 'components/Footer';
import Header from 'components/Header';
import PageContainer from 'components/PageContainer';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import ArticleServices from 'services/apiArticle';
import colors from 'values/colors';


const ShareButton = ({ onClick, icon }) => {
  return (
    <IconButton
      variant={'ghost'}
      _hover={{ background: 'blackAlpha.200', boxShadow: 'none' }}
      _active={{ background: 'blackAlpha.200', boxShadow: 'none' }}
      _focus={{ background: 'blackAlpha.200', boxShadow: 'none' }}
      boxShadow={'none'}
      onClick={onClick}
      icon={icon} />
  );
};


const DetailArticle = () => {
  const [data, setData] = useState({});
  const [tagArticle, setTagArticle] = useState([]);
  const { id } = useParams();

  const init = async () => {
    if (id) {
      await new ArticleServices()
        .getOne(id)
        .then(res => {
          setData(res);
          setTagArticle(res.tags.split(','));
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <PageContainer bg="white">
        <Header withBackButton={true} />
        <Content>
          <Flex
            justifyContent="center">
            <Box
              mt='4'
              mr="16"
              maxW='4xl'
            >
              <Flex
                className="hide-scrollbar"
                mb="8"
                gap="2"
                overflowX="scroll"
              >
                {tagArticle.map((k, i) => (
                  <Box
                    key={`kategori-${i}`}
                    borderRadius="full"
                    bg="purple.100"
                    color="purple.700"
                    px="3"
                    py="1"
                    fontWeight="bold"
                    fontSize="12px"
                    textAlign="center"
                    whiteSpace="nowrap"
                  >
                    {k.split(":")[0]}
                  </Box>
                ))}
              </Flex>
              <Text
                color={colors.PRIMARY}
                fontSize="13pt"
                mb="4">
                {moment(data.createdAt).format('LL')}
              </Text>
              <Image
                src={data.thumbnail}
                mb='12'
                w='full'
                alt={data.title}
                borderRadius="16" />
              <Box>
                <Text
                  color={colors.PRIMARY}
                  fontWeight="bold"
                  fontSize={28}
                  mb={2}
                >
                  {data.title}
                </Text>
                <div dangerouslySetInnerHTML={{ __html: data.body }} />
              </Box>
              <Flex
                className="hide-scrollbar"
                mb="8"
                mt={"6"}
                gap="2"
                overflowX="scroll"
              >
                <ShareButton
                  icon={<LinkIcon />}
                  onClick={() => {
                    window
                      .navigator
                      .clipboard
                      .writeText(window.location.href);
                  }}
                />
                <ShareButton
                  icon={<FaFacebook />}
                  onClick={() => {
                    window
                      .open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank');
                  }}
                />
                <ShareButton
                  icon={<FaTwitter />}
                  onClick={() => {
                    window
                      .open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank');
                  }}
                />
              </Flex>
            </Box>
          </Flex>
          <Box h="2" />
        </Content>
        <Footer />
      </PageContainer>
    </>
  );
};

export default DetailArticle;