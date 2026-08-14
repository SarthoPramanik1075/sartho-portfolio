import { PortableText, type PortableTextBlock } from '@portabletext/react'

export function RichText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="flex flex-col gap-4 text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_li]:leading-relaxed">
      <PortableText value={value} />
    </div>
  )
}
