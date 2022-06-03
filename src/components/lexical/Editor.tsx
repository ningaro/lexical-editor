// Lexical
import { LexicalComposer as Composer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'

// Chakra UI
import { chakra, Stack } from '@chakra-ui/react'

// Plugins
import TreeViewPlugin from './plugins/TreeViewPlugin'
import AutoLinkPlugin from './plugins/AutoLinkPlugin'

// Components
import editorConfig from './editorConfig'
import ControlButtons from './ControlButtons'

function Placeholder() {
  return <div className="editor-placeholder"> </div>
}

// @ts-ignore
const ContentEditChakra = chakra(ContentEditable)

export default function Editor() {
  return (
    <Composer initialConfig={editorConfig}>
      <Stack w="100%">
        <ControlButtons w="100%" />
        <chakra.div w="100%" className="editor-container">
          <RichTextPlugin
            contentEditable={
              <ContentEditChakra
                w="100%"
                maxH="80vh"
                h="80vh"
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
      <TreeViewPlugin />
      <AutoLinkPlugin />
    </Composer>
  )
}
