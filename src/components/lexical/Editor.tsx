// Lexical
import { LexicalComposer as Composer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'

// Chakra UI
import { chakra, Stack, useDisclosure } from '@chakra-ui/react'

// Plugins
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { TablePlugin } from '@lexical/react/LexicalTablePlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import TreeViewPlugin from './plugins/TreeViewPlugin'
import AutoLinkPlugin from './plugins/AutoLinkPlugin'
import LinkModalPlugin from './plugins/LinkModalPlugin'
import TableModalPlugin from './plugins/TableModalPlugin'

// Components
import editorConfig from './editorConfig'
import ControlButtons from './ControlButtons'
import onChange from './onChange'

function Placeholder() {
  return <div className="editor-placeholder"> </div>
}

// @ts-ignore
const ContentEditChakra = chakra(ContentEditable)

export default function Editor() {
  const {
    isOpen: isOpenLinkModal,
    onOpen: onOpenLinkModal,
    onClose: onCloseLinkModal,
  } = useDisclosure()
  const {
    isOpen: isOpenTableModal,
    onOpen: onOpenTableModal,
    onClose: onCloseTableModal,
  } = useDisclosure()

  return (
    <Composer initialConfig={editorConfig}>
      <Stack w="100%" spacing={{ base: '0', lg: '2' }}>
        <ControlButtons
          onOpenLinkModal={onOpenLinkModal}
          onOpenTableModal={onOpenTableModal}
        />
        <chakra.div w="100%" className="editor-container">
          <RichTextPlugin
            contentEditable={
              <ContentEditChakra
                w="100%"
                maxH="60vh"
                h="60vh"
                overflowY="scroll"
                borderWidth="2px"
                borderRadius="md"
                borderColor="gray.300"
                p={2}
              />
            }
            placeholder={<Placeholder />}
          />
        </chakra.div>
      </Stack>
      <OnChangePlugin onChange={onChange} />
      <TreeViewPlugin />
      <AutoLinkPlugin />
      <LinkPlugin />
      <TablePlugin />
      <LinkModalPlugin
        isOpenModal={isOpenLinkModal}
        onCloseModal={onCloseLinkModal}
      />
      <TableModalPlugin
        isOpenModal={isOpenTableModal}
        onCloseModal={onCloseTableModal}
      />
    </Composer>
  )
}
