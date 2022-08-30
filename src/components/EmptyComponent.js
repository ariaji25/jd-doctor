import { Box, Center, Image, Stack } from "@chakra-ui/react"

const EmptyComponent = ({ src, caption, width }) => {
  return (
    <Center >
      <Stack>
        <Center>
          <Image
            cursor={'pointer'}
            alt={'empty'}
            src={src}
            width={width}
          />
        </Center>
        <Box>{caption}</Box>
      </Stack>
    </Center>
  )
}

export default EmptyComponent