import React, { ReactElement } from "react"
import {
  Button,
  Cards,
  Footer,
  Hero,
  InfoPic,
  Content,
  Infobar,
  Navbar,
} from "../components"
import { DefaultLayout, HomeLayout } from "../layouts"

export interface IsomerComponent {
  id: string
  sectionIdx?: number
  props: any
}

export type Sitemap = {
  [key: string]: {
    title: string
    paths: Sitemap
  }
}

export interface IsomerBaseSchema {
  id: string
  layout?: string
  title?: string
  config?: Config
  permalink?: string
  components: IsomerComponent[]
  sitemap?: Sitemap
}

export interface Config {
  navbar: IsomerBaseSchema
  footer: IsomerBaseSchema
}

const getComponent = (component: IsomerComponent): ReactElement | null => {
  if (component.id === "Button") {
    return <Button label={component.props.label} />
  }
  if (component.id === "Hero") {
    const { heroTitle, heroCaption, buttonLabel, logoUrl, nav, bgUrl } =
      component.props
    return (
      <Hero
        sectionIdx={component.sectionIdx}
        logoUrl={logoUrl}
        heroTitle={heroTitle}
        heroCaption={heroCaption}
        buttonLabel={buttonLabel}
        bgUrl={bgUrl}
      />
    )
  }
  if (component.id === "Footer") {
    const { agencyName, lastUpdated, items } = component.props
    return (
      <Footer
        sectionIdx={component.sectionIdx}
        agencyName={agencyName}
        lastUpdated={lastUpdated}
        items={items}
      />
    )
  }
  if (component.id === "Cards") {
    const { sectionTitle, sectionCaption, cards } = component.props
    return (
      <Cards
        sectionIdx={component.sectionIdx}
        sectionTitle={sectionTitle}
        sectionCaption={sectionCaption}
        cards={cards}
      />
    )
  }
  if (component.id === "InfoPic") {
    const {
      title,
      subtitle,
      description,
      alt,
      imageUrl,
      buttonLabel,
      buttonUrl,
    } = component.props
    return (
      <InfoPic
        sectionIndex={component.sectionIdx}
        title={title}
        subtitle={subtitle}
        description={description}
        alt={alt}
        imageUrl={imageUrl}
        buttonLabel={buttonLabel}
        buttonUrl={buttonUrl}
      />
    )
  }
  if (component.id === "Content") {
    const { markdown } = component.props
    return <Content markdown={markdown} />
  }
  if (component.id === "Infobar") {
    const { title, subtitle, description, buttonLabel, buttonUrl } =
      component.props
    return (
      <Infobar
        sectionIdx={component.sectionIdx}
        title={title}
        subtitle={subtitle}
        description={description}
        buttonLabel={buttonLabel}
        buttonUrl={buttonUrl}
      />
    )
  }
  if (component.id === "Navbar") {
    const { logo, links } = component.props
    return <Navbar logo={logo} links={links} />
  }
  return null
}

const renderLayout = (
  layout: string,
  config: Config,
  collatedComponents: React.ReactNode,
  permalink?: string,
  sitemap?: Sitemap,
) => {
  if (layout && config && sitemap) {
    switch (layout) {
      case "default":
        return (
          <DefaultLayout
            navbar={config.navbar}
            footer={config.footer}
            sitemap={sitemap}
            permalink={permalink}
          >
            {collatedComponents}
          </DefaultLayout>
        )
      case "home":
        return (
          <HomeLayout navbar={config.navbar} footer={config.footer}>
            {collatedComponents}
          </HomeLayout>
        )
      default:
        return collatedComponents
    }
  }
}

const RenderEngine = ({
  layout,
  permalink,
  config,
  sitemap,
  components,
}: IsomerBaseSchema): React.ReactNode => {
  if (components && components.length > 0) {
    const collatedComponents = components.map(
      (component: IsomerComponent, idx: number) => {
        return <div key={idx}>{getComponent(component)}</div>
      },
    )

    if (layout && config)
      return renderLayout(
        layout,
        config,
        collatedComponents,
        permalink,
        sitemap,
      )
    return collatedComponents
  }
}

export default RenderEngine
