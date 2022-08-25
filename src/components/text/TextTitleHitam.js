import { Text } from '@chakra-ui/react';
import colors from 'values/colors';

const TextTitleHitam = (props) => {
  return (
    <Text
      color={colors.HITAM_PUDAR}
      fontSize="3xl"
      fontWeight="bold"
      {...props}
    >
      {props.children}
    </Text>
  );
};

export default TextTitleHitam;
