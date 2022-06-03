import { SystemStyleObject } from '@chakra-ui/react'

const textStyles: Record<string, SystemStyleObject> = {
  '.editor-bold': {
    fontWeight: '700',
  },
  '.editor-italic': {
    fontStyle: 'italic',
  },
  '.editor-underline': {
    textDecoration: 'underline',
  },
  '.editor-link': {
    color: 'blue.500',
    _hover: {
      textDecoration: 'underline',
    },
  },
}

/* bold: 'editor-bold',
    italic: 'editor-italic',
    underline: 'editor-underline', */

export default textStyles
