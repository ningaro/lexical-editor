import { extendTheme, ChakraTheme } from '@chakra-ui/react'

// Editor Style
import textStyles from './components/lexical/theme/TextStyles'

const styles: ChakraTheme['styles'] = {
  global: () => ({
    'html, body, #root': {
      height: '100%',
    },
    '.tree-view-output': {
      overflow: 'auto',
    },
    ...textStyles,
  }),
}

export default extendTheme({ styles })
