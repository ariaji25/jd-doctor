import { Button } from '@chakra-ui/react';
import { forwardRef } from 'react';
import colors from 'values/colors';

const ButtonMain = (props, ref) => {
  return (
    <Button
      ref={ref}
      _hover={{
        bg: colors.BIRU_TERANG,
      }}
      fontSize={props.fontSize ?? '14px'}
      borderRadius="full"
      bg={props.bg ?? colors.PRIMARY}
      color={props.color ?? 'white'}
      border={`2px solid ${colors.PRIMARY}`}
      fontWeight="medium"
      {...props}
    >
      {props.children}
    </Button>
  )
}

export default forwardRef(ButtonMain);
