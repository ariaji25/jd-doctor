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
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import TextSmall from 'components/text/TextSmall';
import { getMonth, getYear } from 'date-fns';
import { forwardRef, useCallback, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { dateFormat } from 'utils';
import colors from 'values/colors';

// For date picker
const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const customDateInput = ({ value, onClick, onChange }, ref) => (
  <Input
    autoComplete="off"
    background="white"
    value={value}
    ref={ref}
    onClick={onClick}
    onChange={onChange}
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
  />
);
customDateInput.displayName = "DateInput";

const CustomInput = forwardRef(customDateInput);

const InputUnderlined = (
  { typeIcon, icon, onClear, label, maxLength, onChange, validator, readOnly, disabled, ...props },
  ref
) => {
  const [isValid, setIsValid] = useState(true)
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
        if (re.test(e.target.value) && e.target.value.length <= (maxLength ?? 100)) {
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
          if (validator) setIsValid(validator(e))
        } else {
          setValue('')
          onChange({
            target: {
              id: props.id,
              value: '',
              attributes: [{
                value: props.uid
              }]
            }
          });
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
        if (validator) setIsValid(validator(e))
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
        if (validator) setIsValid(validator(e))
        break
    }
  }

  const init = useCallback(() => {
    if (props.value) {
      setValue(props.value)
    }
  }, [])

  useState(() => {
    init()
  }, [init])

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
        {typeIcon === 'library' ?
          <Flex mr="4" h="25px" alignItems={'center'}>
            {icon}
          </Flex>
          :
          <LeadingIcon />
        }

        {props.type === 'date'
          ?
          <InputGroup size='md'>
            <ReactDatePicker
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                    {"<"}
                  </button>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                    {">"}
                  </button>
                </div>
              )}
              selected={value}
              onChange={handleOnChange}
              // isClearable={isClearable}
              // showPopperArrow={showPopperArrow}
              className="react-datapicker__input-text"
              dateFormat={'dd/MM/yyyy'}
              customInput={<CustomInput />}
            />
          </InputGroup>
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
                    <Image alt="" ml="4" h="20px" src={'/icon/eye.svg'} />
                    :
                    <Image alt="" ml="4" h="20px" src={'/icon/eye-off.svg'} />
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
              readOnly={readOnly ?? false}
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
