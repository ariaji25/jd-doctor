import {
  Box,
  Center,
  Flex,
  Image,
  Link,
  Spinner,
  Text,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import ButtonMain from 'components/button/ButtonMain';
import { useEffect, useState } from 'react';
import apiArticle from 'services/apiArticle';
import colors from 'values/colors';

export const TagList = ({ data, onTagChange, justifyContent }) => {
  const [datas, setDatas] = useState(["Semua"]);
  const [activeTag, setActiveTag] = useState(datas[0]);

  useEffect(() => {
    if (data && data.length > 0) {
      setDatas(prev => (["Semua", ...data]));
    }
  }, [data]);

  return (
    <Flex
      className="hide-scrollbar"
      mb="8"
      gap="2"
      overflowX="scroll"
      wrap="wrap"
      justifyContent={justifyContent || "center"}
    >
      {datas && datas.length > 0 && datas.map((tag, i) => {
        const t = tag.split(':')[0];
        const isActive = t === activeTag;

        return <Box
          key={`kategori-${i}`}
          borderRadius="full"
          bg={isActive ? "purple.700" : "gray.200"}
          color={isActive ? "purple.100" : "gray.500"}
          px="3"
          py="1"
          fontWeight="bold"
          fontSize="12px"
          textAlign="center"
          whiteSpace="nowrap"
          cursor={"pointer"}
          _hover={{ backgroundColor: isActive ? "purple.500" : "gray.100" }}
          onClick={() => {
            setActiveTag(t);
            onTagChange(i === 0 ? "" : t);
          }}
        >
          {t}
        </Box>;
      })}
    </Flex>
  );
};

const ArtikelList = ({ data }) => {
  return (
    <Wrap justify="center" spacing="4" mb="8">
      {data && data.length > 0 && data.map((a, index) => (
        <WrapItem key={index}>
          <Box w={[300, 400]}>
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
            <Flex mb='2'>
              {a.tags && a.tags.split(',').map((tag, index) => {
                return (
                  <Box
                    key={index}
                    borderRadius="full"
                    bg="purple.100"
                    color="purple.700"
                    px="3"
                    py="1"
                    fontSize="12px"
                    textAlign="center"
                    mr='2'
                  >
                    {tag}
                  </Box>
                );
              })}
            </Flex>
            <Text
              fontWeight="medium"
              fontSize="13px"
              color={colors.GRAY_ARTICLE_BODY}
            >
              {a.short_desc}
            </Text>
          </Box>
        </WrapItem>
      ))}
    </Wrap>
  );
};

const ArtikelKesehatan = () => {
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const ArticleServices = new apiArticle();
  const [loading, setLoading] = useState(false);

  const getTags = async () => {
    await ArticleServices
      .geTopFiveTags()
      .then(async (res) => {
        setTags(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getArticles = async (tag) => {
    setLoading(true);
    await ArticleServices
      .getAll({ limit: 3, page: 1 }, '', tag)
      .then(res => {
        setArticles(res.articles);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  const init = async () => {
    await getTags();
    await getArticles();

  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Box maxW="7xl" mx="auto" mb="16">
      <Center>
        <Box>
          <Text
            color={colors.PRIMARY}
            mb="1"
            textAlign="center"
            fontSize={{ base: '24', sm: '36px' }}
            fontWeight="bold"
          >
            Artikel kesehatan
          </Text>
          <Text
            color={colors.HITAM_PUDAR}
            textAlign="center"
            fontSize={{ base: '12', sm: '16px' }}
            fontWeight="medium"
            mb="8"
          >
            Artikel yang membantu Anda menambah pengetahuan tentang kesehatan
          </Text>
        </Box>
      </Center>
      <TagList
        data={tags}
        onTagChange={tag => {
          getArticles(tag);
        }}
      />
      <ArtikelList data={articles} />
      <Center>
        {loading ?
          <Spinner />
          :
          <Link href='/article'>
            <ButtonMain
              color={colors.PRIMARY}
              bg="white"
              border={`1px solid ${colors.PRIMARY}`}
            >
              Lebih banyak
            </ButtonMain>
          </Link>
        }
      </Center>
    </Box>
  );
};

export default ArtikelKesehatan;
