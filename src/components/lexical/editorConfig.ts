import type { EditorThemeClasses } from 'lexical'
import DefaultNodes from './nodes/DefaultNodes'

const theme: EditorThemeClasses = {
  ltr: 'ltr',
  rtl: 'rtl',
  placeholder: 'editor-placeholder',
  paragraph: 'editor-paragraph',
  text: {
    bold: 'editor-bold',
    italic: 'editor-italic',
    underline: 'editor-underline',
  },
  link: 'editor-link',
}

const editorConfig = {
  theme,
  // @ts-ignore
  onError(error) {
    throw error
  },
  nodes: [...DefaultNodes],
}

export default editorConfig
