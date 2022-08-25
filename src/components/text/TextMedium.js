import colors from 'values/colors';
import { Text } from '@chakra-ui/react';

const TextMedium = (props) => {
  return (
    <Text color={colors.PRIMARY} fontWeight="medium" {...props}>
      {props.children}
    </Text>
  );
};

export default TextMedium;
