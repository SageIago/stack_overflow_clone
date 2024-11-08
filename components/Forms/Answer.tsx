/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import StarIcons from "@/app/public/assets/icons/stars.svg";
import { useTheme } from "@/context/ThemeProvider";
import { CreateAnswer } from "@/lib/actions/answer.action";
import { AnswerSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "../ui/form";

interface AnswerProps {
  authorId: string,
  questionId: string
  question: string
}

const Answer = ({authorId, questionId, question }: AnswerProps) => {
  // eslint-disable-next-line no-unused-vars
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const pathname = usePathname()
  const editorRef = useRef(null);
  const { mode } = useTheme();
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

   async function SubmitAnswer(data: z.infer<typeof AnswerSchema>) {
    setIsSubmitting(true)

    try {
      
      await CreateAnswer({
        content: data?.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname
      })

      form.reset()

      if(editorRef.current) {
        const editor = editorRef.current as any

        editor.setContent("")
      }
    } catch (error) {
       throw new Error("Answer has not been Submitted...") 
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your Answer Here
        </h4>

        <Button className="btn light-border-2 gap-1.5 rounded-[6px] px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500">
          <Image
            src={StarIcons}
            alt="Star Icons"
            width={12}
            height={12}
            className="object-contain"
          />

          Generate an AI Answer
        </Button>
      </div>

      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(SubmitAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light900 mt-4">
                  Answer to the Problem
                  <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(_evt, editor) =>
                      // @ts-expect-error-NotFinished
                      (editorRef.current = editor)
                    }
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "codesample | bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist",
                      content_style:
                        "body { font-family:Inter; font-size: 16px ;}",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="primary-gradient w-fit rounded-[8px] text-white " >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
