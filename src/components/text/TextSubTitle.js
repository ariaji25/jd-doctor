import colors from 'values/colors';
import { Text } from '@chakra-ui/react';

const TextSubTitle = (props) => {
  return (
    <Text
      color={colors.PRIMARY}
      fontSize="lg"
      fontWeight="semibold"
      {...props}
    >
      {props.children}
    </Text>
  );
};

export default TextSubTitle;
