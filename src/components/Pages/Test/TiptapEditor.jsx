import React from "react";
import { useEditor, BubbleMenu, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
// import { RichTextEditor, Link } from "@mantine/tiptap";
import Placeholder from "@tiptap/extension-placeholder";
import { Button, Space } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  HighlightOutlined,
  FontColorsOutlined,
  DashOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  RemoveFormatting,
  Bold,
  Italic,
  Strikethrough,
  Highlighter,
  TextQuote,
  Minus,
  LinkIcon,
  Unlink,
} from "lucide-react";
import "./tiptap.css";

//clear format, highlight, blockquotes, horizontal line, bulletlist, orderlist, sub, sup, link, align, text color,
// bubble menu

const TiptapEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Superscript,
      SubScript,
      Placeholder.configure({
        placeholder: "What's on your mind?", // Placeholder text
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      HorizontalRule,
    ],
    content: value || "", // Initial empty content
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className="tooltip-container">
        <Space.Compact block>
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
            icon={<BoldOutlined />}
          />
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
            icon={<ItalicOutlined />}
          />
          <Button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "is-active" : ""}
            icon={<UnderlineOutlined />}
          />

          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
            icon={<StrikethroughOutlined />}
          />
          <Button
            onClick={() =>
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }
            icon={<RemoveFormatting size={18} />}
          />
        </Space.Compact>
        <Space.Compact block>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
            icon={<Heading1 size={18} />}
          ></Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
            icon={<Heading2 size={18} />}
          />

          <Button
            type="default"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
            icon={<Heading3 size={18} />}
          />
        </Space.Compact>
        <Space.Compact block>
          <Button
            type="default"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </Button>
          <Button
            type="default"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </Button>
          <Button
            type="default"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </Button>
        </Space.Compact>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
