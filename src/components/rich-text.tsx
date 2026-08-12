import { PortableText, type PortableTextBlock } from '@portabletext/react'

export function RichText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="flex flex-col gap-4 text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-foreground">
      <PortableText value={value} />
    </div>
  )
}
