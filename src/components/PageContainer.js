import { Box } from '@chakra-ui/react';

const PageContainer = (props) => {
  if (!(props.isWhiteBg ?? false)) {
    return (
      <Box
        bgImage={props.bgImage ?? `url('/img/bg_blur.svg')`}
        bgRepeat="no-repeat"
        bgSize="100% auto"
        {...props}
      >
        {props.children}
      </Box>
    )
  } else {
    return (
      <Box
        bgRepeat="no-repeat"
        bgSize="100% auto"
        {...props}
      >
        {props.children}
      </Box>
    );
  }
};

export default PageContainer;
