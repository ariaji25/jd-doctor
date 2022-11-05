import { Box, Flex, Stack, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react"
import InputUnderlined from "components/input/InputUnderlined";
import ButtonMain from "components/button/ButtonMain";
import { FiPlusCircle, FiTrash } from "react-icons/fi";
import EmptyComponent from "components/EmptyComponent";
import { useEffect, useState } from "react";
import stateInputMR from "states/stateInputMedicalRecord";
import { useSnapshot } from "valtio";
import apiDoctor from "services/apiDoctor";
import { s4 } from "utils";
import apiMedicalrecord from "services/apiMedicalRecord";
import { actionElements, siteMode } from "utils/constant";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete";
import colors from "values/colors";

const ActionComponent = ({ mode }) => {

  const [actionSearch, setactionSearch] = useState([])

  const { action } = useSnapshot(stateInputMR)

  const [selectedaction, setSelectedaction] = useState({})

  const [actionList, setactionList] = useState([])

  const getactionSearch = (search) => {
    console.log(search)
    if (search && search.length >= 2) apiDoctor.searchICD9CODE(search).then(d => {
      if (d[3] && d[3].length > 0) {
        const list = d[3].map(e => {
          return { code: e[0], desc: e[1] }
        })
        setactionSearch(c => [...list])
      }
    })
  }

  const onItemSelected = (e) => {
    setSelectedaction({ ...selectedaction, actionCode: e })
  }

  const onactionNoteChange = (e) => {
    setSelectedaction({ ...selectedaction, actionNote: e.target.value })
  }

  const onButtonAddClicked = () => {
    // Add id needed to remove the item
    if (!actionList || (actionList && actionList.length < actionElements.length)) {
      setSelectedaction({ ...selectedaction, id: s4(), saved: false })
      setactionList(current => [...actionList, selectedaction])
      stateInputMR.action = [...stateInputMR.action, selectedaction]
    }
  }

  const onDeleteaction = (id, isSaved) => {
    setactionList(current => current.filter(c => c.id !== id))
    stateInputMR.action = stateInputMR.action.filter(c => c.id !== id)

  }
  useEffect(() => {
    console.log("INIT action 1", action)
    console.log("INIT is ", (action.length))
    if (action && action.length > 0) setactionList(current => [...action])
  }, [])
  return (
    <Stack px={24} py={5} gap={3}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Tindakan</Box>
      {
        mode === siteMode.detail
          ? <></>
          : <Flex alignItems={'end'}>
            <Box flex={1}>Tindakan</Box>
            <Box flex={1}>
              <AutoComplete openOnFocus onChange={onItemSelected}>
                <AutoCompleteInput
                  variant="filled"
                  placeholder="Tindakan"
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
                  onChange={(e) => getactionSearch(e.target.value)}
                  rounded="none"
                  h="35px" />
                <AutoCompleteList>
                  {actionSearch.map((action, cid) => (
                    <AutoCompleteItem
                      key={`option-${cid}`}
                      value={`${action.code}-${action.desc}`}
                      textTransform="capitalize"
                    >
                      {action.code}-{action.desc}
                    </AutoCompleteItem>
                  ))}
                </AutoCompleteList>
              </AutoComplete>
            </Box>
          </Flex>
      }
      {
        mode === siteMode.detail
          ? <></>
          : <Flex alignItems={'end'}>
            <Box flex={1}>Waktu</Box>
            <Box flex={1}>
              <InputUnderlined
                type='text'
                placeholder='Waktu'
                onChange={onactionNoteChange}
              />
            </Box>
          </Flex>
      }
      {
        mode === siteMode.detail
          ? <></>
          : actionList && actionList.length === actionElements.length
            ? <Text>Tindakan yang di masukkan hanya boleh sampai 5 tindakan</Text>
            : <></>
      }
      {
        mode === siteMode.detail
          ? <></>
          : <Flex justifyContent={'end'} pt={2}>
            <ButtonMain onClick={onButtonAddClicked} ><FiPlusCircle /> Tambahkan Tindakan</ButtonMain>
          </Flex>
      }
      <Box paddingTop={'10px'} display={'grid'}>
        <TableContainer height='inherit'>
          <Table colorScheme={'gray'}>
            <Thead color={'#484964'}>
              <Tr bg={'#F9F9FC'} fontWeight={'bold'}>
                <Td>Tindakan</Td>
                <Td>Waktu</Td>
                <Td></Td>
              </Tr>
            </Thead>
            <Tbody w={'100%'}>
              {actionList.length > 0 ? actionList.map((r, i) => (
                <Tr key={i} bg={'#F9F9FC'}>
                  <Td>{r.actionCode}</Td>
                  <Td>{r.actionNote}</Td>
                  {
                    mode === siteMode.detail
                      ? <></>
                      : <Td><FiTrash color="red" onClick={(e) => onDeleteaction(r.id, r.saved)} /></Td>
                  }
                </Tr>
              ))
                :
                <Tr>
                  <Td colSpan={3} border={'none'}>
                    <EmptyComponent
                      caption={<Stack gap={3} textAlign={'center'}>
                        <Text>Belum ada tindakan</Text>
                        <Text fontWeight={'bold'}>Tindakan akan muncul disini<br />setelah “Tambahkan tindakan”</Text>
                      </Stack>}
                    />
                  </Td>
                </Tr>
              }
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  )
}

export default ActionComponent
