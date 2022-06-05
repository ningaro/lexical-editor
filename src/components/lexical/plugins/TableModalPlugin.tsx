/* eslint-disable react/jsx-props-no-spreading */
import type { Dispatch, SetStateAction } from 'react'
import { useState, useEffect } from 'react'
import { INSERT_TABLE_COMMAND } from '@lexical/table'
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
  HStack,
  useNumberInput,
} from '@chakra-ui/react'

// Types
interface NumberInputProps {
  setValue: Dispatch<SetStateAction<TableModalData>>
  valueType: keyof TableModalData
}
interface TableModalPluginProps {
  isOpenModal: boolean
  onCloseModal: () => void
}
interface TableModalData {
  rows?: string
  columns?: string
}

function NumberInput({ setValue, valueType }: NumberInputProps) {
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    value,
  } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 30,
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  useEffect(() => {
    setValue((oldValues) => ({ ...oldValues, [valueType]: value }))
  })

  return (
    <HStack maxW="160px">
      <Button {...inc}>+</Button>
      <Input {...input} />
      <Button {...dec}>-</Button>
    </HStack>
  )
}

export default function TableModalPlugin({
  isOpenModal,
  onCloseModal,
}: TableModalPluginProps) {
  const [editor] = useLexicalComposerContext()
  const [data, setData] = useState<TableModalData>({ rows: '0', columns: '0' })

  const handleSave = () => {
    editor.dispatchCommand(INSERT_TABLE_COMMAND, data)
    onCloseModal()
  }

  return (
    <Modal isOpen={isOpenModal} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create table</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Rows</FormLabel>
            <NumberInput valueType="rows" setValue={setData} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Columns</FormLabel>
            <NumberInput valueType="columns" setValue={setData} />
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
