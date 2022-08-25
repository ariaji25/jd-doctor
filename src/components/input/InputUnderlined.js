import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Circle,
  Flex,
  Image,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import TextSmall from 'components/text/TextSmall';
import { forwardRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { dateFormat } from 'utils';
import colors from 'values/colors';

const InputUnderlined = (
  { icon, onClear, label, maxLength, onChange, validator, ...props },
  ref
) => {
  const [isValid, setIsValid] = useState(false)
  const [value, setValue] = useState('')
  const LeadingIcon = () => {
    if (icon) {
      return <Image alt="" mr="4" h="25px" src={icon} />;
    }
    return null;
  };

  const handleOnChange = (e) => {
    if (props.type) switch (props.type) {
      case 'date':
        console.log(e)
        onChange({
          target: {
            id: props.id,
            value: dateFormat(e, 'yyyy-MM-dd'),
            attributes: [{
              value: props.uid
            }]
          }
        })
        setIsValid(dateFormat(e, 'dd/MM/yyyy'))
        setValue(e)
        break
      case 'number':
        const re = /^[0-9\b]+$/;
        if (re.test(e.target.value) && e.target.value.length <= maxLength) {
          setValue(e.target.value)
          onChange({
            target: {
              id: props.id,
              value: e.target.value,
              attributes: [{
                value: props.uid
              }]
            }
          });
          setIsValid(validator(e))
        }
        break
      case 'password':
        setValue(e.target.value)
        onChange({
          target: {
            id: props.id,
            value: e.target.value,
            attributes: [{
              value: props.uid
            }]
          }
        });
        setIsValid(validator(e))
        break
      default:
        setValue(e.target.value)
        onChange({
          target: {
            id: props.id,
            value: e.target.value,
            attributes: [{
              value: props.uid
            }]
          }
        });
        setIsValid(validator(e))
        break
    }
  }

  return (
    <Box w={props.w}>
      {label && (
        <Flex>
          <TextSmall fontWeight="thin">{label}</TextSmall>
          {props.isRequired && (
            <Text fontSize="xs" color={colors.DANGER}>
              *
            </Text>
          )}
        </Flex>
      )}
      <Flex alignItems="center" borderBottom="1px solid #ccc" w="full">
        <LeadingIcon />

        {props.type === 'date'
          ? <ReactDatePicker
            dateFormat={'dd/MM/yyyy'}
            selected={value}
            onChange={handleOnChange} />
          : props.type === 'password' ?
            <InputGroup size='md'>
              <Input
                {...props}
                ref={ref}
                marginStart={0}
                marginInlineStart={0}
                marginEnd={0}
                marginInlineEnd={0}
                paddingLeft={0}
                fontSize={{ base: 'sm', sm: 'md' }}
                color={colors.PRIMARY}
                fontWeight="bold"
                border="0"
                rounded="none"
                h="35px"
                _focus={{ outline: 'none' }}
                maxLength={maxLength}
                value={value}
                onChange={handleOnChange}
                type={props.show ? 'text' : 'password'}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' bg='transparent' onClick={props.handleShow} _hover={{ background: 'transparent' }} _focus={{ boxShadow: 'none !important' }}>
                  {props.show ?
                    <Image alt="" ml="4" h="20px" src={'icon/eye.svg'} />
                    :
                    <Image alt="" ml="4" h="20px" src={'icon/eye-off.svg'} />
                  }
                </Button>
              </InputRightElement>
            </InputGroup>

            : <Input
              {...props}
              ref={ref}
              marginStart={0}
              marginInlineStart={0}
              marginEnd={0}
              marginInlineEnd={0}
              paddingLeft={0}
              fontSize={{ base: 'sm', sm: 'md' }}
              color={colors.PRIMARY}
              fontWeight="bold"
              border="0"
              rounded="none"
              h="35px"
              _focus={{ outline: 'none' }}
              maxLength={maxLength}
              value={value}
              onChange={handleOnChange}
            />
        }
        {onClear && (
          <Circle
            size="20px"
            border={`1px solid ${colors.PRIMARY}`}
            _hover={{ bg: 'gray.200' }}
            cursor="pointer"
            onClick={onClear}
          >
            <Text mt="-1px" fontWeight="bold" fontSize="11px">
              x
            </Text>
          </Circle>
        )}
      </Flex>
      {(props.errmessage) && <TextSmall color="red.500">{isValid ? "" : props.errmessage}</TextSmall>}
    </Box>
  );
};

export default forwardRef(InputUnderlined);
