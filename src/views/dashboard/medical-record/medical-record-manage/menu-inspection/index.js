import { Box, Flex } from "@chakra-ui/react"
import colors from "values/colors"
import { useSnapshot } from 'valtio';
import stateMedicalRecord from "states/stateMedicalRecord";
import GeneralCondition from "./components/general-condition";
import RespiratorySystem from "./components/respiratory-system";
import VisionSystem from "./components/vision-system";
import HeartCirculation from "./components/heart-circulation";
import DigestiveSystem from "./components/digestive-system";
import GenitalUroSystem from "./components/genital-uro-system";
import Integumentary from "./components/integumentary-musculoskeletal-system";
import ChestAndAxilla from "./components/chest-and-axilla";


const tabss = [
  { id: 1, name: 'Keadaan umum' },
  { id: 2, name: 'Sistem pengelihatan' },
  { id: 3, name: 'Sistem pernafasan' },
  { id: 4, name: 'Sirkulasi jantung' },
  { id: 5, name: 'Sistem pencernaan' },
  { id: 6, name: 'Sistem uro genital' },
  { id: 7, name: 'Sistem integumen/muskuloskeletal' },
  { id: 8, name: 'Dada dan axilla' },
]


const MenuInspection = () => {
  const state = useSnapshot(stateMedicalRecord);

  const onChangeSelectedTabInternal = (id) => {
    stateMedicalRecord.selectedTabInternal = id
  }
  return (
    <>
      <Box px={14} >
        <Flex gap={2} overflowX={'scroll'}>
          {tabss.map((r, i) => (
            <Box
              key={i}
              cursor={'pointer'}
              borderRadius={'5px 5px 0 0'}
              fontSize={'13px'}
              flex={1}
              bg={'#EDEDED'}
              color={'#8E8E8E'}
              whiteSpace='pre'
              p={2}
              style={r.id === state.selectedTabInternal ?
                { background: colors.PRIMARY, color: 'white', fontWeight: 'bold' }
                : {}}
              onClick={() => (onChangeSelectedTabInternal(r.id))}
            >
              {r.name}
            </Box>
          ))}
        </Flex>
      </Box>
      {state.selectedTabInternal === 1 &&
        <GeneralCondition />
      }
      {state.selectedTabInternal === 2 &&
        <VisionSystem />
      }
      {state.selectedTabInternal === 3 &&

        <RespiratorySystem />
      }
      {state.selectedTabInternal === 4 &&
        <HeartCirculation />
      }
      {state.selectedTabInternal === 5 &&
        <DigestiveSystem />
      }
      {state.selectedTabInternal === 6 &&
        <GenitalUroSystem />
      }
      {state.selectedTabInternal === 7 &&
        <Integumentary />
      }
      {state.selectedTabInternal === 8 &&
        <ChestAndAxilla />
      }

    </>
  )
}

export default MenuInspection