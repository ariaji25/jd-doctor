const { default: request } = require("utils/request")
const { default: urls } = require("values/urls")

const getPaymentMethod = async () => {
  const req = await request.get(
    urls.PAYMENT_METHOD
  )
  return req.data;
}

const generatePayment = async (bookingId, 
  serviceId, serviceName, servicePrice, 
  paymentChannel, patientId, patientName, bookingDate) => {
  const data = {
    "booking_id": `${bookingId}`,
    "product_id": `${serviceId}`,
    "product_name": `${serviceName}`,
    "product_price": `${servicePrice}`,
    "payment_channel": `${paymentChannel}`,
    "patient_id": `${patientId}`,
    "patient_name": `${patientName}`,
    "booking_date": `${bookingDate}`
  }
  const req = await request.post(
    urls.REQUEST_PAYMENT,
    data
  )
  return req.data;
}

const getPaymentStatus = async (bookingId) => {
  const req = await request.get(
    `${urls.PAYMENT_STATUS}/${bookingId}`
  )
  return req.data;
}

const apiPayment = { getPaymentMethod, generatePayment, getPaymentStatus }

export default apiPayment;