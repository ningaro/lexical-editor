/* eslint-disable react/jsx-props-no-spreading */
import type { RangeSelection, TextNode, ElementNode } from 'lexical'
import { useCallback, useEffect, useState } from 'react'
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
} from 'lexical'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { $isAtNodeEnd } from '@lexical/selection'
import { mergeRegister } from '@lexical/utils'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  Button,
  ButtonGroup,
  ButtonGroupProps,
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

function getSelectedNode(selection: RangeSelection): TextNode | ElementNode {
  const { anchor } = selection
  const { focus } = selection
  const anchorNode = anchor.getNode()
  const focusNode = focus.getNode()
  if (anchorNode === focusNode) {
    return anchorNode
  }
  const isBackward = selection.isBackward()
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode
  }
  return $isAtNodeEnd(anchor) ? focusNode : anchorNode
}

export default function ControlButtons(props: ButtonGroupProps) {
  const [editor] = useLexicalComposerContext()
  const [isLink, setIsLink] = useState(false)
  const [activeEditor, setActiveEditor] = useState(editor)

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://')
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }, [editor, isLink])

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
        {...props}
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
          onClick={() =>
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://')
          }
          aria-label=""
          icon={<Icon as={RiLink} />}
        />
        <IconButton
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
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
        {...props}
      >
        <Button colorScheme="green" mr="-px">
          Сохранить
        </Button>
        <Button colorScheme="blue" mr="-px">
          Загрузить
        </Button>
      </ButtonGroup>
    </Stack>
  )
}
