import { extendTheme, ChakraTheme } from '@chakra-ui/react'

// Editor Style
import textStyles from './components/lexical/theme/TextStyles'
import tableStyles from './components/lexical/theme/TableStyles'

const styles: ChakraTheme['styles'] = {
  global: () => ({
    'html, body, #root': {
      height: '100%',
    },
    '.tree-view-output': {
      overflow: 'auto',
      w: '100%',
      h: '20vh',
      mt: '.5em',
      bg: 'black',
      color: 'white',
      border: '1px solid black',
      borderRadius: 'md',
    },
    '.tree-view-output pre': {
      fontSize: 'xs',
    },
    ...textStyles,
    ...tableStyles,
  }),
}

export default extendTheme({ styles })
