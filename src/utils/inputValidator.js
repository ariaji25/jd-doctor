import { maximumFileSize, maximumProfileSize } from "./constant"

export const nikValidator = (nik) => {
  try {
    var long = parseInt(nik)
    console.log("valid")
    return nik.length === 16
  } catch {

    console.log("invalid")
    return false;
  }
}

export const phoneValidator = (phone) => {
  try {
    var long = parseInt(phone)
    return phone.length >= 11
  } catch {
    return false;
  }
}

export const fileValidator = (file) => {
  return (file.size <= maximumFileSize)
}

export const profileFileValidator = (file) => {
  return (file.size <= maximumProfileSize)
}