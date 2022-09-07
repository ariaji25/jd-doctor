import { Avatar, Box, Center, Flex, Image, Radio, RadioGroup, Select, Stack, Text } from "@chakra-ui/react"
import ButtonMain from "components/button/ButtonMain"
import InputUnderlined from "components/input/InputUnderlined"
import LogoWithText from "components/LogoWithText"
import TextSmall from "components/text/TextSmall"
import { FiArchive, FiBriefcase, FiCalendar, FiCamera, FiFileText, FiMap, FiUpload, FiUser } from "react-icons/fi"
import { useHistory } from "react-router-dom"
import colors from "values/colors"
import GoogleMapReact from 'google-map-react';

const defaultProps = {
  center: {
    lat: -8.5907447,
    lng: 116.1187886
  },
  zoom: 20
};

const BiodataProfile = () => {
  const history = useHistory()

  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };

  return (
    <Stack px={28} py={12}>
      <Flex color={'#505050'} justifyContent={'center'} alignItems={'start'} gap={8} borderBottom={'1px solid #EAEAEA'} pb={8}>
        <Box left={0}>
          <Image
            onClick={() => history.push('/dashboard')}
            cursor={'pointer'}
            alt={'arrow-left'}
            src='/icon/arrow-left.svg'
          />
        </Box>
        <Flex flex={2} justifyContent={'end'} >
          <LogoWithText />
        </Flex>
        <Box flex={3} >
          <Box maxW={'530px'}>
            <Text fontSize={'36px'} fontWeight='bold'>Biodata dokter</Text>
            <Text>Hanya dokter dengan SIP  yang bisa registrasi. Lengkapi identitas diri anda</Text>
          </Box>
        </Box>
      </Flex>
      <Box pt={8}>
        <Flex justifyContent={'center'} borderRadius={'50%'}  >
          <Flex alignItems={'end'} justifyContent={'center'} flex={1} backgroundImage={'url(/img/patientPhoto.png) !important'} bgSize='cover' h={115} borderRadius={50} maxW={115}>
            <Center flex={1} bg={'#FFFFFF57'} p={'5px 0'} >
              <FiCamera color="white" />
            </Center>
          </Flex>
        </Flex>
      </Box>
      <Flex gap={16} pt={8}>
        <Stack flex={1} gap={4}>
          <Box>
            <InputUnderlined
              type='text'
              label='Nama'
              placeholder='Nama lengkap'
              icon={'/icon/user.svg'}
              isRequired
              onChange={(e) => { console.log('cokkkk', e) }}
            />
          </Box>
          <Box>
            <InputUnderlined
              type='text'
              label='No KTP'
              placeholder='5201xxxxxx'
              icon={'/icon/credit_card.svg'}
              isRequired
              onChange={(e) => { console.log('cokkkk', e) }}
            />
          </Box>
          <Box>
            <InputUnderlined
              type='date'
              label='Tanggal Lahir'
              placeholder='00-00-0000'
              typeIcon='library'
              icon={<FiCalendar fontSize={'27px'} color={'#505050'} />}
              isRequired
              onChange={(e) => { console.log('cokkkk', e) }}
            />
          </Box>
          <Box>
            <Flex>
              <TextSmall fontWeight="thin">Jenis Kelamin</TextSmall>
              <Text fontSize="xs" color={colors.DANGER}>
                *
              </Text>
            </Flex>
            <RadioGroup value={'Laki-Laki'} onChange={(e) => { console.log('cokkkk', e) }}>
              <Radio value='Laki-laki'>Laki-laki</Radio>
              <Radio value='Perempuan'>Perempuan</Radio>
            </RadioGroup>
          </Box>
          <Box>
            <InputUnderlined
              type='text'
              label='Alamat Domisili'
              placeholder='Jl.merak...'
              typeIcon='library'
              icon={<FiMap fontSize={'20px'} color={'#505050'} />}
              isRequired
              onChange={(e) => { console.log('cokkkk', e) }}
            />
          </Box>
          <Box >
            <Flex>
              <TextSmall fontWeight="thin">Jenis Kelamin</TextSmall>
              <Text fontSize="xs" color={colors.DANGER}>
                *
              </Text>
            </Flex>
            <Flex alignItems={'end'} gap={3}>
              <Flex align={'center'} px={4} py={2} bg={'#F6F6F6'} border={'1px solid #EAEAEA'} borderRadius={'25px'} >
                <Box>
                  <Image src='/icon/flag-indo-circle.svg' />
                </Box>
                <Text>+62</Text>
              </Flex>
              <Box flex={1}>
                <InputUnderlined
                  type='text'
                  placeholder='081xxxxxxx'
                  isRequired
                  onChange={(e) => { console.log('cokkkk', e) }}
                />
              </Box>
            </Flex>
          </Box>
          <Box>
            <InputUnderlined
              type='text'
              label='Email'
              placeholder='mail@gmail.com'
              icon={'/icon/user.svg'}
              isRequired
              onChange={(e) => { console.log('cokkkk', e) }}
            />
          </Box>
          <Box>
            <InputUnderlined
              type='text'
              label='Nama Ibu Kandung'
              placeholder='Nama ibu kandung'
              icon={'/icon/user.svg'}
              isRequired
              onChange={(e) => { console.log('cokkkk', e) }}
            />
          </Box>
        </Stack>
        <Stack flex={1} gap={4}>
          <Box>
            <InputUnderlined
              type='text'
              label='No STR'
              placeholder='1234567xxx'
              typeIcon='library'
              icon={<FiFileText fontSize={'27px'} color={'#505050'} />}
              isRequired
              onChange={(e) => { console.log('cokkkk', e) }}
            />
          </Box>
          <Box>
            <Flex alignItems={'center'} py={2} gap={2}>
              <ButtonMain bg='white' color={colors.PRIMARY}><FiUpload /> Upload file STR</ButtonMain>
              <Text>Tidak ada file yang terpilih</Text>
            </Flex>
          </Box>
          <Box>
            <InputUnderlined
              type='text'
              label='No SIP'
              placeholder='1234567xxx'
              typeIcon='library'
              icon={<FiFileText fontSize={'27px'} color={'#505050'} />}
              isRequired
              onChange={(e) => { console.log('cokkkk', e) }}
            />
          </Box>
          <Box>
            <Flex alignItems={'center'} py={1} gap={2}>
              <ButtonMain bg='white' color={colors.PRIMARY}><FiUpload /> Upload file SIP</ButtonMain>
              <Text>Tidak ada file yang terpilih</Text>
            </Flex>
          </Box>
          <Box>
            <InputUnderlined
              type='text'
              label='Lokasi'
              placeholder='1234567xxx'
              typeIcon='library'
              icon={<FiBriefcase fontSize={'27px'} color={'#505050'} />}
              isRequired
            />
          </Box>
          <Box style={{ height: '250px', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
              <Box
                lat={-8.5907447}
                lng={116.1187886}
                bg={'red'}
                h={5}
                w={5}
                borderRadius={5}
              >
                A
              </Box>
            </GoogleMapReact>
          </Box>
        </Stack>
      </Flex>
    </Stack>
  )
}

export default BiodataProfile