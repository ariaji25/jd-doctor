import { Box, Divider, Flex, Modal, ModalBody, ModalContent, ModalOverlay, Text, useDisclosure, } from "@chakra-ui/react"
import colors from "values/colors"
import { useSnapshot } from 'valtio';
import stateMedicalRecord from "states/stateMedicalRecord";
import ButtonMain from "components/button/ButtonMain";
import MenuInspection from "./menu-inspection";
import MenuDiagnose from "./menu-diagnose";
import MenuAction from "./menu-action";
import MenuTreatment from "./menu-treatment";
import MedicalNavigation from "./components/MedicalNavigation";
import MedicalHeader from "./components/MedicalHeader";
import { FiClipboard } from "react-icons/fi";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useQueryParams } from "utils";
import apiBooking from "services/apiBooking";
import { useCallback, useEffect, useState } from "react";
import { keySelectedService, medicalRecordID, medicalRecordProgram } from "utils/constant";
import { apiPatient } from "services/apiPatient";
import stateInputMR from "states/stateInputMedicalRecord";
import apiMedicalrecord from "services/apiMedicalRecord";
import { inputList as generalAssesment } from "./menu-inspection/components/general-condition";
import { inputList as visionSystem } from "./menu-inspection/components/vision-system";
import { inputList as respirationSystem } from "./menu-inspection/components/respiratory-system";
import { inputList as hearthCirculation } from "./menu-inspection/components/heart-circulation";
import { inputList as digestionSystem } from "./menu-inspection/components/digestive-system";
import { inputList as uroGenitalSystem } from "./menu-inspection/components/genital-uro-system";
import { inputList as intugmenSystem } from "./menu-inspection/components/integumentary-musculoskeletal-system";
import { inputList as chestAndAxila } from "./menu-inspection/components/chest-and-axilla";

const NotificationStatus = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl' isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Box color={colors.PRIMARY} textAlign={'center'} py={20}>
            <Flex justifyContent={'center'}>
              <FiClipboard fontSize={60} />
            </Flex>
            <Text fontSize={40} fontWeight={'bold'}>BERHASIL</Text>
            <Text color={'#8E8E8E'}>Data rekam medis berhasil disimpan</Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const MedicalRecordManagePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const state = useSnapshot(stateMedicalRecord);

  const { patient, serviceDetail } = useSnapshot(stateInputMR)
  const StateInputMR = useSnapshot(stateInputMR)

  const [mrEnrollments, setMREnrollments] = useState([])

  const getMedicalRecordEnrollments = useCallback(() => {
    apiMedicalrecord.getPatientMedicalRecordEnrollment(patient.id)
      .then(response => {
        console.log("Enrollment", response)
        setMREnrollments(response.enrollments)
      })
  }, [])

  useEffect(() => {
    if (mrEnrollments.length <= 0) getMedicalRecordEnrollments()
  }, [mrEnrollments, getMedicalRecordEnrollments])



  const onClickButtonSave = () => {
    switch (state.selectedTab) {
      // Pemeriksaan fisik
      case 1: {
        // On Save General Assesment
        const _enrollmentID = mrEnrollments.filter(e => e.program === medicalRecordProgram.pemeriksaanFisik)
        var dataValues = []
        generalAssesment.forEach(ga => {
          ga.forEach(element => {
            const _value = stateInputMR.generalAssesment.generalCondition[element.state]
            dataValues = dataValues.filter(e => e.dataElement !== element.key)
            if (_value && _value.length > 0) dataValues.push({
              dataElement: element.key,
              value: _value
            })
          })
        })
        visionSystem.forEach(element => {
          const _value = stateInputMR.generalAssesment.visualSystem[element.state]
          dataValues = dataValues.filter(e => e.dataElement !== element.key)
          if (_value && _value.length > 0) dataValues.push({
            dataElement: element.key,
            value: _value === "Ya" || _value === "Tidak" ? `${_value === "Ya"}` : _value
          })
        })
        respirationSystem.forEach(element => {
          const _value = stateInputMR.generalAssesment.respirationSystem[element.state]
          dataValues = dataValues.filter(e => e.dataElement !== element.key)
          if (_value && _value.length > 0) dataValues.push({
            dataElement: element.key,
            value: _value === "Ya" || _value === "Tidak" ? `${_value === "Ya"}` : _value

          })
        })
        hearthCirculation.forEach(element => {
          const _value = stateInputMR.generalAssesment.hearthCirculation[element.state]
          dataValues = dataValues.filter(e => e.dataElement !== element.key)
          if (_value && _value.length > 0) dataValues.push({
            dataElement: element.key,
            value: _value === "Ya" || _value === "Tidak" ? `${_value === "Ya"}` : _value
          })
        })
        digestionSystem.forEach(element => {
          const _value = stateInputMR.generalAssesment.digestionSystem[element.state]
          dataValues = dataValues.filter(e => e.dataElement !== element.key)
          if (_value && _value.length > 0) dataValues.push({
            dataElement: element.key,
            value: _value === "Ya" || _value === "Tidak" ? `${_value === "Ya"}` : _value

          })
        })
        uroGenitalSystem.forEach(element => {
          const _value = stateInputMR.generalAssesment.uroGenitalSystem[element.state]
          if (element.key.includes("-1") && _value && _value.length > 0) {
            const data = dataValues.filter(e => e.dataElement === element.key.replace("-1", ""))
            dataValues = dataValues.filter(e => e.dataElement !== element.key.replace("-1", ""))
            if (_value && _value.length > 0) dataValues.push({
              dataElement: element.key.replace("-1", ""),
              value: `${data[0].value} ${_value}`,
            })
          } else {
            dataValues = dataValues.filter(e => e.dataElement !== element.key)
            if (_value && _value.length > 0) dataValues.push({
              dataElement: element.key,
              value: _value === "Ya" || _value === "Tidak" ? `${_value === "Ya"}` : _value
            })
          }
        })
        intugmenSystem.forEach(element => {
          const _value = stateInputMR.generalAssesment.intugmenSystem[element.state]
          dataValues = dataValues.filter(e => e.dataElement !== element.key)
          if (_value && _value.length > 0) dataValues.push({
            dataElement: element.key,
            value: _value === "Ya" || _value === "Tidak" ? `${_value === "Ya"}` : _value
          })
        })
        chestAndAxila.forEach(element => {
          const _value = stateInputMR.generalAssesment.chestAndAxila[element.state]
          dataValues = dataValues.filter(e => e.dataElement !== element.key)
          if (_value && _value.length > 0) dataValues.push({
            dataElement: element.key,
            value: _value === "Ya" || _value === "Tidak" ? `${_value === "Ya"}` : _value
          })
        })
        dataValues.push({
          dataElement: medicalRecordID.referensiPelayanan,
          value: stateInputMR.serviceDetail.serviceID
        })
        console.log("data values", dataValues)
        apiMedicalrecord.createNewMedicalRecord(
          medicalRecordProgram.pemeriksaanFisik,
          medicalRecordProgram.pemeriksaanFisikStage,
          _enrollmentID[0].enrollment,
          dataValues,
          stateInputMR.serviceDetail.serviceID,
          stateInputMR.patient.id
        ).then(r => onOpen())
        break
      }
      // Diagnosis
      case 2: {
        const _enrollmentID = mrEnrollments.filter(e => e.program === medicalRecordProgram.diagnosis)
        if (stateInputMR.diagnosis && stateInputMR.diagnosis.length > 0) {
          var counterSuccess = 0
          stateInputMR.diagnosis.forEach(e => {
            console.log(e.diagnosisCode, e.diagnosisNote)
            const dataValues = []
            dataValues.push({
              dataElement: medicalRecordID.codingDiagnosis,
              value: e.diagnosisCode
            })
            if (e.diagnosisNote && e.diagnosisNote.length > 0) dataValues.push({
              dataElement: medicalRecordID.keteranganDiagnosis,
              value: e.diagnosisNote
            })
            dataValues.push({
              dataElement: medicalRecordID.referensiPelayanan,
              value: stateInputMR.serviceDetail.serviceID
            })
            apiMedicalrecord.createNewMedicalRecord(
              medicalRecordProgram.diagnosis,
              medicalRecordProgram.diagnosisStage,
              _enrollmentID[0].enrollment,
              dataValues,
              stateInputMR.serviceDetail.serviceID,
              stateInputMR.patient.id
            ).then(r => {
              counterSuccess++
              if (counterSuccess === stateInputMR.diagnosis.length) {
                apiMedicalrecord.addMedicalRecordReference(stateInputMR.serviceDetail.serviceID, `${stateInputMR.diagnosis[0].diagnosisCode}-${stateInputMR.diagnosis[0].diagnosisNote}`, medicalRecordID.referensiDiagnosis).then(e => onOpen())
              }
            })
          })

        }
        break
      }
      default: {
        break
      }
    }
  }



  return (
    <>
      <Flex minH={'100vh'}>
        <MedicalNavigation />
        <Box minW={0} flex={'auto'}>
          <MedicalHeader />
          <Flex flexDir={'column'} flex={4} justifyContent={'center'}>
            <Flex px={14} >
              <Flex flex={1} justifyContent={'space-between'} gap={4} color={colors.PRIMARY} lineHeight={'26px'}>
                <Box flex={1}>
                  <Box color={'#505050'} fontSize={'13px'}>Nama lengkap pasien</Box>
                  <Box fontWeight={'bold'}>{patient.name}</Box>
                </Box>
                <Box flex={1}>
                  <Box color={'#505050'} fontSize={'13px'}>Tanggal lahir</Box>
                  <Box fontWeight={'bold'}>{`${patient.dob}`.replaceAll("-", "/")} - 23 thn</Box>
                </Box>
                <Box flex={3}>
                  <Box color={'#505050'} fontSize={'13px'}>Keluhan yang dirasakan</Box>
                  <Box fontWeight={'bold'}>{serviceDetail.problem}</Box>
                </Box>
              </Flex>
            </Flex>
            <Box px={14} pt={10} pb={5} >
              <Box ><Divider border={'1px solid #C0C0C0'} /></Box>
            </Box>
            {state.selectedTab === 1 &&
              <MenuInspection />
            }
            {state.selectedTab === 2 &&
              <MenuDiagnose />
            }
            {state.selectedTab === 3 &&
              <MenuAction />
            }
            {state.selectedTab === 4 &&
              <MenuTreatment />
            }
          </Flex>
          <Box px={40} py={5} textAlign={'center'}>
            <ButtonMain width={'100%'} maxW={'700px'} onClick={(e) => {
              onClickButtonSave()

            }}>Simpan</ButtonMain>
          </Box>
        </Box>
      </Flex>
      <NotificationStatus isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default MedicalRecordManagePage