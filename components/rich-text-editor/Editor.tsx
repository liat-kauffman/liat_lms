"use client"

import {EditorContent, useEditor} from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Menubar } from './Menubar'
import TextAlign from '@tiptap/extension-text-align'
import { json } from 'zod'

export function RichTextEditor( {field}: {field: any}) {
    const editor = useEditor({
        extensions: [StarterKit.configure({
            heading: {
                levels: [1, 2, 3],
            },
        }),
            TextAlign.configure({
                types:["heading", "paragraph"]
            })
        ],
        editorProps: {
            attributes: {
                class: 'min-h-[300px] p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-tight [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-snug [&_p]:leading-7'
                
            }
        },
        onUpdate: ({ editor }) => {
            field.onChange(JSON.stringify(editor.getJSON))
        },
        content: field.value ? JSON.parse(field.value): "<p>Hello world</p>", 
        immediatelyRender: false
    })

    return (
        <div className='w-full border border-input rounded-lg overflow-hidden dark:bg-input/30 '>
            <Menubar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}
