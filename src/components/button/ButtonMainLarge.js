import { Button } from '@chakra-ui/react';
import { forwardRef } from 'react';
import colors from 'values/colors';

const ButtonMainLarge = (
  props,
  ref
) => {
  return (
    <Button
      ref={ref}
      _hover={{
        bg: colors.BIRU_TERANG,
      }}
      fontSize={props.fontSize ?? 'lg'}
      h="50px"
      borderRadius="full"
      bg={props.bg ?? colors.PRIMARY}
      color={props.color ?? 'white'}
      fontWeight="medium"
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default forwardRef(ButtonMainLarge);
