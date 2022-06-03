import { Center, Box } from '@chakra-ui/react'
import Editor from '../components/lexical/Editor'
// components

export default function App() {
  return (
    <Box h="100%" w="100%" px={{ base: 4, md: 16, lg: 32 }}>
      <Center h="100%">
        <Editor />
      </Center>
    </Box>
  )
}
