import {
  Box,
  Flex,
  Radio,
  RadioGroup, Stack,
  Text
} from '@chakra-ui/react';
import { forwardRef, useState } from 'react';
import colors from 'values/colors';
import TextSmall from 'components/text/TextSmall';

const InputRadio = (
  { name, w, isRequired, options, label, value, onChange, ...props },
  ref
) => {
  const [isValid, setIsValid] = useState(false)

  const onStateChange = (e) => {
    console.log(e)
    onChange({
      target: {
        id: props.id,
        value: e.toString(),
        attributes: [{ value: props.uid }]
      }
    })
    setIsValid(true)
  }

  return (
    <Box w={w}>
      {label && (
        <Flex>
          <TextSmall fontWeight="thin">{label}</TextSmall>
          {isRequired && (
            <Text fontSize="xs" color={colors.DANGER}>
              *
            </Text>
          )}
        </Flex>
      )}
      <RadioGroup name={name} ref={ref} value={value} onChange={onStateChange}>
        <Stack direction="row">
          {options.map((o) => (
            <Radio key={`radio-option-${o.value}`} value={o.value}>
              {o.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      {(props.errmessage) && <TextSmall color="red.500">{isValid ? "" : props.errmessage}</TextSmall>}
    </Box>
  );
};

export default forwardRef(InputRadio);
