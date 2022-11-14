import {
  Box,
  Circle,
  Flex, Input, Text
} from '@chakra-ui/react';
import TextSmall from 'components/text/TextSmall';
import { forwardRef, useState } from 'react';
import colors from 'values/colors';
import regexp from 'values/regexp';

const InputNoHP = (
  { onChangeNoHp, onClear, leading, label, ...props },
  ref
) => {
  const [isValid, setIsValid] = useState(true)
  const Leading = () => {
    if (leading) {
      return <Box mr="4">{leading}</Box>;
    }
    return null;
  };

  return (
    <Box w={props.w}>
      {label && (
        <Flex>
          <TextSmall fontWeight="thin">{label}</TextSmall>
          {props.isRequired && (
            <Text fontSize="xs" color={colors.DANGER}>
              *
            </Text>
          )}
        </Flex>
      )}
      <Flex alignItems="center" w="full">
        <Box w="full">
          <Flex alignItems="center" borderBottom="1px solid #ccc" w="full">
            <Leading />
            <Input
              {...props}
              onChange={(e) => {
                let { value } = e.target;
                if (value === '' || regexp.numberOnly.test(value)) {
                  if (onChangeNoHp) {
                    onChangeNoHp(value);
                    setIsValid(value)
                  }
                }
              }}
              type="tel"
              ref={ref}
              marginStart={0}
              marginInlineStart={0}
              marginEnd={0}
              marginInlineEnd={0}
              paddingLeft={0}
              fontSize={{ base: 'sm', sm: 'md' }}
              color={colors.PRIMARY}
              fontWeight={props.value ? 'bold' : 'thin'}
              border="0"
              rounded="none"
              w="full"
              h="35px"
              maxLength={15}
              _focus={{ outline: 'none' }}
            />
            {onClear && props.value && (
              <Circle
                size="20px"
                border={`1px solid ${colors.PRIMARY}`}
                _hover={{ bg: 'gray.200' }}
                cursor="pointer"
                onClick={onClear}
              >
                <Text mt="-1px" fontWeight="bold" fontSize="11px">
                  x
                </Text>
              </Circle>
            )}
          </Flex>
        </Box>
      </Flex>

      {(isValid ? null : props.errmessage) && <TextSmall color="red.500">{props.errmessage}</TextSmall>}
    </Box>
  );
};

export default forwardRef(InputNoHP);
