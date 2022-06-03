/* eslint-disable react/prop-types */
import LexicalComposerContext from '@lexical/react/LexicalComposerContext'
import { useState, useEffect, useCallback, createElement } from 'react'

export default function CustomEditor({
  // @ts-ignore
  role = 'textbox',
  // @ts-ignore
  spellCheck = true,
  // @ts-ignore
  className,
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext()
  const [isReadOnly, setReadOnly] = useState(true)

  const ref = useCallback(
    // @ts-ignore
    (rootElement) => {
      editor.setRootElement(rootElement)
    },
    [editor]
  )

  useEffect(() => {
    setReadOnly(editor.isReadOnly())
    return editor.registerReadOnlyListener((currentIsReadOnly) => {
      setReadOnly(currentIsReadOnly)
    })
  }, [editor])

  return createElement('div', {
    className,
    contentEditable: !isReadOnly,
    ref,
    role,
    spellCheck,
  })
}
