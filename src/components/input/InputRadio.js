import {
  Box,
  Flex,
  Grid,
  Radio,
  RadioGroup, Stack,
  Text
} from '@chakra-ui/react';
import { forwardRef, useState } from 'react';
import colors from 'values/colors';
import TextSmall from 'components/text/TextSmall';

export const radioType = {
  vertical: "vertical",
  horizontal: "horizontal"
}
// The options must follow the option model like :
/*
  1. [{label:"",value:""}]
  or
  2. ["Options1","Option2"]
*/
const InputRadio = (
  { name, w, isRequired, options, label, value, onChange, radioStyle = radioType.vertical, ...props },
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
    <>
      {
        radioStyle === radioType.vertical
          ? <>
            <Box w={w ?? '100%'}>
              {
                label && (
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
                    <Radio key={`radio-option-${o.value ?? o}`} value={o.value ?? o}>
                      {o.label ?? o}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
              {(props.errmessage) && <TextSmall color="red.500">{isValid ? "" : props.errmessage}</TextSmall>}
            </Box>
          </>
          : <>
            <Flex>
              <Box flex={4}>{label}</Box>
              {isRequired && (
                <Text fontSize="xs" color={colors.DANGER}>
                  *
                </Text>
              )}
              <Box flex={4}>
                <RadioGroup name={name} ref={ref} value={value} onChange={onStateChange}>
                  <Grid templateColumns={`repeat(${options.length > 2 ? 3 : 2}, 1fr)`} gap={2}>
                    {options.map((o) => (
                      <Radio marginLeft={'16px'} key={`radio-option-${o.value ?? o}`} value={o.value ?? o}>
                        {o.label ?? o}
                      </Radio>
                    ))}
                  </Grid>
                </RadioGroup>
              </Box>
            </Flex>
          </>
      }</>
  );
};

export default forwardRef(InputRadio);
