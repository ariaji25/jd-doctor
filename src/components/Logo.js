import { Image } from '@chakra-ui/react'
import SEO from 'values/seo'

const Logo = (props) => {
  return <Image src="/img/logo.svg" alt="logo" title={SEO.title} {...props} />
}

export default Logo
