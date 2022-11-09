import { Box, Flex, Image } from "@chakra-ui/react"
import { useParams, useHistory } from "react-router-dom"
import colors from "values/colors"
import { useSnapshot } from 'valtio';
import stateMedicalRecord from "states/stateMedicalRecord";
import { FiCheckCircle } from "react-icons/fi";

const tabs = [
  { id: 1, name: 'Pemeriksaan', icon: '/icon/inspection_menu.svg', keySave: 'savedgeneralAssesment' },
  { id: 2, name: 'Diagnosis', icon: '/icon/diagnose_menu.svg', keySave: 'savedDiagnoses' },
  { id: 3, name: 'Tindakan', icon: '/icon/action_menu.svg', keySave: 'savedActions' },
  { id: 4, name: 'Pengobatan', icon: '/icon/treatment_menu.svg', keySave: 'savedTreatment' },
]

const MedicalNavigation = ({ savedStates }) => {
  const history = useHistory()
  let { idPatient } = useParams()
  const state = useSnapshot(stateMedicalRecord);

  const onChangeSelectedTab = (id) => {
    stateMedicalRecord.selectedTab = id
  }
  return (
    <Flex flex={1.3} maxWidth='500px' background={'#E5E5E5'} padding={'20px 30px'}>
      <Flex flexDir={'column'}>
        <Flex flex={1} flexDir={'column'} justifyContent='end' gap={3} minH={'200px'} maxH={'200px'}>
          <Box flex={1}>
            <Image
              onClick={() => history.push(`/dashboard/medical-record/${idPatient}`)}
              cursor={'pointer'}
              alt={'arrow-left'}
              src='/icon/arrow-left.svg'
              width={50}
            />
          </Box>
          <Box fontSize={'36px'} fontWeight='bold' color={colors.PRIMARY}>Rekam Medis</Box>
        </Flex>
        <Flex flex={3} flexDir={'column'} pt={4} minW={'300px'}>
          {tabs.map((r, i) => (
            <Box
              key={i}
              padding={'24px'}
              cursor={'pointer'}
              style={r.id === state.selectedTab ?
                { background: colors.PRIMARY, color: 'white', borderRadius: '5px', fontWeight: 'bold' }
                : {}}
              onClick={() => (onChangeSelectedTab(r.id))}
            >
              <Flex gap={3} alignItems='center'>
                <Box>
                  <Image
                    src={r.icon}
                  />
                </Box>
                <Box>
                  {r.name}
                </Box>
                <FiCheckCircle color={(savedStates[r.keySave] && savedStates[r.keySave].dataValues && savedStates[r.keySave].dataValues.length > 0) ? "green" : "grey"} />
              </Flex>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default MedicalNavigation