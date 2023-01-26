// The model must follow this structure
// {
//   label: 'Nama Lengkap',
//   id: 'name',
//   isRequired: true,
//   errMessage: 'Nama lengkap tidak boleh kosong',
//   type: 'text',
// },

import { Box } from "@chakra-ui/react"
import InputNoHP from "./InputNoHP"
import InputWithButton from "./InputWithButton"
import InputOutlined from "./InputOutlined"

const { default: InputRadio } = require("./InputRadio")
const { default: InputUnderlined } = require("./InputUnderlined")

export const InputWithModel = ({ inputModel, validator, onChange }) => {
  console.log(inputModel, "model")
  switch (inputModel.type) {
    case 'phone1':
      return <>
        <InputNoHP uid={inputModel.uid} isRequired={inputModel.isRequired} label={inputModel.label} icon={inputModel.icon} id={inputModel.id} key={inputModel.id} onChange={onChange} validator={validator} errmessage={inputModel.errMessage} />
        <Box h='20px' />
      </>
    case 'button':
      return <>
        <InputWithButton uid={inputModel.uid} isRequired buttonLabel={inputModel.buttonLabel} id={inputModel.id} key={inputModel.key} label={inputModel.label} icon={inputModel.icon} onChange={onChange} validator={validator} errmessage={inputModel.errMessage} accept={inputModel.accept} />
        <Box h='20px' />
      </>
    case 'radio':
      return <>
        <InputRadio uid={inputModel.uid} isRequired={inputModel.isRequired} label={inputModel.label} options={inputModel.options} id={inputModel.id} key={inputModel.id} onChange={onChange} validator={validator} errmessage={inputModel.errMessage} />
        <Box h='20px' />
      </>
    default:
      if (inputModel.typeModel === 'outlined') {
        return <>
          <InputOutlined uid={inputModel.uid} type={inputModel.type} maxLength={inputModel.maxLength ?? 500} isRequired={inputModel.isRequired} label={inputModel.label} icon={inputModel.icon} id={inputModel.id} key={inputModel.id} onChange={onChange} validator={validator} errmessage={inputModel.errMessage} selectOption={inputModel.selectOption} />
          <Box h='20px' />
        </>
      } else {
        return <>
          <InputUnderlined uid={inputModel.uid} type={inputModel.type} maxLength={inputModel.maxLength ?? 500} isRequired={inputModel.isRequired} label={inputModel.label} icon={inputModel.icon} id={inputModel.id} key={inputModel.id} onChange={onChange} validator={validator} errmessage={inputModel.errMessage} />
          <Box h='20px' />
        </>
      }
  }
}
