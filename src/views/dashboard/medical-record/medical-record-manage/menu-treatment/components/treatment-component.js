import { Box, Flex, Stack, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react"
import InputUnderlined from "components/input/InputUnderlined";
import ButtonMain from "components/button/ButtonMain";
import { FiPlusCircle, FiTrash } from "react-icons/fi";
import EmptyComponent from "components/EmptyComponent";
import { useEffect, useState } from "react";
import { s4 } from "utils";
import stateInputMR from "states/stateInputMedicalRecord";
import { siteMode } from "utils/constant";
import { useSnapshot } from "valtio";
import apiMedicalrecord from "services/apiMedicalRecord";

const TreatmentComponent = ({ mode }) => {

  const [treatment, setTreatment] = useState({})

  const StateInputMR = useSnapshot(stateInputMR)

  const [treatmentList, setTreatmentList] = useState([])

  const onChangeTreatment = (e) => {
    setTreatment({ ...treatment, treatment: e.target.value })
  }

  const onChangeTreatmentDosis = (e) => {
    setTreatment({ ...treatment, treatmentDosis: e.target.value })
  }

  const onButtonAddClicked = () => {
    // Add id needed to remove the item
    setTreatment({ ...treatment, id: s4(), saved: false })
    setTreatmentList(current => [...treatmentList, treatment])
    stateInputMR.treatment = [...stateInputMR.treatment, treatment]
  }

  const onDeleteTreatment = (id, isSaved) => {
    if (isSaved) {
      console.log("DELETE", id)
      apiMedicalrecord.deleteMedicalRecord(id).then(r => {
        setTreatmentList(current => current.filter(c => c.id !== id))
        stateInputMR.treatment = stateInputMR.treatment.filter(c => c.id !== id)
      })
    } else {
      setTreatmentList(current => current.filter(c => c.id !== id))
      stateInputMR.treatment = stateInputMR.treatment.filter(c => c.id !== id)
    }
  }

  useEffect(() => {
    if (StateInputMR.treatment && StateInputMR.treatment.length > 0) {
      setTreatmentList(current => [...StateInputMR.treatment])
    }

  }, [])

  return (
    <Stack px={24} py={5} gap={3}>
      <Box fontSize={'24px'} fontWeight={'bold'} color={'#505050'} pb={'12px'}>Pengobatan</Box>
      {
        mode === siteMode.detail
          ? <></>
          : <>
            <Flex alignItems={'end'}>
              <Box flex={1}>Nama obat</Box>
              <Box flex={1}>
                <InputUnderlined
                  onChange={onChangeTreatment}
                  type='text'
                  placeholder='Obat yang diberikan'
                />
              </Box>
            </Flex>
            <Flex alignItems={'end'}>
              <Box flex={1}>Pemberian (Dosis)</Box>
              <Box flex={1}>
                <InputUnderlined
                  type='text'
                  placeholder='Pemberina, cth : (3 x 1 )'
                  onChange={onChangeTreatmentDosis}
                />
              </Box>
            </Flex>
            <Flex justifyContent={'end'} pt={2}>
              <ButtonMain onClick={onButtonAddClicked}><FiPlusCircle /> Tambahkan obat</ButtonMain>
            </Flex>
          </>
      }
      <Box paddingTop={'10px'} display={'grid'}>
        <TableContainer height='inherit'>
          <Table colorScheme={'gray'}>
            <Thead color={'#484964'}>
              <Tr bg={'#F9F9FC'} fontWeight={'bold'}>
                <Td>Nama obat</Td>
                <Td>Pemberian</Td>
                <Td></Td>
              </Tr>
            </Thead>
            <Tbody w={'100%'}>
              {treatmentList.length > 0 ? treatmentList.map((r, i) => (
                <Tr key={i} bg={'#F9F9FC'}>
                  <Td>{r.treatment}</Td>
                  <Td>{r.treatmentDosis}</Td>
                  {mode === siteMode.detail
                    ? <></>
                    : <Td><FiTrash onClick={(e) => onDeleteTreatment(r.id, r.saved)} color="red" /></Td>
                  }
                </Tr>
              ))
                :
                <Tr>
                  <Td colSpan={3} border={'none'}>
                    <EmptyComponent
                      caption={<Stack gap={3} textAlign={'center'}>
                        <Text>Belum ada obat</Text>
                        <Text fontWeight={'bold'}>Obat akan muncul disini<br />setelah “Tambahkan obat”</Text>
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

export default TreatmentComponent
