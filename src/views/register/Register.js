import { Box, Center, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { globalContext } from "App";
import ButtonMain from "components/button/ButtonMain";
import Content from "components/Content";
import ProfilePictureEdit from "components/dashboard/biodata/ProfilePictureEdit";
import { InputWithModel } from "components/input";
import PageContainer from "components/PageContainer";
import ToastNotif from "components/Toast";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import apiClinic from "services/apiClinic";
import apiClinicArea from "services/apiClinicArea";
import apiDoctor from "services/apiDoctor";
import { dateFormat, getBase64 } from "utils";
import { nikValidator, phoneValidator } from "utils/inputValidator";
import colors from "values/colors";


export const RegisterPage = () => {

  const gContext = React.useContext(globalContext);

  const [registerData, setRegisterData] = useState({});

  const [orgUnits, setOrgUnits] = useState(null);

  const validator = (e) => {
    switch (e.target.id) {
      case 'phone':
        return phoneValidator(e.target.value)
      case 'nik':
        return nikValidator(e.target.value)
      default:
        return e.target.value ? e.target.value.length > 0 : false;
    }
  }

  const leftInputModel = [
    {
      label: 'Nama Lengkap',
      id: 'name',
      uid: 'HyfzjNVhlzM',
      isRequired: true,
      errMessage: 'Nama lengkap tidak boleh kosong',
      type: 'text',
      icon: '/icon/user.svg',
    },
    {
      label: 'NIK',
      id: 'nik',
      uid: 'xGjeKnsJobT',
      isRequired: true,
      errMessage: 'NIK harus berupa 16 digit angka',
      type: 'number',
      icon: '/icon/credit_card.svg',
      maxLength: 16
    },
    {
      label: 'Tanggal lahir',
      id: 'bod',
      uid: 'SSsiEz3cVbn',
      isRequired: true,
      errMessage: 'Tanggal lahir tidak boleh kosong',
      type: 'date',
      icon: '/icon/calendar.svg'
    },
    {
      label: 'Jenis Kelamin',
      id: 'gender',
      uid: 'TlO4kdMfHqa',
      isRequired: true,
      errMessage: 'Belum memilih jenis kelamin',
      type: 'radio',
      options: [{
        value: 'male',
        label: 'Laki-laki'
      },
      {
        value: 'female',
        label: 'Perempuan'
      }]
    },
    {
      label: 'Alamat Domisili',
      id: 'address',
      uid: 'aRHSGgFeOjr',
      isRequired: true,
      errMessage: 'Alamat tidak boleh kosong',
      type: 'text',
      icon: '/icon/map.svg'
    },
    {
      label: 'Nomor HP Dokter',
      id: 'phone',
      uid: 'x9tchw0swEu',
      isRequired: true,
      errMessage: 'Nomor HP tidak boleh kosong',
      type: 'number',
      icon: '/icon/phone.svg',
      maxLength: 12
    },
    {
      label: 'Email',
      id: 'email',
      uid: 'KNhGfY4ApxB',
      isRequired: true,
      errMessage: 'Email tidak boleh kosong',
      type: 'text',
      icon: '/icon/email.svg'
    },
    {
      label: 'Nama Ibu Kandung',
      id: 'mother_name',
      uid: null,
      isRequired: true,
      errMessage: 'Nama Ibu Kandung tidak boleh kosong',
      type: 'text',
      icon: '/icon/user.svg'
    },
  ]
  const rightInputModel = [
    {
      label: 'Nomor STR',
      id: 'str',
      uid: 'x4sNePtpkmR',
      isRequired: true,
      errMessage: 'Nomor STR tidak boleh kosong',
      type: 'text',
      icon: '/icon/file.svg'
    },
    {
      label: 'Upload file STR',
      id: 'fileStr',
      uid: 'iVFHvAdkYL3',
      isRequired: true,
      errMessage: 'File STR tidak boleh kosong',
      type: 'button',
      buttonLabel: 'Pilih file STR',
      icon: '/icon/upload_cloud.svg'
    },
    {
      label: 'Nomor SIP',
      id: 'sip',
      uid: 'h7tG7kb6qzi',
      isRequired: true,
      errMessage: 'Nomor STR tidak boleh kosong',
      type: 'text',
      icon: '/icon/file.svg'
    },
    {
      label: 'Upload file SIP',
      id: 'fileSip',
      uid: 'GFwYsmRCGsu',
      isRequired: true,
      errMessage: 'File SIP tidak boleh kosong',
      type: 'button',
      buttonLabel: 'Pilih file SIP',
      icon: '/icon/upload_cloud.svg'
    },
    {
      label: 'Lokasi Praktek',
      id: 'clinic_location',
      uid: 'Hib73XtwOIj',
      isRequired: true,
      errMessage: 'Lokasi praktek tidak boleh kosong',
      type: 'text',
      icon: '/icon/map.svg'
    },
  ]

  const onSave = async () => {
    const attributes = []
    for (const d in registerData) {
      if (registerData[d].uid) attributes.push({
        value: registerData[d].value,
        attribute: registerData[d].uid
      })
    }

    if (attributes.length < 12) {
      ToastNotif({
        message: 'Oops.. Data diri belum lengkap, mohon dilengkapi !',
        type: 'error'
      });
    } else {
      const response = await apiDoctor.create(attributes)
      if (response.status === 200) {
        ToastNotif({
          message: 'Yeay, Berhasil registras',
          type: 'success'
        })
      } else {
        ToastNotif({
          message: 'Oopss.. Terjadi kesalahan',
          type: 'error'
        })
      }
    }
  }

  const onInputChange = (e) => {
    var data = registerData;
    data[e.target.id] = {
      uid: e.target.attributes[0].value,
      value: e.target.value
    }
    setRegisterData(data)
  }

  const LeftForms = () => {
    return (
      <>
        <Box w='md'>
          {leftInputModel.map((e) => <InputWithModel key={e.id} inputModel={e} onChange={onInputChange} validator={validator} />)}
        </Box>
      </>
    )
  }

  const RightForms = () => {
    return (
      <>
        <Box w='md'>
          {rightInputModel.map((e) => <InputWithModel key={e.id} inputModel={e} onChange={onInputChange} validator={validator} />)}
        </Box>
        <Box h='20px' />
        <ButtonMain onClick={(e) => onSave()}>
          Simpan
        </ButtonMain>
      </>
    )
  }

  const getOrgUnit = async () => {
    const orgUnit = await apiClinicArea.list()
    console.log(orgUnit);
  }

  const init = useCallback(() => {
    getOrgUnit()
  }, [])

  useEffect(() => {
    init()
  }, [init])


  return (
    <div>
      <PageContainer bg="unset">
        <Content>
          <Center marginTop={"50px"} margin="16px">
            <Box>
              <Grid alignContent="center" templateColumns={(gContext.sWidth) > 800 ? 'repeat(2, 1fr)' : 'nav'} gap={1}>
                <GridItem>
                  <Image src="/img/ic_jd_logo.png" alt="logo" />
                </GridItem>
                {/* <Box w="md" /> */}
                <GridItem>
                  <Text color={colors.HITAM_PUDAR} fontSize="3xl" fontWeight="bold" >
                    Registrasi Dokter
                  </Text>
                  <Text
                    fontSize={"14sp"}
                    textColor={colors.HITAM_PUDAR}>
                    Hanya dokter dengan SIP  yang bisa registrasi. Lengkapi identitas diri anda
                  </Text>
                </GridItem>
              </Grid>
              <Box height={"16px"} />
              <Box w="full">
                <hr />
              </Box>
              <Box height={"54px"} />
              {/* Profile picture input */}
              <Box alignContent="center">
                <Center>
                  <ProfilePictureEdit onChange={onInputChange} />
                </Center>
              </Box>
              <Box height={"54px"} />
              <Grid justifyContent={'center'} templateColumns={(gContext.sWidth) > 800 ? 'repeat(2, 1fr)' : 'nav'} gap={1}>
                <GridItem>
                  <LeftForms />
                </GridItem>
                <GridItem justifyItems={'right'}>
                  <RightForms />
                </GridItem>
              </Grid>
            </Box>
          </Center>
        </Content>
      </PageContainer>
    </div>
  );
}