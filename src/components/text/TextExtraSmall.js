import colors from 'values/colors';
import { Text } from '@chakra-ui/react';

const TextExtraSmall = (props) => {
  return (
    <Text fontSize="xs" color={props.color ?? colors.HITAM_PUDAR} {...props}>
      {props.children}
    </Text>
  );
};

export default TextExtraSmall;
