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
import { FiCheckCircle, FiClipboard } from "react-icons/fi";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { getAge, useQueryParams } from "utils";
import apiBooking from "services/apiBooking";
import { useCallback, useEffect, useState } from "react";
import { actionElements, diagnosesElements, keySelectedService, medicalRecordID, medicalRecordProgram, siteMode, treatmentElements } from "utils/constant";
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

const NotificationStatus = ({ isOpen, onClose, state }) => {
  const message = () => {
    switch (state) {
      case 1:
        return ["Pemeriksaan Fisik", "Diagnosis"]
      case 2:
        return ["Diagnosis", "Tindakan"]
      case 3:
        return ["Tindakan", "Pengobatan"]
      case 4:
        return ["Pengobatan", ""]
      default:
        return ["", ""]
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl' isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Box color={colors.PRIMARY} textAlign={'center'} py={20}>
            <Flex justifyContent={'center'}>
              <FiCheckCircle color="green" fontSize={60} />
            </Flex>
            <Text fontSize={40} fontWeight={'bold'}>Tersimpan</Text>
            <Text color={'#8E8E8E'}>{message()[0]} berhasil disimpan</Text>
            <Text color={'#8E8E8E'}>{state === 4 ? "silahkan kembali ke Beranda" : "silahkan lanjut ke " + message()[1]}</Text>
            <Box h={"20px"} />
            <ButtonMain w={"100px"} onClick={e => onClose()}>
              <Text>OK</Text>
            </ButtonMain>
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

  const [savedMedicalRecordStatus, setSavedMedicalRecordStatus] = useState({
    savedgeneralAssesment: false,
    savedDiagnoses: false,
    savedActions: false,
    savedTreatment: false,
  })

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
    if (savedDiagnosis.dataValues && savedDiagnosis.dataValues.length > 0) {
      let _diagnoses = []
      diagnosesElements.forEach(dE => {
        let _d = savedDiagnosis.dataValues.find(e => e.dataElement === dE.diagnoses)
        let _dNotes = savedDiagnosis.dataValues.find(e => e.dataElement === dE.diagnosesNotes)
        if (_d && _d.value) {
          _diagnoses.push({
            id: dE.diagnoses,
            eventId: savedDiagnosis.event,
            saved: true,
            diagnosisCode: _d.value,
            diagnosisNote: _dNotes && _dNotes.value ? _dNotes.value : "-"
          })
        }
      })
      stateInputMR.diagnosis = [..._diagnoses]
    }
  }

  const initActionFromSaved = (savedAction) => {
    if (savedAction.dataValues && savedAction.dataValues.length > 0) {
      let _actions = []
      actionElements.forEach(aE => {
        let _a = savedAction.dataValues.find(e => e.dataElement === aE.action)
        let _aNotes = savedAction.dataValues.find(e => e.dataElement === aE.actionNote)
        if (_a && _a.value) {
          _actions.push({
            id: aE.action,
            eventId: _savedAction.event,
            saved: true,
            actionCode: _a.value,
            actionNote: _aNotes && _aNotes.value ? _aNotes.value : "-"
          })
        }
      })
      stateInputMR.action = [..._actions]
    }
  }

  const initTreatmentFromSaved = (savedTreatment) => {
    if (savedTreatment.dataValues && savedTreatment.dataValues.length > 0) {
      let _treatments = []
      treatmentElements.forEach(tE => {
        let _t = savedTreatment.dataValues.find(e => e.dataElement === tE.treatment)
        let _tNotes = savedTreatment.dataValues.find(e => e.dataElement === tE.treatmentDose)
        if (_t && _t.value) {
          _treatments.push({
            id: tE.treatment,
            eventId: savedTreatment.event,
            saved: true,
            treatment: _t.value,
            treatmentDose: _tNotes && _tNotes.value ? _tNotes.value : "-"
          })
        }
      })
      stateInputMR.treatment = [..._treatments]
    }
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
      setDiagnosis(_diagnosis.events[0])
      initDiagnosisFromSaved(_diagnosis.events[0])
    }
    const _treatments = await apiMedicalrecord.getMedicalRecord(serviceId ?? StateInputMR.serviceDetail.serviceID, medicalRecordProgram.obat)
    if (_treatments.events && _treatments.events.length > 0) {
      setTreatment(_treatments.events[0])
      initTreatmentFromSaved(_treatments.events[0])
    }
    const _action = await apiMedicalrecord.getMedicalRecord(serviceId ?? StateInputMR.serviceDetail.serviceID, medicalRecordProgram.tindakan)
    if (_action.events && _action.events.length > 0) {
      setAction(_action.events[0])
      initActionFromSaved(_action.events[0])
    }
    setSavedMedicalRecordStatus({
      ...savedMedicalRecordStatus,
      savedgeneralAssesment: (_generalAssesment.events && _generalAssesment.events.length > 0),
      savedDiagnoses: (_diagnosis.events && _diagnosis.events.length > 0),
      savedActions: (_action.events && _action.events.length > 0),
      savedTreatment: (_treatments.events && _treatments.events.length > 0)
    })
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
            if (r.response.importSummaries
              && r.response.importSummaries[0]
              && r.response.importSummaries[0].reference) apiMedicalrecord.addMedicalRecordReference(serviceId ?? stateInputMR.serviceDetail.serviceID, `${r.response.importSummaries[0].reference}`, medicalRecordID.referensiPemeriksaanFisik)
                .then(e => {
                  setSavedMedicalRecordStatus({ ...savedMedicalRecordStatus, savedgeneralAssesment: true })
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
          if (r.response.importSummaries
            && r.response.importSummaries[0]
            && r.response.importSummaries[0].reference) apiMedicalrecord.addMedicalRecordReference(serviceId ?? stateInputMR.serviceDetail.serviceID, `${r.response.importSummaries[0].reference}`, medicalRecordID.referensiPemeriksaanFisik)
              .then(e => {
                setSavedMedicalRecordStatus({ ...savedMedicalRecordStatus, savedgeneralAssesment: true })
                onOpen()
              })
        })
        break
      }
      // Diagnosis
      case 2: {
        const _enrollmentID = mrEnrollments.filter(e => e.program === medicalRecordProgram.diagnosis)
        if (stateInputMR.diagnosis && stateInputMR.diagnosis.length > 0) {
          let _dataValues = []
          diagnosesElements.forEach(dE => {
            if (stateInputMR.diagnosis[dE.id]) {
              console.log(dE.id, stateInputMR.diagnosis[dE.id])
              let _dCode = {
                dataElement: dE.diagnoses,
                value: stateInputMR.diagnosis[dE.id].diagnosisCode
              }
              let _dNote = {
                dataElement: dE.diagnoses,
                value: stateInputMR.diagnosis[dE.id].diagnosesNote ?? "-"
              }
              _dataValues.push(_dCode)
              _dataValues.push(_dNote)
            }
          })
          _dataValues.push({
            dataElement: medicalRecordID.referensiPelayanan,
            value: serviceId ?? stateInputMR.serviceDetail.serviceID
          })
          if (_savedDiagnosis && _savedDiagnosis.event) {
            let _event = _savedDiagnosis
            _event.dataValues = _dataValues

            if (_event.dataValues.length > 0) apiMedicalrecord.updateMedicalRecord(_event).then(r => {
              apiMedicalrecord.addMedicalRecordReference(serviceId ?? stateInputMR.serviceDetail.serviceID, `${stateInputMR.diagnosis[0].diagnosisCode}-${stateInputMR.diagnosis[0].diagnosisNote ?? ''}`, medicalRecordID.referensiDiagnosis)
                .then(e => {
                  setSavedMedicalRecordStatus({ ...savedMedicalRecordStatus, savedDiagnoses: true })
                  onOpen()
                })
            })
          }
          else apiMedicalrecord.createNewMedicalRecord(
            medicalRecordProgram.diagnosis,
            medicalRecordProgram.diagnosisStage,
            _enrollmentID[0].enrollment,
            _dataValues,
            serviceId ?? stateInputMR.serviceDetail.serviceID,
            stateInputMR.patient.id
          ).then(r => {
            apiMedicalrecord.addMedicalRecordReference(serviceId ?? stateInputMR.serviceDetail.serviceID, `${stateInputMR.diagnosis[0].diagnosisCode}-${stateInputMR.diagnosis[0].diagnosisNote ?? ''}`, medicalRecordID.referensiDiagnosis)
              .then(e => {
                setSavedMedicalRecordStatus({ ...savedMedicalRecordStatus, savedDiagnoses: true })
                onOpen()
              })
          })
        } else if (_savedDiagnosis && _savedDiagnosis.event && !(stateInputMR.diagnosis && stateInputMR.diagnosis.length > 0)) {
          let _event = _savedDiagnosis
          _event.dataValues = []
          apiMedicalrecord.deleteMedicalRecord(_event.event).then(r => {
            apiMedicalrecord.addMedicalRecordReference(serviceId ?? stateInputMR.serviceDetail.serviceID, ``, medicalRecordID.referensiDiagnosis)
              .then(e => {
                setSavedMedicalRecordStatus({ ...savedMedicalRecordStatus, savedDiagnoses: true })
                onOpen()
              })
          })
        }
        break
      }
      case 3: {
        const _enrollmentID = mrEnrollments.filter(e => e.program === medicalRecordProgram.tindakan)
        if (stateInputMR.action && stateInputMR.action.length > 0) {
          let _dataValues = []
          actionElements.forEach(aE => {
            if (stateInputMR.action[aE.id]) {
              console.log(aE.id, stateInputMR.action[aE.id])
              let _aCode = {
                dataElement: aE.action,
                value: stateInputMR.action[aE.id].actionCode
              }
              let _aNote = {
                dataElement: aE.actionNote,
                value: stateInputMR.action[aE.id].actionNote ?? "-"
              }
              _dataValues.push(_aCode)
              _dataValues.push(_aNote)
            }
          })
          _dataValues.push({
            dataElement: medicalRecordID.referensiPelayanan,
            value: serviceId ?? stateInputMR.serviceDetail.serviceID
          })
          if (_savedAction && _savedAction.event) {
            let _event = _savedAction
            _event.dataValues = _dataValues
            if (_event.dataValues.length > 0) apiMedicalrecord.updateMedicalRecord(_event).then(r => {
              apiMedicalrecord.addMedicalRecordReference(serviceId ?? stateInputMR.serviceDetail.serviceID, `${stateInputMR.action[0].actionCode}-${stateInputMR.action[0].actionNote ?? ''}`, medicalRecordID.refernsiTindakan)
                .then(e => {
                  setSavedMedicalRecordStatus({ ...savedMedicalRecordStatus, savedActions: true })
                  onOpen()
                })
            })
          }
          else apiMedicalrecord.createNewMedicalRecord(
            medicalRecordProgram.tindakan,
            medicalRecordProgram.tindakanStage,
            _enrollmentID[0].enrollment,
            _dataValues,
            serviceId ?? stateInputMR.serviceDetail.serviceID,
            stateInputMR.patient.id
          ).then(r => {
            apiMedicalrecord.addMedicalRecordReference(serviceId ?? stateInputMR.serviceDetail.serviceID, `${stateInputMR.action[0].actionCode}-${stateInputMR.action[0].actionNote ?? ''}`, medicalRecordID.refernsiTindakan)
              .then(e => {
                setSavedMedicalRecordStatus({ ...savedMedicalRecordStatus, savedActions: true })
                onOpen()
              })
          })
        } else if (_savedAction && _savedAction.event && !(stateInputMR.action && stateInputMR.action.length > 0)) {
          let _event = _savedAction
          _event.dataValues = []
          apiMedicalrecord.deleteMedicalRecord(_event.event).then(r => {
            apiMedicalrecord.addMedicalRecordReference(serviceId ?? stateInputMR.serviceDetail.serviceID, ``, medicalRecordID.refernsiTindakan)
              .then(e => {
                setSavedMedicalRecordStatus({ ...savedMedicalRecordStatus, savedActions: true })
                onOpen()
              })
          })
        }

        break
      }
      // Treatment
      case 4: {

        const _enrollmentID = mrEnrollments.filter(e => e.program === medicalRecordProgram.obat)
        if (stateInputMR.treatment && stateInputMR.treatment.length > 0) {
          let _dataValues = []
          treatmentElements.forEach(tE => {
            if (stateInputMR.treatment[tE.id]) {
              console.log(tE.id, stateInputMR.treatment[tE.id])
              let _tCode = {
                dataElement: tE.treatment,
                value: stateInputMR.treatment[tE.id].treatment
              }
              let _tNote = {
                dataElement: tE.treatmentDose,
                value: stateInputMR.treatment[tE.id].treatmentDose ?? "-"
              }
              _dataValues.push(_tCode)
              _dataValues.push(_tNote)
            }
          })
          _dataValues.push({
            dataElement: medicalRecordID.referensiPelayanan,
            value: serviceId ?? stateInputMR.serviceDetail.serviceID
          })
          if (_savedTreatment && _savedTreatment.event) {
            let _event = _savedTreatment
            _event.dataValues = _dataValues
            if (_event.dataValues.length > 0) apiMedicalrecord.updateMedicalRecord(_event).then(r => {
              apiMedicalrecord.addMedicalRecordReference(serviceId ?? stateInputMR.serviceDetail.serviceID, `${stateInputMR.treatment[0].treatment}-${stateInputMR.treatment[0].treatmentDose ?? ''}`, medicalRecordID.refernsiPengobatan)
                .then(e => {
                  setSavedMedicalRecordStatus({ ...savedMedicalRecordStatus, savedTreatment: true })
                  onOpen()
                })
            })
          }
          else apiMedicalrecord.createNewMedicalRecord(
            medicalRecordProgram.obat,
            medicalRecordProgram.obatStage,
            _enrollmentID[0].enrollment,
            _dataValues,
            serviceId ?? stateInputMR.serviceDetail.serviceID,
            stateInputMR.patient.id
          ).then(r => {
            apiMedicalrecord.addMedicalRecordReference(serviceId ?? stateInputMR.serviceDetail.serviceID, `${stateInputMR.treatment[0].treatment}-${stateInputMR.treatment[0].treatmentDose ?? ''}`, medicalRecordID.refernsiPengobatan)
              .then(e => {
                setSavedMedicalRecordStatus({ ...savedMedicalRecordStatus, savedTreatment: true })
                onOpen()
              })
          })
        } else if (_savedTreatment && _savedTreatment.event && !(stateInputMR.treatment && stateInputMR.treatment.length > 0)) {
          let _event = _savedTreatment
          _event.dataValues = []
          apiMedicalrecord.deleteMedicalRecord(_event.event).then(r => {
            apiMedicalrecord.addMedicalRecordReference(serviceId ?? stateInputMR.serviceDetail.serviceID, ``, medicalRecordID.refernsiPengobatan)
              .then(e => {
                setSavedMedicalRecordStatus({ ...savedMedicalRecordStatus, savedTreatment: true })
                onOpen()
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
  let titleSave = state.selectedTab === 1 ? 'Pemeriksaan' : state.selectedTab === 2 ? 'Diagnosis' : state.selectedTab === 3 ? 'Tindakan' : 'Pengobatan'

  let updateTitleText = (item) => {
    let _items = [_savedgeneralAssesment, _savedDiagnosis, _savedAction, _savedTreatment]
    return _items[item] && _items[item].dataValues && _items[item].dataValues.length > 0
  }

  return (
    <>
      <Flex minH={'100vh'}>
        <MedicalNavigation savedStates={savedMedicalRecordStatus} />
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
              : <Box px={40} py={5} textAlign={state.selectedTab === 1 ? 'right' : 'center'}>
                <ButtonMain width={state.selectedTab === 1 ? '47%' : '100%'} maxW={'700px'} onClick={(e) => {
                  onClickButtonSave()
                }}>Simpan {updateTitleText(state.selectedTab - 1) ? "Perubahan" : ""} {titleSave}</ButtonMain>
              </Box>
          }
        </Box>
      </Flex>
      <NotificationStatus isOpen={isOpen} onClose={() => {
        onClose()
        if (state.selectedTab < 4) stateMedicalRecord.selectedTab = state.selectedTab + 1
        if (state.selectedTab === 4) {
          window.browserHistory.push("/")
        }
      }} state={state.selectedTab} />
    </>
  )
}

export default MedicalRecordManagePage