import { useCallback, useState, useEffect } from 'react'
import { $getSelection } from 'lexical'
import { mergeRegister } from '@lexical/utils'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'

// Helpers
import getSelectedNode from '../helpers/getSelectedNode'

// Types
interface LinkModalPluginProps {
  isOpenModal: boolean
  onCloseModal: () => void
}

export default function LinkModalPlugin({
  isOpenModal,
  onCloseModal,
}: LinkModalPluginProps) {
  const [editor] = useLexicalComposerContext()
  const [text, setText] = useState<string | undefined>(undefined)
  const [url, setURL] = useState<string | undefined>(undefined)

  const updateEditorData = useCallback(() => {
    const selection = $getSelection()
    // @ts-ignore
    const node = getSelectedNode(selection)
    const parent = node.getParent()

    setText(selection?.getTextContent())

    if ($isLinkNode(node)) setURL(node.getURL())
    else if ($isLinkNode(parent)) setURL(parent.getURL())
  }, [])

  const handleSave = () => {
    const sendingURL = url !== '' ? url : null
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, sendingURL)
    onCloseModal()
  }

  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            updateEditorData()
          })
        })
      ),
    [editor, updateEditorData]
  )

  return (
    <Modal isOpen={isOpenModal} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change link</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Link text</FormLabel>
            <Input isDisabled value={text} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Link path</FormLabel>
            <Input
              onChange={(e) => setURL(e.target.value)}
              placeholder="https://ya.ru"
              value={url}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleSave} colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onCloseModal}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
