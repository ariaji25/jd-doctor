import { Image } from '@chakra-ui/react'
import SEO from 'values/seo'

const LogoWithText = (props) => {
  return (
    <Image
      cursor="pointer"
      src="/img/logo_with_text.svg"
      alt="logo"
      title={SEO.title}
      {...props}
      onClick={() => window.browserHistory.push("/landing")}
    />
  )
}

export default LogoWithText
