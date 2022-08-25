import { Box, Center, Circle, Image } from '@chakra-ui/react';
import ToastNotif from 'components/Toast';
import { useState } from 'react';
import apiBucket from 'services/apiBucket';
import { getBase64, readArrayBuffer } from 'utils';
import { fileValidator, profileFileValidator } from 'utils/inputValidator';

const size = '100px';

const ProfilePictureEdit = ({ onChange }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  // Hidden element for file picker

  const selectFile = () => {

    const input = document.getElementById('profile');
    if (input.click) {
      console.log("click")
      input.click()
    } else console.log("no click")
    // input.click();
  }

  const onFileSelected = () => {
    const input = document.getElementById('profile');
    let files = Array.from(input.files);
    console.log("files", files[0].path);
    if (files) {
      if (profileFileValidator(files[0])) getBase64(files[0], async (res) => {
        if (res) {
          const response = await apiBucket.uploadFile(files[0])
          if (response) {
            onChange({
              target: {
                id: 'profile-pic',
                value: response.data.url,
                attributes: [{ value: "Y1sUdrYBs4W" }]
              }
            });
            setSelectedFile(res)
          }
          else {
            ToastNotif({
              message: 'Gagal mengunggah file',
              type: 'error'
            })
          }
          console.log(response)
        }
      })
      else ToastNotif({
        message: 'Oops.. File foto yang dipilih lebih dari 2 MB',
        type: 'error'
      });
    }
  }
  return (
    <Circle
      onClick={(e) => selectFile()}
      w={size}
      h={size}
      position="relative"
      overflow="hidden"
    >
      <input
        type="file"
        id="profile"
        onChange={(e) => onFileSelected()}
        name="files"
        multiple
        style={{
          visibility: 'hidden',
          height: '0px',
          width: '0px'
        }} />
      <Circle w={size} h={size}>
        {selectedFile ? <Image
          alt=""
          src={selectedFile}
          width={size}
          height={size}
          objectFit="cover"
        /> : <Image
          alt=""
          src="/icon/user.svg"
          width={size}
          height={size}
          objectFit="cover"
        />}
      </Circle>

      <Circle
        cursor="pointer"
        w={size}
        h={size}
        position="absolute"
        top="0"
        left="0"
        opacity={0}
        _hover={{ opacity: 1 }}
      >
        <Box>
          <Box h="75px" />
          <Box bg="rgba(255,255,255,0.3)" w={size} h="25px" pt="4px">
            <Center>
              <Image src="/icon/camera_white.svg" alt="" />
            </Center>
          </Box>
        </Box>
      </Circle>
    </Circle>
  );
};

export default ProfilePictureEdit;
