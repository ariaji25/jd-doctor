import { proxy } from "valtio"

export const initStateInputMR = {
  serviceDetail: null,
  patient: null,
  generalAssesment: {
    generalCondition: {
      condition: '',
      bloodPresure: '',
      respiration: '',
      bodyWeight: '',
      awareness: '',
      pulse: '',
      bodyTemperature: '',
      bodyHeight: '',
    },
    visualSystem: {
      eyesPosition: '',
      eyelid: '',
      eyeMovement: '',
      eyeBoalMovement: '',
      conjungtiva: '',
      cornea: '',
      sklera: ''
    },
    respirationSystem: {
      airway: '',
      breath: '',
      breathSound: '',
      breathWithMuscel: '',
      other: ''
    },
    hearthCirculation: {
      pulseSpeed: '',
      pulseRhytm: '',
      abnormalHearthSound: '',
      chestPain: '',
      shown: '',
      character: '',
    },
    digestionSystem: {
      tooth: '',
      isFakeTooth: '',
      chestPain: '',
      other: '',
    },
    uroGenitalSystem: {
      patternRoutine: '',
      patternRoutine1: '',
      count: '',
      color: '',
      other: ''
    },
    intugmenSystem: {
      skinTurgor: '',
      skinColor: '',
      contructor: '',
      movementDificulity: '',
      other: ''
    },
    chestAndAxila: {
      mammae: '',
      mammaeAreolla: '',
      mammaePapila: '',
      colostrum: ''
    }
  },
  diagnosis: [],
  action: [],
  treatment: [],
  diagnosisEnrollmentID: '',
  generalAssesmentEnrollmentID: '',
}

const stateInputMR = proxy({ ...initStateInputMR })

export const clearStateInputMR = () => {
  for (const key in stateInputMR) {
    stateInputMR[key] = initStateInputMR[key]
  }
  for (const key in stateInputMR.generalAssesment.generalCondition) {
    stateInputMR.generalAssesment.generalCondition[key] = initStateInputMR.generalAssesment.generalCondition[key]
  }
  for (const key in stateInputMR.generalAssesment.visualSystem) {
    stateInputMR.generalAssesment.visualSystem[key] = initStateInputMR.generalAssesment.visualSystem[key]
  }
  for (const key in stateInputMR.generalAssesment.respirationSystem) {
    stateInputMR.generalAssesment.respirationSystem[key] = initStateInputMR.generalAssesment.respirationSystem[key]
  }
  for (const key in stateInputMR.generalAssesment.hearthCirculation) {
    stateInputMR.generalAssesment.hearthCirculation[key] = initStateInputMR.generalAssesment.hearthCirculation[key]
  }
  for (const key in stateInputMR.generalAssesment.digestionSystem) {
    stateInputMR.generalAssesment.digestionSystem[key] = initStateInputMR.generalAssesment.digestionSystem[key]
  }
  for (const key in stateInputMR.generalAssesment.uroGenitalSystem) {
    stateInputMR.generalAssesment.uroGenitalSystem[key] = initStateInputMR.generalAssesment.uroGenitalSystem[key]
  }
  for (const key in stateInputMR.generalAssesment.intugmenSystem) {
    stateInputMR.generalAssesment.intugmenSystem[key] = initStateInputMR.generalAssesment.intugmenSystem[key]
  }
  for (const key in stateInputMR.generalAssesment.chestAndAxila) {
    stateInputMR.generalAssesment.chestAndAxila[key] = initStateInputMR.generalAssesment.chestAndAxila[key]
  }
}
export default stateInputMR;