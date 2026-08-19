---
name: sdcd-design
description: Use this skill to generate well-branded interfaces and assets for the official websites of the Democratic Republic of the Congo (SDCD design system), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the readme.md file within this skill, and explore the other available files.
Always link `styles.css` (it imports `responsive.css`) and follow the responsive
rules in the readme: `.sdcd-grid` + `--sdcd-cols`/`-md`/`-sm` for grids,
`.sdcd-scroll-x` for tables, `.sdcd-aside` drawers under 900 px. Every screen must
work at 360 px wide with no horizontal overflow.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.