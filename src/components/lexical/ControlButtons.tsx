/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useState } from 'react'
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
} from 'lexical'
import { exportFile, importFile } from '@lexical/file'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { mergeRegister } from '@lexical/utils'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  Button,
  ButtonGroup,
  IconButton,
  Icon,
  Stack,
  Spacer,
} from '@chakra-ui/react'
import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiLink,
  RiTableLine,
} from 'react-icons/ri'

// Helpers
import getSelectedNode from './helpers/getSelectedNode'

// Types
interface ControlButtonsProps {
  onOpenLinkModal: () => void
  onOpenTableModal: () => void
}

export default function ControlButtons(props: ControlButtonsProps) {
  const { onOpenLinkModal, onOpenTableModal } = props
  const [editor] = useLexicalComposerContext()
  const [isLink, setIsLink] = useState(false)
  const [activeEditor, setActiveEditor] = useState(editor)

  const handleCreateLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://')
      onOpenLinkModal()
    } else {
      onOpenLinkModal()
    }
  }, [editor, isLink, onOpenLinkModal])
  const handleCreateTable = () => {
    onOpenTableModal()
  }
  const handleDownloadFile = () => {
    exportFile(editor, {
      fileName: `${new Date().toISOString()}`,
      source: '(C) Ningaro',
    })
  }
  const handleUploadFile = () => {
    importFile(editor)
  }

  const ControlButtonsState = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      // Update links
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true)
      } else {
        setIsLink(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEditor])

  useEffect(
    () =>
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          ControlButtonsState()
          setActiveEditor(newEditor)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      ),
    [editor, ControlButtonsState]
  )
  useEffect(
    () =>
      mergeRegister(
        activeEditor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            ControlButtonsState()
          })
        })
      ),
    [activeEditor, ControlButtonsState]
  )

  return (
    <Stack
      direction={{ base: 'column-reverse', lg: 'row' }}
      spacing={{ base: 4, lg: undefined }}
    >
      <Spacer flex="1" />
      <ButtonGroup
        flex="1"
        isAttached
        variant="outline"
        justifyContent="center"
        w="100%"
      >
        <IconButton
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
          aria-label=""
          icon={<Icon as={RiBold} />}
        />
        <IconButton
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
          aria-label=""
          icon={<Icon as={RiItalic} />}
        />
        <IconButton
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
          }
          aria-label=""
          icon={<Icon as={RiUnderline} />}
        />
        <IconButton
          onClick={handleCreateLink}
          aria-label=""
          icon={<Icon as={RiLink} />}
        />
        <IconButton
          onClick={handleCreateTable}
          aria-label=""
          icon={<Icon as={RiTableLine} />}
        />
      </ButtonGroup>
      <ButtonGroup
        flex="1"
        size="sm"
        isAttached
        variant="outline"
        alignItems="center"
        justifyContent={{ base: 'center', lg: 'flex-end' }}
        w="100%"
      >
        <Button onClick={handleDownloadFile} colorScheme="green" mr="-px">
          Save
        </Button>
        <Button onClick={handleUploadFile} colorScheme="blue" mr="-px">
          Upload
        </Button>
      </ButtonGroup>
    </Stack>
  )
}
