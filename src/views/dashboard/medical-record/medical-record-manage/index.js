import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Image, InputGroup, InputRightAddon, InputRightElement, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import colors from "values/colors"
import { useSnapshot } from 'valtio';
import stateMedicalRecord from "states/stateMedicalRecord";
import InputUnderlined from "components/input/InputUnderlined";
import ButtonMain from "components/button/ButtonMain";
import GeneralCondition from "./components/general-condition";
import RespiratorySystem from "./components/respiratory-system";
import VisionSystem from "./components/vision-system";
import HeartCirculation from "./components/heart-circulation";
import DigestiveSystem from "./components/digestive-system";
import GenitalUroSystem from "./components/genital-uro-system";
import Integumentary from "./components/integumentary-musculoskeletal-system";
import ChestAndAxilla from "./components/chest-and-axilla";

const tabs = [
  { id: 1, name: 'Keadaan umum' },
  { id: 2, name: 'Sistem pengelihatan' },
  { id: 3, name: 'Sistem pernafasan' },
  { id: 4, name: 'Sirkulasi jantung' },
  { id: 5, name: 'Sistem pencernaan' },
  { id: 6, name: 'Sistem uro genital' },
  { id: 7, name: 'Sistem integumen/muskuloskeletal' },
  { id: 8, name: 'Dada dan axilla' },
]

const MedicalRecordManagePage = () => {
  const history = useHistory()
  let { idPatient } = useParams()
  const state = useSnapshot(stateMedicalRecord);

  const onChangeSelectedTab = (id) => {
    stateMedicalRecord.selectedTab = id
  }
  return (
    <Flex minH={'100vh'}>
      <Flex flex={1.3} maxWidth='500px' background={'#E5E5E5'} padding={'20px 30px'}>
        <Flex flexDir={'column'}>
          <Flex flex={1} flexDir={'column'} justifyContent='end' gap={3}>
            <Box flex={1}>
              <Image
                onClick={() => history.push(`/dashboard/medical-record/${idPatient}`)}
                cursor={'pointer'}
                alt={'arrow-left'}
                src='/icon/arrow-left.svg'
                width={50}
              />
            </Box>
            <Flex flexDir={'column'} justifyContent='center'>
              <Box fontSize={'36px'} fontWeight='bold' color={colors.PRIMARY}>Pemeriksaan</Box>
              <Box fontSize={'13px'}>Pemeriksaan ini untuk pasien dan menjadi rekam medis </Box>
            </Flex>
          </Flex>
          <Flex flex={3} flexDir={'column'} justifyContent={'center'}>
            {tabs.map((r, i) => (
              <Box
                key={i}
                padding={'12px'}
                cursor={'pointer'}
                style={r.id === state.selectedTab ?
                  { background: colors.PRIMARY, color: 'white', borderRadius: '5px', fontWeight: 'bold' }
                  : {}}
                onClick={() => (onChangeSelectedTab(r.id))}
              >
                {r.name}
              </Box>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Box>
        <Flex alignItems={'center'} padding={'30px'}>
          <Breadcrumb separator='>' paddingLeft={'25px'}>
            <BreadcrumbItem>
              <BreadcrumbLink textDecor={'underline'} onClick={() => history.push('/dashboard')}
              >Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink textDecor={'underline'} onClick={() => history.push(`/dashboard/medical-record/${idPatient}`)}>Rekam medis</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color={colors.PRIMARY} fontWeight={'bold'}>Pemeriksaan</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
        <Flex flexDir={'column'} flex={4} justifyContent={'center'}>
          <Flex px={40}>
            <Flex flex={1} justifyContent={'space-between'} gap={4} whiteSpace={'pre'} color={colors.PRIMARY} alignItems={'center'} lineHeight={'26px'}>
              <Box>
                <Image
                  alt='patient-photo'
                  src='/img/patientPhoto.png'
                  cursor={'pointer'}
                  width={100}
                />
              </Box>
              <Box >
                <Box fontSize={'13px'}>Nama lengkap pasien</Box>
                <Box fontWeight={'bold'}>Carissa Amanda</Box>
                <Box fontSize={'13px'}>Tanggal lahir</Box>
                <Box fontWeight={'bold'}>22/02/1998 - 23 thn</Box>
              </Box>
              <Box >
                <Box fontSize={'13px'}>Alamat</Box>
                <Box fontWeight={'bold'}>2972 Westheimer Rd. Santa Ana, Illinois....</Box>
                <Box fontSize={'13px'}>Jenis kelamin</Box>
                <Box fontWeight={'bold'}>Jenis kelamin</Box>
              </Box>
            </Flex>
          </Flex>
          <Box px={40} py={5} >
            <Box fontSize={'13px'}>Keluhan yang dirasakan</Box>
            <Box color={colors.PRIMARY} textAlign={'justify'} pb={10} borderBottom={'1px solid #C0C0C0'}>
              Pilek, batuk, sakit setiap sendi kehidupan, lemas dan kurang uang. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
            </Box>
          </Box>
          {state.selectedTab === 1 &&
            <GeneralCondition />
          }
          {state.selectedTab === 2 &&
            <VisionSystem />
          }
          {state.selectedTab === 3 &&

            <RespiratorySystem />
          }
          {state.selectedTab === 4 &&
            <HeartCirculation />
          }
          {state.selectedTab === 5 &&
            <DigestiveSystem />
          }
          {state.selectedTab === 6 &&
            <GenitalUroSystem />
          }
          {state.selectedTab === 7 &&
            <Integumentary />
          }
          {state.selectedTab === 8 &&
            <ChestAndAxilla />
          }

          <Box px={40} py={5}>
            <ButtonMain width={'100%'}>Simpan</ButtonMain>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export default MedicalRecordManagePage