import { Box, Flex, Image, Input, Text } from '@chakra-ui/react';
import ButtonMain from 'components/button/ButtonMain';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import colors from 'values/colors';

const SearchComponent = ({
  val,
  title,
  placeholder,
  width,
  onChange,
}) => {
  const [searchFocused, setsearchFocused] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (val) {
      setValue(val);
      setsearchFocused(true);
    }
  }, [val]);

  return (
    <Box mb="8">
      <Box style={{ width: width || 400 }}>
        <Flex
          mx="auto"
          maxW="lg"
          bg="white"
          border={`2px solid ${colors.PRIMARY}`}
          borderRadius="full"
          py={{ base: '1', sm: '8px' }}
          pl="5"
          pr={{ base: '1', sm: '8px' }}
          alignItems="center"
          justifyContent="start"
        >
          <AnimatePresence>
            {!searchFocused && (
              <motion.div
                initial={{ width: 'unset' }}
                animate={{ width: 'unset' }}
                exit={{ width: 0 }}
              >
                <Flex
                  borderRight={`1px solid ${colors.PRIMARY}`}
                  pr={{ base: '6', sm: '7' }}
                  alignItems="center"
                  onClick={() => {
                    setsearchFocused(true);
                  }}
                  cursor="pointer"
                >
                  <Image
                    h={{ base: '4', sm: '14px' }}
                    alt=""
                    src="/icon/search.svg"
                    mr={{ base: '2', sm: '3' }}
                  />
                  <Text
                    fontSize={{ base: 'sm', sm: '14px' }}
                    color={colors.PRIMARY}
                    whiteSpace="nowrap"
                  >
                    {title}
                  </Text>
                </Flex>
              </motion.div>
            )}
          </AnimatePresence>
          <Input
            value={value}
            w="full"
            onFocus={() => {
              setsearchFocused(true);
            }}
            onBlur={() => {
              setsearchFocused(false);
            }}
            fontSize={{ base: 'sm', sm: '14px' }}
            name="search"
            border="0"
            placeholder={!searchFocused ? placeholder : 'Cari...'}
            pl={!searchFocused ? '2' : '0'}
            _focus={{ outline: 'none' }}
            onChange={e => setValue(e.target.value)}
            onKeyUp={e => {
              if (e.key === "Enter") {
                onChange(value);
              }
            }}
          />
          <ButtonMain
            w="24"
            onClick={() => {
              onChange(value);
            }}
          >
            Cari
          </ButtonMain>
        </Flex>
      </Box>
    </Box>
  );
};

export default SearchComponent;
