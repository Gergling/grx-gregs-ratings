import { PortableText } from "@portabletext/react"
import { BlockContent } from "../../../../libs/sanity";
import { usePortableTextComponents } from "./use-portable-text-components";

export const BlogRendererBlockContent = ({ value }: { value: BlockContent; }) => {
  const portableTextComponents = usePortableTextComponents();
  return (
    <PortableText
      value={value}
      components={portableTextComponents}
    />
  )
}