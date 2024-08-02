import React, { useEffect, useState } from "react";
import { RichTextEditor, Link, useRichTextEditorContext } from '@mantine/tiptap';
import { FloatingMenu, useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import axios from "axios";
import { IconDeviceFloppy } from '@tabler/icons-react';

//const content = JSON.parse(FileContent)



const NoteEditor = (props) => {

  const [typedData, setTypedData] = useState("")
  const [typedText, setTypedText] = useState("")
  const [content, setContent] = useState("")
  const [noteID, setNoteID] = useState("")
  const url = `http://localhost:5000/api/v1/notes/`
  const fetchNote = async () => {
    try {
      const response = await axios(`${url}${noteID}`)
      const noteFrom = response.data.note
      setContent(noteFrom && noteFrom.text)
      setTypedData(noteFrom && noteFrom.text)
    } catch (error) {
      console.log(error)
    }
  }

  const saveNote = async () => {
    try {
      const response = await axios.patch(`${url}${noteID}`, {
        "title": typedText === "" ? "Untitled" : typedData.content[0].content[0].text.substring(0, 25), "text": typedText === "" ? "" : typedData
      })
      const noteFrom = response.data.note
      setNoteID(noteFrom._id)
      setContent(noteFrom.text)
    } catch (error) {
      console.log(error)
    }
  }

  const saveNewNote = async () => {
    try {
      const response = await axios.post(`${url}`, {
        "title": typedText === "" ? "Untitled" : typedData.content[0].content[0].text.substring(0, 25), "text": typedText === "" ? "" : typedData
      })
      const noteFrom = response.data.note
      props.onNoteSave(noteFrom && noteFrom._id)
      setContent(noteFrom.text)
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    if (noteID != "false") {
      fetchNote()
    } else {
      setContent("")
      setTypedData("")
    }
  }, [noteID]);

  useEffect(() => {
    setNoteID(props.id)
  }, [props.id])

  const SaveButton = () => {
    return (
      <RichTextEditor.Control
        onClick={() => { noteID != "false" ? saveNote() : saveNewNote() }}
        aria-label="Save"
        title="Save"
      >
        <IconDeviceFloppy stroke={1.5} size="1rem" />
      </RichTextEditor.Control>
    );
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
    onUpdate({ editor }) {
      setTypedData(editor.getJSON());
      setTypedText(editor.getText());
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [content]);
  //console.log(typedData)


  return (

    <>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <SaveButton />
          </RichTextEditor.ControlsGroup>

        </RichTextEditor.Toolbar>

        {editor && (
          <FloatingMenu editor={editor}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.BulletList />
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.Highlight />

            </RichTextEditor.ControlsGroup>
          </FloatingMenu>
        )}

        <RichTextEditor.Content />
      </RichTextEditor>
    </>
  );
}

export default NoteEditor
