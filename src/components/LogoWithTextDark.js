import { Image } from '@chakra-ui/react';
import SEO from 'values/seo';

const LogoWithTextDark = (props) => {
  return (
    <Image
      src="/img/logo_with_text_dark.svg"
      alt="logo"
      title={SEO.title}
      {...props}
    />
  );
};

export default LogoWithTextDark;
