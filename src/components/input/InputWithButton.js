import {
  Box,
  Circle,
  Flex,
  Image,
  Input, Text
} from '@chakra-ui/react';
import ButtonOutlined from 'components/button/ButtonOutlined';
import TextSmall from 'components/text/TextSmall';
import TextSubTitle from 'components/text/TextSubTitle';
import ToastNotif from 'components/Toast';
import { forwardRef, useState } from 'react';
import apiBucket from 'services/apiBucket';
import { getBase64 } from 'utils';
import { fileValidator } from 'utils/inputValidator';
import colors from 'values/colors';

const InputWithButton = (
  { icon, nClear, onClick, label, buttonLabel, maxLength, onChange, ...props },
  ref
) => {

  const [fileName, setFileName] = useState(null)
  const [isValid, setIsValid] = useState(true)

  // Hidden element for file picker

  const selectFile = () => {

    const input = document.getElementById(props.id);
    if (input.click) {
      console.log("click")
      input.click()
    } else console.log("no click")
    // input.click();
  }

  const onFileSelected = () => {

    const input = document.getElementById(props.id);
    let files = Array.from(input.files);
    console.log("files", files);
    if (files) {
      if (fileValidator(files[0])) getBase64(files[0], async (res) => {
        if (res) {
          setFileName(files[0].name)
          const response = await apiBucket.uploadFile(files[0])
          if (response) {
            onChange({
              target: {
                id: props.id,
                value: response.data.url,
                attributes: [{
                  value: props.uid
                }]
              }
            });
            setIsValid(props.validator({
              target: {
                id: props.id,
                value: res,
                attributes: [{
                  value: props.uid
                }]
              }
            }))
            console.log(fileName)
          } else {
            ToastNotif({
              message: 'Gagal mengunggah file',
              type: 'error'
            })
          }
        }
      })
      else ToastNotif({
        message: 'Oops.. File yang dipilih lebih dari 1 MB',
        type: 'error'
      });
    }
  }

  return (
    <Box w={props.w}>
      <input
        type="file"
        id={props.id}
        onChange={(e) => onFileSelected()}
        name="files"
        multiple
        style={{
          visibility: 'hidden',
          height: '0px',
          width: '0px'
        }} />
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
      <Flex alignItems="center" w="full">
        <ButtonOutlined width="181px" height="37px" onClick={selectFile}>
          <Image src={icon} /> <Box w="20px" /> {buttonLabel ?? ""}
        </ButtonOutlined>
        <Box w="16px" />
        <TextSmall
        >
          {fileName ?? 'Belum ada file yang dipilih'}
        </TextSmall>
      </Flex>

      {(isValid ? null : props.errmessage) && <TextSmall color="red.500">{props.errmessage}</TextSmall>}
    </Box>
  );
};

export default forwardRef(InputWithButton);
