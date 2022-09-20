import { Box, Center, Flex } from "@chakra-ui/react"
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
import { useState, useRef, useCallback, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import stateInputMR from "states/stateInputMedicalRecord";


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
  const scrollable = useRef(null);
  const state = useSnapshot(stateMedicalRecord);
  const [showButtonScroll, setButtonScroll] = useState({
    left: false,
    right: true
  });
  const onChangeSelectedTabInternal = (id) => {
    stateMedicalRecord.selectedTabInternal = id
  }

  const scrollIt = (toRight) => {
    const scrollLength = 100 //Calculate your scroll length however you want.
    scrollable.current.scrollBy({ left: scrollLength * (toRight ? 1 : -1), behavior: "smooth" });
  }
  const onScroll = () => {
    if (scrollable.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollable.current;
      if (scrollLeft === 0) {
        setButtonScroll({ ...showButtonScroll, left: false, right: true });
      } else if ((scrollWidth - clientWidth) === scrollLeft) {
        setButtonScroll({ ...showButtonScroll, left: true, right: false });
      } else {
        setButtonScroll({ ...showButtonScroll, left: true, right: true });
      }
    }
  };
  
  return (
    <>
      <Box px={14} >
        <Flex gap={2}>
          {showButtonScroll.left &&
            <Center cursor={'pointer'} onClick={() => scrollIt(false)} borderRadius={'50%'} border={'1px solid #8E8E8E'} w={'35px'} h={'35px'}><FiChevronLeft fontSize={20} color={colors.PRIMARY} /></Center>
          }
          <Flex flex={1} gap={2} overflowX={'scroll'} className={'hide-scrollbar'} ref={scrollable} onScroll={() => onScroll()}>
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
          {showButtonScroll.right &&
            <Center cursor={'pointer'} onClick={() => scrollIt(true)} borderRadius={'50%'} border={'1px solid #8E8E8E'} w={'35px'} h={'35px'}><FiChevronRight fontSize={20} color={colors.PRIMARY} /></Center>
          }
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