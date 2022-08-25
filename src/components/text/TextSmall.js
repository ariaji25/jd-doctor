import colors from 'values/colors';
import { Text } from '@chakra-ui/react';

const TextSmall = (props) => {
  return (
    <Text fontSize="sm" color={props.color ?? colors.HITAM_PUDAR} {...props}>
      {props.children}
    </Text>
  );
};

export default TextSmall;
