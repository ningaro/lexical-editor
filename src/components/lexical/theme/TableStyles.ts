import { SystemStyleObject } from '@chakra-ui/react'

const tableStyles: Record<string, SystemStyleObject> = {
  '.editor-table': {
    my: 2,
    fontVariantNumeric: 'lining-nums tabular-nums',
    borderCollapse: 'collapse',
  },
  '.editor-table-cell': {
    textAlign: 'start',
    py: '6',
    px: '4',
    lineHeight: 5,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderColor: 'black',
  },
  '.editor-table-cell-header': {
    fontWeight: 'inherit',
  },
  '.editor-table-row': {
    borderColor: 'black',
    overflowWrap: 'break-word',
  },
}

/* table: 'editor-table',
  tableCell: 'editor-table-cell',
  tableCellHeader: 'editor-table-cell-header',
  tableRow: 'editor-table-row', */

export default tableStyles
