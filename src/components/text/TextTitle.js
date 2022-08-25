import { Text } from '@chakra-ui/react';
import colors from 'values/colors';

const TextTitle = (props) => {
  return (
    <Text color={colors.PRIMARY} fontSize="3xl" fontWeight="bold" {...props}>
      {props.children}
    </Text>
  );
};

export default TextTitle;
