import type { InfoCardsProps } from "~/interfaces"
import Card from "../../internal/Card"
import { ComponentContent } from "../../internal/customCssClass"

const TitleSection = ({
  title,
  subtitle,
  className = "",
}: {
  title: InfoCardsProps["title"]
  subtitle: InfoCardsProps["subtitle"]
  className?: string
}) => {
  return (
    <div className={`flex max-w-3xl flex-col gap-8 self-start ${className}`}>
      <h3 className="text-heading-03 text-content-strong">{title}</h3>
      {subtitle && (
        <p className="text-sm text-content sm:text-lg">{subtitle}</p>
      )}
    </div>
  )
}

const InfoCards = ({ cards, title, subtitle, variant }: InfoCardsProps) => {
  return (
    <section>
      {variant === "side" ? (
        <div
          className={`${ComponentContent} mx-auto flex flex-col items-center gap-12 py-12 lg:flex-row lg:py-24`}
        >
          <TitleSection
            title={title}
            subtitle={subtitle}
            className="lg:max-w-60"
          />
          <div
            className={`grid grid-cols-1 gap-8 md:max-lg:hidden lg:grid-cols-3`}
          >
            {cards.map((card) => (
              <Card
                title={card.title}
                url={card.url}
                imageUrl={card.imageUrl}
                description={card.description}
                imageAlt={card.imageAlt}
                buttonLabel={card.buttonLabel}
                variant="vertical"
              />
            ))}
          </div>
          <div className={`hidden grid-cols-1 gap-8 md:max-lg:grid`}>
            {cards.map((card) => (
              <Card
                title={card.title}
                url={card.url}
                imageUrl={card.imageUrl}
                description={card.description}
                imageAlt={card.imageAlt}
                buttonLabel={card.buttonLabel}
                variant="horizontal"
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`${ComponentContent} mx-auto flex flex-col items-center gap-12 py-12 lg:py-24`}
        >
          <TitleSection title={title} subtitle={subtitle} />
          <div
            className={`grid grid-cols-1 gap-8 sm:max-lg:hidden lg:grid-cols-3`}
          >
            {cards.map((card) => (
              <Card
                title={card.title}
                url={card.url}
                imageUrl={card.imageUrl}
                description={card.description}
                imageAlt={card.imageAlt}
                buttonLabel={card.buttonLabel}
                variant="vertical"
              ></Card>
            ))}
          </div>
          <div className={`hidden grid-cols-1 gap-8 sm:max-lg:grid`}>
            {cards.map((card) => (
              <Card
                title={card.title}
                url={card.url}
                imageUrl={card.imageUrl}
                description={card.description}
                imageAlt={card.imageAlt}
                buttonLabel={card.buttonLabel}
                variant="horizontal"
              ></Card>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default InfoCards