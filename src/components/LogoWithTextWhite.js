import { Image } from '@chakra-ui/react';
import SEO from 'values/seo';

const LogoWithTextWhite = (props) => {
  return (
    <Image
      src="/img/logo_with_text_white.svg"
      alt="logo"
      title={SEO.title}
      {...props}
    />
  );
};

export default LogoWithTextWhite;
