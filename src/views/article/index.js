import {
  Badge,
  Box,
  Center, HStack,
  Image,
  Spinner,
  Text,
  Tooltip,
  VStack,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import Content from "components/Content";
import Footer from "components/Footer";
import Header from "components/Header";
import { TagList } from 'components/home/ArtikelKesehatan';
import PageContainer from "components/PageContainer";
import SearchComponent from 'components/Search';
import React, { Component } from "react";
import ArticleServices from 'services/apiArticle';
import colors from 'values/colors';

const articleServices = new ArticleServices();

class ArticlePage extends Component {
  state = {
    tags: [],
    articles: [],
    selectedItem: null,
    loading: false,
    activeTag: "Semua",
    search: ""
  };

  componentDidMount = () => {
    this.getTopFiveTags();
    this.getAll();
  };

  getAll = (tag) => {
    this.setState({ loading: true }, async () => {
      await articleServices
        .getAll({ page: 1, limit: 10 }, this.state.search, tag)
        .then(res => {
          this.setState({ articles: res.articles, loading: false });
        })
        .catch(err => {
          console.log(err);
          this.setState({ loading: false });
        });
    });
  };

  getTopFiveTags = async () => {
    await articleServices
      .geTopFiveTags()
      .then(res => {
        this.setState({ tags: res });
      })
      .catch(err => {
        console.log(err);
      });
  };

  setSelectedItem = (selectedItem) => {
    this.setState({ selectedItem });
  };

  render() {
    const { selectedItem, articles, tags } = this.state;

    return (
      <PageContainer bg="white">
        <Header />
        <Content>
          {!selectedItem &&
            <Box
              mt='4'
              mr="16"
              maxW='5xl'
              mx="auto">
              <HStack>
                <VStack>
                  <Text
                    color={colors.PRIMARY}
                    fontWeight={600}
                    textAlign={'start'}
                    fontSize={95.98}
                    style={{
                      lineHeight: "113.26px"
                    }}
                  >
                    JumpaDokter <br />
                    Update
                  </Text>
                  <div style={{ marginTop: 90, marginLeft: -250 }} >
                    <SearchComponent
                      title={"Cari Artikel"}
                      placeholder={""}
                      onChange={e => {
                        this.setState({ search: e }, () => {
                          this.getAll();
                        });
                      }}
                    />
                  </div>
                </VStack>
                <Center mx="auto">
                  <Image
                    src="/img/article_il.svg"
                    title="article_ilustration"
                    alt=""
                  />
                </Center>
              </HStack>
              <div style={{ marginTop: 54 }} />
              <TagList
                data={tags}
                onTagChange={tag => {
                  this.setState({ activeTag: tag }, () => {
                    this.getAll(tag);
                  });
                }}
                justifyContent={"start"}
              />
              {this.state.loading ?
                <Center><Spinner /></Center>
                :
                <Wrap justify="left" spacing="4" mb="8" ml="2" mr="2" >
                  {articles && articles.length > 0 && articles.map((a, idx) => {
                    const tags = a.tags.split(",");
                    return (
                      <WrapItem key={idx}>
                        <Box w={{ md: 'xs' }}>
                          <Image
                            objectFit="cover"
                            w="full"
                            h="64"
                            borderRadius="10px"
                            src={a.thumbnail}
                            alt=""
                            mb="1"
                            cursor={'pointer'}
                            onClick={() => {
                              window.browserHistory.push(`/article/detail/${a.id}`);
                            }}
                          />
                          <Tooltip label={a.title} aria-label='A tooltip'>
                            <Text
                              mb="2"
                              fontSize={{ base: '16px', md: '20px' }}
                              fontWeight="semibold"
                              whiteSpace="nowrap"
                              textOverflow="ellipsis"
                              overflowX="hidden"
                              cursor={'pointer'}
                              onClick={() => {
                                window.browserHistory.push(`/article/detail/${a.id}`);
                              }}
                            >
                              {a.title}
                            </Text>
                          </Tooltip>
                          {tags && tags.length > 0 && tags.map((val, idx) => {
                            return (
                              <Badge
                                key={idx}
                                color="purple.700"
                                bg="purple.100"
                                mr={1}
                                borderRadius="full"
                              >
                                {val}
                              </Badge>
                            );
                          })}
                          <Text
                            fontWeight="medium"
                            fontSize="13px"
                            color={colors.GRAY_ARTICLE_BODY}
                          >
                            {a.short_desc}
                          </Text>
                        </Box>
                      </WrapItem>
                    );
                  })}
                </Wrap>
              }
            </Box>
          }
          <Box h="2" />
        </Content>
        <Footer />
      </PageContainer >
    );
  }
}

export default ArticlePage;
