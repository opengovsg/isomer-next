import { getSanitizedInlineContent } from "~/utils"
import type { BaseParagraphProps } from "~/interfaces/native/Paragraph"

export const BaseParagraph = ({
  content,
  className = "",
  id,
}: BaseParagraphProps) => {
  const sanitizedContent = getSanitizedInlineContent(content)

  return (
    <p
      className={`[&:not(:first-child)]:mt-6 after:[&_a[target*="blank"]]:content-['_↗'] [&_a]:text-hyperlink [&_a]:underline visited:[&_a]:text-purple-600 hover:[&_a]:text-hyperlink-hover ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      id={id}
    />
  )
}

export default BaseParagraph