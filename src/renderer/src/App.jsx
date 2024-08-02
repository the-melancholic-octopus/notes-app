import React, { useState } from 'react';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import { AppShell, Burger, Group, MantineProvider, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Sidebar from './components/sidebar';
import NoteEditor from './components/editor';

function App() {
  const [opened, { toggle }] = useDisclosure();
  const [noteID, setNoteID] = useState("")

  const handleNoteClicked = (_id) => {
    setNoteID(_id)
  }

  const handleNoteSave = (newTaskId) => {
    setNoteID(newTaskId);
  };

  return (
    <>
      <MantineProvider defaultColorScheme="dark">
        <AppShell
          header={{ height: 60 }}
          navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
          padding="md"
        >
          <AppShell.Header>
            <Group h="100%" px="md">
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Title order={1}>Notes</Title>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p="md">
            <Sidebar onNoteClick={handleNoteClicked} currentNoteID={`${noteID}`} />
          </AppShell.Navbar>
          <AppShell.Main><NoteEditor id={`${noteID}`} onNoteSave={handleNoteSave} /></AppShell.Main>
        </AppShell>
      </MantineProvider>

    </>
  )
}

export default App

