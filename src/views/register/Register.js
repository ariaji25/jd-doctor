import { Box, Center, Flex, Image, InputGroup, InputLeftAddon, Modal, ModalBody, ModalContent, ModalOverlay, Stack, Text, useDisclosure, useMediaQuery, CircularProgress } from "@chakra-ui/react";
import { globalContext } from "App";
import ButtonMain from "components/button/ButtonMain";
import Content from "components/Content";
import ProfilePictureEdit from "components/dashboard/biodata/ProfilePictureEdit";
import { InputWithModel } from "components/input";
import PageContainer from "components/PageContainer";
import ToastNotif from "components/Toast";
import React, { useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import apiClinic from "services/apiClinic";
import apiClinicArea from "services/apiClinicArea";
import apiDoctor from "services/apiDoctor";
import { dateFormat, getBase64 } from "utils";
import { nikValidator, phoneValidator } from "utils/inputValidator";
import colors from "values/colors";
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Step, Stepper } from 'react-form-stepper';
import { FiCheck, FiFileText, FiLogIn, FiX } from "react-icons/fi";
import { useHistory, useParams, useLocation } from "react-router-dom";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import TextSmall from "components/text/TextSmall";
import LogoWithText from "components/LogoWithText";
import Footer from "components/Footer";
import QueryString from "qs";

const listSpecialisasi = ['Dokter Umum', 'Dokter Gigi', 'Penyakit Dalam']

function listSpecialisasiFunc() {
  return (
    <>
      {listSpecialisasi.map((r) => (
        <option value={r}>{r}</option>
      ))}
    </>
  )
}
const containerStyle = {
  width: '100%',
  height: '300px'
};

/*global google*/


let markerArray = [];

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete();

  const [isValid, setIsValid] = useState(true)

  const handleInput = (e) => {
    setValue(e.target.value);
    if (e.target.value) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  };

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions()
    const results = await getGeocode(val)
    const { lat, lng } = await getLatLng(results[0])
    setSelected({ lat, lng })
    if (val) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  };

  return (
    <>
      <InputGroup>
        <InputLeftAddon bg='transparent' borderColor={'#1E3869 !important'} borderRight={'none'} children={
          <Image alt="" h="25px" src={'/icon/dateicon.svg'} style={{ padding: '3px' }} />
        } />
        <AutoComplete openOnFocus>
          <AutoCompleteInput
            variant="filled"
            placeholder="Cari tempat"
            // borderBottom={'1.5px solid #e0e0e0'}
            bg={'transparent'}
            marginStart={0}
            marginInlineStart={0}
            marginEnd={0}
            marginInlineEnd={0}
            paddingLeft={0}
            fontSize={{ base: 'sm', sm: 'md' }}
            color={colors.PRIMARY}
            fontWeight="bold"
            // border="0"
            _hover={{ background: 'transparent' }}
            onChange={handleInput}
            // rounded="none"
            borderRadius={'0 6px 6px 0'}
            borderLeft={'none'}
            borderColor={'#1E3869 !important'}
            h="40px" />
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
      </InputGroup>
      {(!value) && <TextSmall color="red.500">{isValid ? "" : 'Titik koordinat tidak boleh kosong'}</TextSmall>}
    </>
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
      <Box textDecor={'underline'} marginBottom={5}>
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

export const RegisterPage = () => {
  const history = useHistory()
  const { params } = useParams()
  const { search } = useLocation()
  const queryStringParam = QueryString.parse(search, { ignoreQueryPrefix: true })
  const [loading, setLoading] = useState(false)
  const [registerData, setRegisterData] = useState({});
  const [step, setStep] = useState(0)
  const [verif, setVerif] = useState(false)

  const validator = (e) => {
    switch (e.target.id) {
      case 'phone':
        return phoneValidator(e.target.value)
      case 'nik':
        return nikValidator(e.target.value)
      default:
        return e.target.value ? e.target.value.length > 0 : false;
    }
  }
  async function cekStatus() {
    if (queryStringParam.email && queryStringParam.str) {
      try {
        const statusRes = await apiDoctor.checkRegistrationStatus(queryStringParam.email, queryStringParam.str)
        if (statusRes) {
          console.log("Status", statusRes)
          switch (statusRes.status) {
            case "0":
              setStep(1)
              break
            case "1":
              setVerif(true)
              setStep(2)
              break
            default:
              setStep(0)
              break
          }
        }
      } catch (e) {
        setStep(0)
      }
      setLoading(false)
    } else {
      setStep(0)
    }
  }
  useEffect(() => {
    if (queryStringParam.email && queryStringParam.str)
      cekStatus()
  }, [(queryStringParam.email && queryStringParam.str)])

  const leftInputModel = [
    {
      label: 'Nama Lengkap',
      id: 'name',
      uid: 'HyfzjNVhlzM',
      isRequired: true,
      placeholder: 'Nama Kamu',
      errMessage: 'Nama lengkap tidak boleh kosong',
      type: 'text',
      typeModel: 'outlined',
      icon: '/icon/user.svg',
    },
    {
      label: 'NIK',
      id: 'nik',
      uid: 'xGjeKnsJobT',
      isRequired: true,
      errMessage: 'NIK harus berupa 16 digit angka',
      type: 'number',
      typeModel: 'outlined',
      icon: '/icon/credit_card.svg',
      maxLength: 16
    },
    {
      label: 'Tanggal lahir',
      id: 'bod',
      uid: 'SSsiEz3cVbn',
      isRequired: true,
      errMessage: 'Tanggal lahir tidak boleh kosong',
      type: 'date',
      typeModel: 'outlined',
      icon: '/icon/dateicon.svg'
    },
    {
      label: 'Jenis Kelamin',
      id: 'gender',
      uid: 'TlO4kdMfHqa',
      isRequired: true,
      errMessage: 'Belum memilih jenis kelamin',
      type: 'radio',
      typeModel: 'outlined',
      options: [{
        value: 'male',
        label: 'Laki-laki'
      },
      {
        value: 'female',
        label: 'Perempuan'
      }]
    },
    {
      label: 'Alamat Domisili',
      id: 'address',
      uid: 'aRHSGgFeOjr',
      isRequired: true,
      errMessage: 'Alamat tidak boleh kosong',
      type: 'text',
      typeModel: 'outlined',
      icon: '/icon/addressicon.svg'
    },
    {
      label: 'Nomor HP Dokter',
      id: 'phone',
      uid: 'x9tchw0swEu',
      isRequired: true,
      errMessage: 'Nomor HP tidak boleh kosong',
      type: 'number',
      typeModel: 'outlined',
      icon: '/icon/hpicon.svg',
      maxLength: 12
    },
    {
      label: 'Email',
      id: 'email',
      uid: 'KNhGfY4ApxB',
      isRequired: true,
      errMessage: 'Email tidak boleh kosong',
      type: 'text',
      typeModel: 'outlined',
      icon: '/icon/emailicon.svg'
    },
    // {
    //   label: 'Nama Ibu Kandung',
    //   id: 'mother_name',
    //   uid: null,
    //   isRequired: false,
    //   errMessage: 'Nama Ibu Kandung tidak boleh kosong',
    //   type: 'text',
    //   typeModel: 'outlined',
    //   icon: '/icon/user.svg'
    // },
  ]
  const rightInputModel = [
    {
      label: 'Nomor STR',
      id: 'str',
      uid: 'x4sNePtpkmR',
      isRequired: true,
      errMessage: 'Nomor STR tidak boleh kosong',
      type: 'text',
      typeModel: 'outlined',
      icon: '/icon/stricon.svg'
    },
    {
      label: 'Upload file STR',
      id: 'fileStr',
      uid: 'iVFHvAdkYL3',
      isRequired: true,
      errMessage: 'File STR tidak boleh kosong',
      type: 'button',
      typeModel: 'outlined',
      accept: '.pdf',
      buttonLabel: 'Pilih file STR',
      icon: '/icon/uploadicon.svg'
    },
    {
      label: 'Tanggal kadaluarsa STR',
      id: 'exp_str',
      uid: 'zpc3MLKYNtu',
      isRequired: true,
      errMessage: 'Tanggal kadaluarsa STR tidak boleh kosong',
      type: 'date',
      typeModel: 'outlined',
      icon: '/icon/dateicon.svg'
    },
    {
      label: 'Nomor SIP',
      id: 'sip',
      uid: 'h7tG7kb6qzi',
      isRequired: true,
      errMessage: 'Nomor STR tidak boleh kosong',
      type: 'text',
      typeModel: 'outlined',
      icon: '/icon/stricon.svg'
    },
    {
      label: 'Upload file SIP',
      id: 'fileSip',
      uid: 'GFwYsmRCGsu',
      isRequired: true,
      errMessage: 'File SIP tidak boleh kosong',
      type: 'button',
      typeModel: 'outlined',
      accept: '.pdf',
      buttonLabel: 'Pilih file SIP',
      icon: '/icon/uploadicon.svg'
    },
    {
      label: 'Tanggal kadaluarsa SIP',
      id: 'exp_sip',
      uid: 'S1CXR9mCYnA',
      isRequired: true,
      errMessage: 'Tanggal kadaluarsa SIP tidak boleh kosong',
      type: 'date',
      typeModel: 'outlined',
      icon: '/icon/dateicon.svg'
    },
    {
      label: 'Spesialisasi dokter',
      id: 'specialization',
      uid: 'c7ynt8IronO',
      isRequired: true,
      errMessage: 'Spesialisasi dokter tidak boleh kosong',
      type: 'select',
      typeModel: 'outlined',
      selectOption: () => listSpecialisasiFunc(),
      icon: '/icon/spesialisasiicon.svg'
    },
    {
      label: 'Tanggal mulai bekerja sebagai dokter umum/spesialis terkait',
      id: 'start_work',
      uid: 'EDOD3USCLVz',
      isRequired: true,
      errMessage: 'Tanggal mulai bekerja sebagai dokter umum/spesialis terkait tidak boleh kosong',
      type: 'date',
      typeModel: 'outlined',
      icon: '/icon/dateicon.svg'
    },
    {
      label: 'Lokasi Praktek',
      id: 'clinic_location',
      uid: 'Hib73XtwOIj',
      isRequired: true,
      errMessage: 'Lokasi praktek tidak boleh kosong',
      type: 'text',
      typeModel: 'outlined',
      icon: '/icon/mapicon.svg'
    },
  ]

  const onSave = async () => {
    // const onSave = async () => {

    const attributes = []
    for (const d in registerData) {
      if (registerData[d].uid) attributes.push({
        value: registerData[d].value,
        attribute: registerData[d].uid
      })
    }

    // if (attributes.length < 11) {
    //   ToastNotif({
    //     message: 'Oops.. Data diri belum lengkap, mohon dilengkapi !',
    //     type: 'error'
    //   });
    // } else {
    const response = await apiDoctor.create(attributes)
    if (response.status === 200) {
      ToastNotif({
        message: 'Yeay, Berhasil registrasi',
        type: 'success'
      })
      const email = attributes.find(r => r.attribute === 'KNhGfY4ApxB').value
      const str = attributes.find(r => r.attribute === 'x4sNePtpkmR').value
      setStep(1)
      history.push(`/sign-up?email=${email}&str=${str}`)
    } else {
      ToastNotif({
        message: 'Oopss.. Terjadi kesalahan',
        type: 'error'
      })
    }
    // }
  }

  const onInputChange = (e) => {
    var data = registerData;
    data[e.target.id] = {
      uid: e.target.attributes[0].value,
      value: e.target.value
    }
    setRegisterData(data)
  }

  const LeftForms = () => {
    return (
      <>
        <Box w='lg'>
          {leftInputModel.map((e) => <InputWithModel key={e.id} inputModel={e} onChange={onInputChange} validator={validator} />)}
        </Box>
      </>
    )
  }

  const RightForms = () => {
    const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

    const { isOpen, onOpen, onClose } = useDisclosure()

    const openModal = () => {
      const attributes = []
      for (const d in registerData) {
        if (registerData[d].uid) attributes.push({
          value: registerData[d].value,
          attribute: registerData[d].uid
        })
      }
      console.log(attributes, "test")
      if (attributes.length < 16) {
        ToastNotif({
          message: 'Oops.. Data diri belum lengkap, mohon dilengkapi !',
          type: 'error'
        });
      } else {
        onOpen()
      }
    }
    return (
      <>
        <Box w='lg'>
          {rightInputModel.map((e) => <InputWithModel key={e.id} inputModel={e} onChange={onInputChange} validator={validator} />)}
        </Box>
        <Box w='lg'>
          <GoogleMapComponent />
        </Box>
        <Box h='20px' />
        <Flex w='lg' mb={8} justifyContent={'end'}>
          <ButtonMain width={'fit-content'}
            px={8} borderRadius={'6px'}
            // onClick={(e) => onSave()}
            onClick={openModal}
          >
            <Flex>
              <Text>Lanjut</Text>
              <Image src="/icon/chevron-right.svg" />
            </Flex>
          </ButtonMain>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose} size='xl' >
          <ModalOverlay />
          <ModalContent minW={isLargerThan1280 ? '1000px' : null}>
            <ModalBody>
              <Flex justifyContent={'right'}>
                <FiX fontSize={36} color={colors.PRIMARY} onClick={onClose} cursor={'pointer'} />
              </Flex>
              <Box pt={4} pb={14} px={14} color={'#505050'}>
                <Text fontWeight={'bold'} fontSize={'36px'}>Registrasi dokter</Text>
                <Text fontSize={'14px'} pb={8}>Data yang disimpan tidak dapat diubah, pastikan data Anda sudah benar</Text>
                <Stack pb={8}>

                  {
                    leftInputModel.map((i) =>
                      <Flex bg={'#F9F9FC'}>
                        <Text flex={1} color={colors.PRIMARY} fontWeight={'bold'}>{i.label}</Text>
                        <Text flex={1}>{registerData[i.id] && registerData[i.id].value}</Text>
                      </Flex>
                    )
                  }
                  {
                    rightInputModel.filter(e => !e.label.includes("Upload")).map((i) =>
                      <Flex bg={'#F9F9FC'}>
                        <Text flex={1} color={colors.PRIMARY} fontWeight={'bold'}>{i.label}</Text>
                        <Text flex={1}>{registerData[i.id] && registerData[i.id].value}</Text>
                      </Flex>
                    )
                  }
                </Stack>
                <Box textAlign={'center'}>
                  <ButtonMain minW={isLargerThan1280 ? '400px' : null} onClick={() => onSave()}>
                    Simpan dan lanjut
                  </ButtonMain>
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

  console.log(queryStringParam, "cok")

  const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)')
  const getOrgUnit = async () => {
    await apiClinicArea.list()
  }

  const init = useCallback(() => {
    // setLoading(true)
    getOrgUnit()
  }, [])

  useEffect(() => {
    init()
  }, [init])


  return (
    <div>
      <PageContainer bg="unset">
        <Content>
          <Center marginTop={"50px"} >
            {loading ?
              <CircularProgress />
              :
              <Box w={isLargerThan1000 ? '1000px' : null}>
                <Flex color={'#505050'} justifyContent={'center'} alignItems={'start'} gap={8} borderBottom={'1px solid #EAEAEA'} pb={8}>
                  <Box left={0}>
                    <Image
                      onClick={() => history.push('/login')}
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
                      <Text fontSize={'36px'} fontWeight='bold'>Registrasi Dokter</Text>
                      <Text>Hanya dokter dengan SIP  yang bisa registrasi. Lengkapi identitas diri anda</Text>
                    </Box>
                  </Box>
                </Flex>
                <Box height={"54px"} />
                {/* Profile picture input */}

                <Stepper activeStep={step} connectorStateColors={true}
                  styleConfig={{ activeBgColor: colors.PRIMARY, inactiveBgColor: '#DCE3E9', completedBgColor: colors.PRIMARY, activeTextColor: '#DCE3E9', inactiveTextColor: colors.PRIMARY }}
                  connectorStyleConfig={{ activeColor: colors.PRIMARY, completedColor: colors.PRIMARY, disabledColor: '#DCE3E9' }}
                >
                  <Step label="Pendaftararan"  >{step === 0 ? '1' : <FiCheck />}</Step>
                  <Step label="Verifikasi"> {((step === 0) || (step === 1)) ? '2' : <FiCheck color="white" />}</Step>
                  <Step label="Hasil" >{((step === 0) || (step === 1) || (step === 2)) ? '3' : <FiCheck />}</Step>
                </Stepper>
                {step === 0 &&
                  <>
                    <Box height={"54px"} />
                    <Flex flexWrap={'wrap'} gap={4} justifyContent="center">
                      <Box flex={0.5}>
                        <Center ml={8}>
                          <ProfilePictureEdit onChange={onInputChange} />
                        </Center>
                      </Box>
                      <Box flex={1}>
                        <LeftForms />
                        <RightForms />
                      </Box>
                    </Flex>
                  </>
                }
                {step === 1 &&
                  <Stack mx={24} my={12}>
                    <Flex p={8} gap={8} borderRadius={6} borderStyle='dashed' borderWidth='3px' borderColor='#FF6200' bg='#FFEBCC'>
                      <Center><Image src="/icon/alert-triangle.svg" /></Center>
                      <Stack color='#FF7400'>
                        <Text fontSize={'24px'} fontWeight={'bold'}>Data diri berhasil dikirim</Text>
                        <Text>Mohon menunggu untuk verifikasi data oleh tim JumpaDokter. Selanjutnya kami akan mengirimkan pemberitahuan terkait proses verifikasi melalui email yang anda daftarkan di proses sebelumnya.<br />
                          <ul style={{ paddingLeft: 20, fontWeight: 'bold' }}>
                            <li>Estimasi verifikasi 3-4 hari kerja</li>
                            <li>JumpaDokter akan mengirimkan notifikasi hasil verifikasi data melalui alamat email</li>
                            <li>Klik <a href='/registration-status'><u color="blue">disini</u></a> untuk cek status verifikasi secara berkala</li>
                          </ul>
                        </Text>
                      </Stack>
                    </Flex>
                    <Box textAlign={'right'}>
                      <ButtonMain minW={'150px'} bg="white" color={colors.PRIMARY} onClick={() => history.push('/login')}>
                        Kembali
                      </ButtonMain>
                    </Box>
                  </Stack>
                }
                {((step === 2) && verif) ?
                  <Stack mx={24} my={12}>
                    <Flex p={8} gap={8} borderRadius={6} borderStyle='dashed' borderWidth='3px' borderColor='#2DA771' bg='#CCFFCE'>
                      <Center><Image src="/icon/check-circle.svg" /></Center>
                      <Stack color='#2DA771'>
                        <Text fontSize={'24px'} fontWeight={'bold'}>Halo dok, Selamat bergabung di JumpaDokter</Text>
                        <Text>
                          <ul style={{ paddingLeft: 20, fontWeight: 'bold' }}>
                            <li>Silahkan klik tombol “LOGIN” untuk masuk ke dalam aplikasi JumpaDokter</li>
                          </ul>
                        </Text>
                      </Stack>
                    </Flex>
                    <Box textAlign={'right'}>
                      <ButtonMain minW={'150px'} onClick={() => history.push('/login')}>
                        <FiLogIn /> Login
                      </ButtonMain>
                    </Box>
                  </Stack>
                  : (step === 2) &&
                  <Stack mx={24} my={12}>
                    <Flex p={8} gap={8} borderRadius={6} borderStyle='dashed' borderWidth='3px' borderColor='#EF0000' bg='#FFCCCC'>
                      <Center><Image src="/icon/x-circle.svg" /></Center>
                      <Stack color='#EF0000'>
                        <Text fontSize={'24px'} fontWeight={'bold'}>Verifikasi anda gagal</Text>
                        <Text>
                          <ul style={{ paddingLeft: 20, fontWeight: 'bold' }}>
                            <li>Silahkan cek kembali data yang anda masukkan dan mengirimkan kembali pastikan data yang anda kirim benar</li>
                          </ul>
                        </Text>
                      </Stack>
                    </Flex>
                    <Box textAlign={'right'}>
                      <ButtonMain minW={'150px'} onClick={() => history.push('/sign-up')}>
                        <FiFileText /> Perbaiki data
                      </ButtonMain>
                    </Box>
                  </Stack>
                }
              </Box>
            }
          </Center>
          <Footer />
        </Content>
      </PageContainer>
    </div>
  );
}