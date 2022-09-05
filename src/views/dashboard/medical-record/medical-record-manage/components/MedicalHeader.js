import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from "@chakra-ui/react"
import { useParams, useHistory } from "react-router-dom"
import colors from "values/colors"

const MedicalHeader = () => {
  const history = useHistory()
  let { idPatient } = useParams()
  return (
    <Flex alignItems={'center'} padding={'30px'}>
      <Breadcrumb separator='>' paddingLeft={'25px'}>
        <BreadcrumbItem>
          <BreadcrumbLink textDecor={'underline'} onClick={() => history.push('/dashboard')}
          >Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink textDecor={'underline'} onClick={() => history.push(`/dashboard/medical-record/${idPatient}`)}>Rekam medis</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color={colors.PRIMARY} fontWeight={'bold'}>Rekam Medis</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  )
}

export default MedicalHeader