import type { LexicalNode } from 'lexical'

import { AutoLinkNode, LinkNode } from '@lexical/link'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { Class } from 'utility-types'

const DefaultNodes: Array<Class<LexicalNode>> = [
  TableNode,
  TableCellNode,
  TableRowNode,
  AutoLinkNode,
  LinkNode,
]

export default DefaultNodes
