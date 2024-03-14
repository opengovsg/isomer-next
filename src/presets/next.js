/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        subtitle: "#344054",
        paragraph: "#344054",
        dark: "#6d58bb",
        prose: "#484848",
        headings: "#6d58bb",
        header: "#2164da",
        subtleLink: "#767676",
        navItems: "#323232",
        border: {
          light: "#d6d6d6",
        },
        canvas: {
          base: "#ffffff",
          inverse: "#000000",
          translucentGrey: "#00000080",
          dark: "#2B2313",
        },
        content: {
          default: "#333333",
          strong: "#2c2e34",
          medium: "#5d5d5d",
          inverse: "#ffffff",
        },
        interaction: {
          hover: "#f9f9f9",
          linkDefault: "#4372d6",
          linkHover: "#3a79ff",
        },
        stroke: {
          default: "#d0d5dd",
        },
      },
      screens: {
        xs: "576px",
      },
      typography: ({ theme }) => ({
        isomer: {
          css: {
            "--tw-prose-body": theme("colors.prose"),
            "--tw-prose-headings": theme("colors.headings"),
            "--tw-prose-bullets": theme("colors.prose"),
            "--tw-prose-links": theme("colors.site.secondary"),
          },
        },
      }),
    },
  },
}
