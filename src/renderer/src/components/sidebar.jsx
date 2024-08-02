import React, { useEffect, useState } from "react";
import { ActionIcon, Button, Card, Group, Modal, ScrollArea, Text } from '@mantine/core';
import axios from "axios";
import { IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const Sidebar = ({ onNoteClick, currentNoteID }) => {
  const [notes, setNotes] = useState([])
  const [opened, { open, close }] = useDisclosure(false);
  const [toDelete, setToDelete] = useState("")

  const url = "http://localhost:5000/api/v1/notes/"
  const fetchNotes = async () => {
    try {
      const response = await axios(url)
      const notes = response.data.notes
      setNotes(notes)
      console.log(notes)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteNote = async (noteID) => {
    try {
      const response = await axios.delete(`${url}${noteID}`)
      close()
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    setToDelete("")
  }


  useEffect(() => {
    fetchNotes();
  }, [onNoteClick, toDelete]);
  return (
    <>

      <Button fullWidth onClick={() => onNoteClick(false)}>New Note</Button>
      <ScrollArea mt="sm" mb="xl" type="hover" scrollbarSize={8} h="100%">
        {notes.map((note) => (
          <Card shadow="sm" padding="xs" radius="md" mt="md" withBorder >
            <Group justify="space-between" mt="xs" mb="xs" onClick={() => onNoteClick(note._id)} style={{ cursor: "pointer" }}>
              <Text fw={500}> {note.title}</Text>
            </Group>
            <Group mb="xs">
              <ActionIcon variant="light" color="pink" disabled={note._id == currentNoteID} onClick={() => { open(); setToDelete(note._id) }}>
                <IconTrash color="pink" stroke={1.5} size="1rem" />
              </ActionIcon>
            </Group>
          </Card>
        ))}
      </ScrollArea>
      <Modal
        opened={opened}
        onClose={close}
        title="Delete note"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}>
        Are you sure you want to delete this note?
        <Group m="sm" style={{ float: "right" }}>
          <Button onClick={close} variant="outline">Cancel</Button>
          <Button onClick={() => deleteNote(toDelete)}>Okay</Button>
        </Group>
      </Modal>
    </>
  )
}

export default Sidebar


