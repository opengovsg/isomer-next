import { Meta, StoryFn } from "@storybook/react"
import CollectionSort from "./CollectionSort"
import { CollectionSortProps } from "~/common"
import { SortKey } from "~/common/CollectionSort"
import { useState } from "react"

export default {
  title: "Next/Components/CollectionSort",
  component: CollectionSort,
  argTypes: {},
  parameters: {
    themes: {
      themeOverride: "Isomer Next",
    },
  },
} as Meta

// Template for stories
const Template: StoryFn<CollectionSortProps> = (args) => {
  const [sortBy, setSortBy] = useState<SortKey>(args.sortBy)
  const [sortDirection, setSortDirection] = useState(args.sortDirection)
  return (
    <CollectionSort
      sortBy={sortBy}
      setSortBy={setSortBy}
      sortDirection={sortDirection}
      setSortDirection={setSortDirection}
    />
  )
}

// Default scenario
export const Default = Template.bind({})
Default.args = {
  sortBy: "date",
  sortDirection: "desc",
}