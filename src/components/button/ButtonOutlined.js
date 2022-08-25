import { Button } from '@chakra-ui/react';
import colors from 'values/colors';

const ButtonOutlined = (props) => {
  return (
    <Button
      {...props}
      _hover={
        props._hover ?? {
          bg: colors.BIRU_TERANG,
        }
      }
      fontSize={props.fontSize ?? '14px'}
      borderRadius={props.borderRadius ?? 'full'}
      bg={props.bg ?? 'transparent'}
      color={props.color ?? colors.PRIMARY}
      fontWeight={props.fontWeight ?? 'medium'}
      border={props.border ?? `1px solid ${colors.PRIMARY}`}
    >
      {props.children}
    </Button>
  );
};

export default ButtonOutlined;
