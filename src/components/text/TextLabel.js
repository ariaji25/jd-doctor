import colors from 'values/colors';
import { Text } from '@chakra-ui/react';

const TextLabel = (props) => {
  return (
    <Text color={colors.HITAM_PUDAR} fontWeight="light" {...props}>
      {props.children}
    </Text>
  );
};

export default TextLabel;
