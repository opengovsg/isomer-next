import type { IsomerComponent, IsomerPageSchema } from "~/engine"
import HomepageLayout from "./Homepage"
import ContentLayout from "./Content"
import CollectionLayout from "./Collection"
import {
  Accordion,
  Button,
  Callout,
  CollectionCard,
  Footer,
  Heading,
  Hero,
  Image,
  InfoCards,
  InfoCols,
  Infobar,
  Infopic,
  KeyStatistics,
  Masthead,
  MetaHead,
  Navbar,
  OrderedList,
  Paragraph,
  UnorderedList,
} from "../components"

interface RenderComponentProps {
  component: IsomerComponent
  LinkComponent?: any // Next.js link
}

export const renderComponent = ({
  component,
  LinkComponent,
}: RenderComponentProps) => {
  switch (component.type) {
    case "accordion":
      return <Accordion {...component} />
    case "button":
      return <Button {...component} LinkComponent={LinkComponent} />
    case "callout":
      return <Callout {...component} />
    case "collectionCard":
      return <CollectionCard {...component} LinkComponent={LinkComponent} />
    case "footer":
      return <Footer {...component} LinkComponent={LinkComponent} />
    case "heading":
      return <Heading {...component} />
    case "hero":
      return <Hero {...component} />
    case "image":
      return <Image {...component} />
    case "infobar":
      return <Infobar {...component} />
    case "infocards":
      return <InfoCards {...component} />
    case "infocols":
      return <InfoCols {...component} LinkComponent={LinkComponent} />
    case "infopic":
      return <Infopic {...component} />
    case "keystatistics":
      return <KeyStatistics {...component} />
    case "masthead":
      return <Masthead {...component} />
    case "metahead":
      return <MetaHead {...component} />
    case "navbar":
      return <Navbar {...component} LinkComponent={LinkComponent} />
    case "orderedlist":
      return <OrderedList {...component} />
    case "paragraph":
      return <Paragraph {...component} />
    case "unorderedlist":
      return <UnorderedList {...component} />
  }
}

export const renderLayout = (props: IsomerPageSchema) => {
  switch (props.layout) {
    case "homepage":
      return <HomepageLayout {...props} />
    case "content":
      return <ContentLayout {...props} />
    case "collection":
      return <CollectionLayout {...props} />
  }
}
