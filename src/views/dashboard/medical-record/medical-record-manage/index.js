import { Box, Center, CircularProgress, Divider, Flex, Modal, ModalBody, ModalContent, ModalOverlay, Text, useDisclosure, } from "@chakra-ui/react"
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
import { getAge, useQueryParams } from "utils";
import apiBooking from "services/apiBooking";
import { useCallback, useEffect, useState } from "react";
import { keySelectedService, medicalRecordID, medicalRecordProgram, siteMode } from "utils/constant";
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
  const { mrMethod, serviceId } = useParams()

  const state = useSnapshot(stateMedicalRecord);

  const [isLoading, setIsLoading] = useState(false)

  const { patient, serviceDetail } = useSnapshot(stateInputMR)
  const StateInputMR = useSnapshot(stateInputMR)

  const [mrEnrollments, setMREnrollments] = useState([])

  const [_savedgeneralAssesment, setGeneralAssesment] = useState(null)
  const [_savedDiagnosis, setDiagnosis] = useState([])
  const [_savedTreatment, setTreatment] = useState([])
  const [_savedAction, setAction] = useState([])

  const initGeneralAssesmentFromSaved = (savedAssesment) => {
    generalAssesment.forEach(ga => {
      ga.forEach(element => {
        const elementdata = savedAssesment.dataValues.filter(e => e.dataElement === element.key)
        if (elementdata && elementdata.length > 0) {
          stateInputMR.generalAssesment.generalCondition[element.state] = elementdata[0].value === "true"
            || elementdata[0].value === "false" ? (elementdata[0].value === "true" ? "Ya" : "Tidak") : elementdata[0].value
        }
      })
    })
    visionSystem.forEach(element => {
      const elementdata = savedAssesment.dataValues.filter(e => e.dataElement === element.key)
      if (elementdata && elementdata.length > 0) {
        stateInputMR.generalAssesment.visualSystem[element.state] = elementdata[0].value === "true"
          || elementdata[0].value === "false" ? (elementdata[0].value === "true" ? "Ya" : "Tidak") : elementdata[0].value
      }
    })
    respirationSystem.forEach(element => {
      const elementdata = savedAssesment.dataValues.filter(e => e.dataElement === element.key)
      if (elementdata && elementdata.length > 0) {
        stateInputMR.generalAssesment.respirationSystem[element.state] = elementdata[0].value === "true"
          || elementdata[0].value === "false" ? (elementdata[0].value === "true" ? "Ya" : "Tidak") : elementdata[0].value
      }
    })
    hearthCirculation.forEach(element => {
      const elementdata = savedAssesment.dataValues.filter(e => e.dataElement === element.key)
      if (elementdata && elementdata.length > 0) {
        stateInputMR.generalAssesment.hearthCirculation[element.state] = elementdata[0].value === "true"
          || elementdata[0].value === "false" ? (elementdata[0].value === "true" ? "Ya" : "Tidak") : elementdata[0].value
      }
    })
    digestionSystem.forEach(element => {
      const elementdata = savedAssesment.dataValues.filter(e => e.dataElement === element.key)
      if (elementdata && elementdata.length > 0) {
        stateInputMR.generalAssesment.digestionSystem[element.state] = elementdata[0].value === "true"
          || elementdata[0].value === "false" ? (elementdata[0].value === "true" ? "Ya" : "Tidak") : elementdata[0].value
      }
    })
    uroGenitalSystem.forEach(element => {
      const elementdata = savedAssesment.dataValues.filter(e => e.dataElement === element.key)
      if (elementdata && elementdata.length > 0) {
        if (element.state === "patternRoutine") {
          var _elementsData = elementdata[0].value.split(" ")
          if (_elementsData && _elementsData.length > 1) {
            stateInputMR.generalAssesment.uroGenitalSystem[`${element.state}`] = _elementsData[0]
            stateInputMR.generalAssesment.uroGenitalSystem[`${element.state}1`] = _elementsData[1]
          } else {
            stateInputMR.generalAssesment.uroGenitalSystem[`${element.state}`] = elementdata[0].value
          }
        } else
          stateInputMR.generalAssesment.uroGenitalSystem[element.state] = elementdata[0].value === "true"
            || elementdata[0].value === "false" ? (elementdata[0].value === "true" ? "Ya" : "Tidak") : elementdata[0].value
      }
    })
    intugmenSystem.forEach(element => {
      const elementdata = savedAssesment.dataValues.filter(e => e.dataElement === element.key)
      if (elementdata && elementdata.length > 0) {
        stateInputMR.generalAssesment.intugmenSystem[element.state] = elementdata[0].value === "true"
          || elementdata[0].value === "false" ? (elementdata[0].value === "true" ? "Ya" : "Tidak") : elementdata[0].value
      }
    })
    chestAndAxila.forEach(element => {
      const elementdata = savedAssesment.dataValues.filter(e => e.dataElement === element.key)
      if (elementdata && elementdata.length > 0) {
        stateInputMR.generalAssesment.chestAndAxila[element.state] = elementdata[0].value === "true"
          || elementdata[0].value === "false" ? (elementdata[0].value === "true" ? "Ya" : "Tidak") : elementdata[0].value
      }
    })
    console.log("Assesment", stateInputMR.generalAssesment.generalCondition)
  }
  const initDiagnosisFromSaved = (savedDiagnosis) => {
    var _diagnosis = savedDiagnosis.map(d => {
      return {
        id: d.event,
        saved: true,
        diagnosisCode: d.dataValues.filter(e => e.dataElement === medicalRecordID.codingDiagnosis)
          && d.dataValues.filter(e => e.dataElement === medicalRecordID.codingDiagnosis).length > 0
          ? d.dataValues.filter(e => e.dataElement === medicalRecordID.codingDiagnosis)[0].value : '',
        diagnosisNote: d.dataValues.filter(e => e.dataElement === medicalRecordID.keteranganDiagnosis)
          && d.dataValues.filter(e => e.dataElement === medicalRecordID.keteranganDiagnosis).length > 0
          ? d.dataValues.filter(e => e.dataElement === medicalRecordID.keteranganDiagnosis)[0].value : '-'
      }
    })
    stateInputMR.diagnosis = [..._diagnosis]
  }

  const initActionFromSaved = (savedAction) => {
    var _action = savedAction.map(d => {
      return {
        id: d.event,
        saved: true,
        actionCode: d.dataValues.filter(e => e.dataElement === medicalRecordID.tindakan)
          && d.dataValues.filter(e => e.dataElement === medicalRecordID.tindakan).length > 0
          ? d.dataValues.filter(e => e.dataElement === medicalRecordID.tindakan)[0].value : '',
        actionNote: d.dataValues.filter(e => e.dataElement === medicalRecordID.waktuTindakan)
          && d.dataValues.filter(e => e.dataElement === medicalRecordID.waktuTindakan).length > 0
          ? d.dataValues.filter(e => e.dataElement === medicalRecordID.waktuTindakan)[0].value : '-'
      }
    })
    console.log("TINDAKAN+++", _action)
    stateInputMR.action = [..._action]
  }

  const initTreatmentFromSaved = (savedTreatment) => {
    var _treatment = savedTreatment.map(d => {
      return {
        id: d.event,
        saved: true,
        treatment: d.dataValues.filter(e => e.dataElement === medicalRecordID.namaObat)
          && d.dataValues.filter(e => e.dataElement === medicalRecordID.namaObat).length > 0
          ? d.dataValues.filter(e => e.dataElement === medicalRecordID.namaObat)[0].value : '',
        treatmentDosis: d.dataValues.filter(e => e.dataElement === medicalRecordID.dosis)
          && d.dataValues.filter(e => e.dataElement === medicalRecordID.dosis).length > 0
          ? d.dataValues.filter(e => e.dataElement === medicalRecordID.dosis)[0].value : ''
      }
    })
    stateInputMR.treatment = [..._treatment]
  }

  const getMedicalRecordData = async () => {
    setIsLoading(true)
    const enroll = await apiMedicalrecord.getPatientMedicalRecordEnrollment(patient.id)
    if (enroll.enrollments && enroll.enrollments.length > 0) {
      setMREnrollments(enroll.enrollments)
    }
    const _generalAssesment = await apiMedicalrecord.getMedicalRecord(serviceId ?? StateInputMR.serviceDetail.serviceID, medicalRecordProgram.pemeriksaanFisik)
    if (_generalAssesment.events && _generalAssesment.events.length > 0) {
      setGeneralAssesment(_generalAssesment.events[0])
      initGeneralAssesmentFromSaved(_generalAssesment.events[0])
    }
    const _diagnosis = await apiMedicalrecord.getMedicalRecord(serviceId ?? StateInputMR.serviceDetail.serviceID, medicalRecordProgram.diagnosis)
    if (_diagnosis.events && _diagnosis.events.length > 0) {
      setDiagnosis([..._diagnosis.events])
      initDiagnosisFromSaved(_diagnosis.events)
    }
    const _treatments = await apiMedicalrecord.getMedicalRecord(serviceId ?? StateInputMR.serviceDetail.serviceID, medicalRecordProgram.obat)
    if (_treatments.events && _treatments.events.length > 0) {
      setTreatment([..._treatments.events])
      initTreatmentFromSaved(_treatments.events)
    }
    const _action = await apiMedicalrecord.getMedicalRecord(serviceId ?? StateInputMR.serviceDetail.serviceID, medicalRecordProgram.tindakan)
    if (_action.events && _action.events.length > 0) {
      setAction([..._action.events])
      initActionFromSaved(_action.events)
    }
    setIsLoading(false)
    return true
  }

  const init = useCallback(() => {
    getMedicalRecordData()
  }, [])

  useEffect(() => {
    init()
  }, [init])



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
          value: serviceId ?? stateInputMR.serviceDetail.serviceID
        })
        console.log("data values", dataValues)
        if (_savedgeneralAssesment && _savedgeneralAssesment.event) {
          var _event = _savedgeneralAssesment;
          _event.dataValues = dataValues
          if (dataValues.length > 0) apiMedicalrecord.updateMedicalRecord(_event).then(r => {
            getMedicalRecordData().then(r => {
              onOpen()
            })
          })
        }
        else apiMedicalrecord.createNewMedicalRecord(
          medicalRecordProgram.pemeriksaanFisik,
          medicalRecordProgram.pemeriksaanFisikStage,
          _enrollmentID[0].enrollment,
          dataValues,
          serviceId ?? stateInputMR.serviceDetail.serviceID,
          stateInputMR.patient.id
        ).then(r => {
          getMedicalRecordData().then(r => {
            onOpen()
          })
        })
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
              value: serviceId ?? stateInputMR.serviceDetail.serviceID
            })
            if (!e.saved) apiMedicalrecord.createNewMedicalRecord(
              medicalRecordProgram.diagnosis,
              medicalRecordProgram.diagnosisStage,
              _enrollmentID[0].enrollment,
              dataValues,
              serviceId ?? stateInputMR.serviceDetail.serviceID,
              stateInputMR.patient.id
            ).then(r => {
              counterSuccess++
              if (counterSuccess === stateInputMR.diagnosis.length) {
                apiMedicalrecord.addMedicalRecordReference(serviceId ?? stateInputMR.serviceDetail.serviceID, `${stateInputMR.diagnosis[0].diagnosisCode}-${stateInputMR.diagnosis[0].diagnosisNote}`, medicalRecordID.referensiDiagnosis)
                  .then(e => {
                    onOpen()
                  })
              }
            })
            else counterSuccess++
          })
        }
        break
      }
      case 3:{
        const _enrollmentID = mrEnrollments.filter(e => e.program === medicalRecordProgram.tindakan)
        if (stateInputMR.action && stateInputMR.action.length > 0) {
          var counterSuccess = 0
          stateInputMR.action.forEach(e => {
            console.log(e.actionCode, e.actionNote)
            const dataValues = []
            dataValues.push({
              dataElement: medicalRecordID.tindakan,
              value: e.actionCode
            })
            if (e.actionNote && e.actionNote.length > 0) dataValues.push({
              dataElement: medicalRecordID.waktuTindakan,
              value: e.actionNote
            })
            dataValues.push({
              dataElement: medicalRecordID.referensiPelayanan,
              value: serviceId ?? stateInputMR.serviceDetail.serviceID
            })
            if (!e.saved) apiMedicalrecord.createNewMedicalRecord(
              medicalRecordProgram.tindakan,
              medicalRecordProgram.tindakanStage,
              _enrollmentID[0].enrollment,
              dataValues,
              serviceId ?? stateInputMR.serviceDetail.serviceID,
              stateInputMR.patient.id
            ).then(r => {
              counterSuccess++
              if (counterSuccess === stateInputMR.action.length) {
                apiMedicalrecord.addMedicalRecordReference(serviceId ?? stateInputMR.serviceDetail.serviceID, `${stateInputMR.action[0].actionCode}-${stateInputMR.action[0].actionNote}`, medicalRecordID.refernsiTindakan)
                  .then(e => {
                    onOpen()
                  })
              }
            })
            else counterSuccess++
          })
        }
        break
      }
      // Treatment
      case 4: {
        const _enrollmentID = mrEnrollments.filter(e => e.program === medicalRecordProgram.obat)
        var counterSuccess = 0
        if (stateInputMR.treatment && stateInputMR.treatment.length > 0) {
          stateInputMR.treatment.forEach(e => {
            console.log(e.treatment, e.treatmentDosis)
            const dataValues = []
            dataValues.push({
              dataElement: medicalRecordID.namaObat,
              value: e.treatment
            })
            if (e.treatmentDosis && e.treatmentDosis.length > 0) dataValues.push({
              dataElement: medicalRecordID.dosis,
              value: e.treatmentDosis
            })
            dataValues.push({
              dataElement: medicalRecordID.referensiPelayanan,
              value: serviceId ?? stateInputMR.serviceDetail.serviceID
            })
            if (!e.saved) apiMedicalrecord.createNewMedicalRecord(
              medicalRecordProgram.obat,
              medicalRecordProgram.obatStage,
              _enrollmentID[0].enrollment,
              dataValues,
              serviceId ?? stateInputMR.serviceDetail.serviceID,
              stateInputMR.patient.id
            ).then(r => {
              counterSuccess++
              if (counterSuccess === stateInputMR.treatment.length) {
                apiMedicalrecord.addMedicalRecordReference(serviceId ?? stateInputMR.serviceDetail.serviceID, `${stateInputMR.treatment[0].treatment}`, medicalRecordID.refernsiPengobatan).then(e => {
                  onOpen()
                })
              }
            })
            else counterSuccess++
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
                  <Box fontWeight={'bold'}>{`${patient.dob}`.replaceAll("-", "/")} - {getAge(patient.dob)} thn</Box>
                </Box>
                <Box flex={3}>
                  <Box color={'#505050'} fontSize={'13px'}>Keluhan yang dirasakan</Box>
                  <Box fontWeight={'bold'}>{stateInputMR.problemForServiceDetail ?? serviceDetail.problem}</Box>
                </Box>
              </Flex>
            </Flex>
            <Box px={14} pt={10} pb={5} >
              <Box ><Divider border={'1px solid #C0C0C0'} /></Box>
            </Box>
            {state.selectedTab === 1
              ? !isLoading
                ? <MenuInspection mode={mrMethod} />
                : <Center><CircularProgress isIndeterminate size='100px' thickness='4px' /></Center>
              : <></>
            }
            {state.selectedTab === 2
              ? !isLoading
                ? <MenuDiagnose mode={mrMethod} />
                : <Center><CircularProgress isIndeterminate size='100px' thickness='4px' /></Center>
              : <></>
            }
            {state.selectedTab === 3 && !isLoading &&
              <MenuAction mode={mrMethod} />
            }
            {state.selectedTab === 4
              ? !isLoading
                ? <MenuTreatment mode={mrMethod} />
                : <Center><CircularProgress isIndeterminate size='100px' thickness='4px' /></Center>
              : <></>
            }
          </Flex>
          {
            mrMethod === siteMode.detail
              ? <></>
              : <Box px={40} py={5} textAlign={'center'}>
                <ButtonMain width={'100%'} maxW={'700px'} onClick={(e) => {
                  onClickButtonSave()
                }}>Simpan</ButtonMain>
              </Box>
          }
        </Box>
      </Flex>
      <NotificationStatus isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default MedicalRecordManagePage