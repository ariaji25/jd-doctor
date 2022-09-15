import { Avatar, Box, Center, Flex, Image, Radio, RadioGroup, Select, Stack, Text, useMediaQuery } from "@chakra-ui/react"
import ButtonMain from "components/button/ButtonMain"
import InputUnderlined from "components/input/InputUnderlined"
import LogoWithText from "components/LogoWithText"
import TextSmall from "components/text/TextSmall"
import { FiArchive, FiBriefcase, FiCalendar, FiCamera, FiFileText, FiMap, FiUpload, FiUser } from "react-icons/fi"
import { useHistory } from "react-router-dom"
import colors from "values/colors"
import React, { useState, useEffect, useMemo } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { GoogleMap, useJsApiLoader, Marker, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px'
};

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete();

  const handleInput = (e) => {
    console.log(e.target.value, "cariii")
    setValue(e.target.value);
  };

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions()
    const results = await getGeocode(val)
    const { lat, lng } = await getLatLng(results[0])
    setSelected({ lat, lng })
    console.log(val, "valllll", lat, lng, results)
  };
  console.log(data, "dataaaa")

  return (
    <AutoComplete openOnFocus>
      <AutoCompleteInput
        variant="filled"
        placeholder="Cari tempat"
        borderBottom={'1.5px solid #e0e0e0'}
        bg={'transparent'}
        marginStart={0}
        marginInlineStart={0}
        marginEnd={0}
        marginInlineEnd={0}
        paddingLeft={0}
        fontSize={{ base: 'sm', sm: 'md' }}
        color={colors.PRIMARY}
        fontWeight="bold"
        border="0"
        _hover={{ background: 'transparent' }}
        onChange={handleInput}
        rounded="none"
        h="35px" />
      <AutoCompleteList>
        {status === "OK" &&
          data.map(({ place_id, description }) => (
            <AutoCompleteItem
              key={place_id}
              value={description}
              onClick={() => handleSelect({ placeId: place_id })}
            >
              {description}
            </AutoCompleteItem>
          ))}
      </AutoCompleteList>
    </AutoComplete>
  );
};

function GoogleMapComponent({ children }) {
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCPSjkk8X9GAigUMdM1aCMD427I-tu3dIk",
    libraries: ["places"]
  })
  const center = useMemo(() => ({ lat: -8.5769951, lng: 116.1004894 }), [])
  const [selected, setSelected] = useState(null)

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates)
    }
  }

  function getCoordinates(position) {
    setSelected({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }

  console.log(selected, 'selected')

  const onDragEnd = (e) => {
    setSelected({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    })
  }

  useEffect(() => {
    getLocation()
  }, [])
  return isLoaded ? (
    <Box>
      <Box>
        <Flex>
          <TextSmall fontWeight="thin">Titik Koordinat Praktik</TextSmall>
          <Text fontSize="xs" color={colors.DANGER}>
            *
          </Text>
        </Flex>
      </Box>
      <Box >
        <PlacesAutocomplete setSelected={setSelected} />
      </Box>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
      >
        {selected && <Marker position={selected} onDragEnd={onDragEnd} draggable />}
      </GoogleMap>
      {selected &&
        <Box>
          <TextSmall color={colors.PRIMARY} >{selected.lat},{selected.lng}</TextSmall>
        </Box>
      }
    </Box>
  ) : <></>
}

const BiodataProfile = () => {
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
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
          <Box>
            <GoogleMapComponent />
          </Box>
          <Box textAlign={'center'}>
            <ButtonMain minW={isLargerThan1280 ? '400px' : null} onClick={() => history.push('/dashboard/profile')}>
              Lanjut
            </ButtonMain>
          </Box>
        </Stack>
      </Flex>
    </Stack>
  )
}

export default BiodataProfile