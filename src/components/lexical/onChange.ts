import type { EditorState } from 'lexical'
import { $getSelection } from 'lexical'
import { $isLinkNode } from '@lexical/link'

// Helpers
import getSelectedNode from './helpers/getSelectedNode'

export default function onChange(editorState: EditorState) {
  editorState.read(() => {
    const selection = $getSelection()
    // @ts-ignore
    const node = getSelectedNode(selection)
    const parent = node.getParent()

    // eslint-disable-next-line no-console
    if ($isLinkNode(node)) console.log(node.getURL())
    // eslint-disable-next-line no-console
    if ($isLinkNode(parent)) console.log(parent.getURL())
  })
}
