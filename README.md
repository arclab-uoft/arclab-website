# Hive Lab @UofT Web Site

The Health Informatics, Visualization, and Equity (HIVE) Lab in the Institute of Health Policy, Management and Evaluation, Dalla Lana School of Public Health at the University of Toronto.

## Local Development

First, run `pnpm i` or `yarn install` or `npm install` to install the dependencies.

Then, run `pnpm dev` or `yarn run dev` to start the development server and visit `http://localhost:3000`.

## User guide 

### Add new publications

To add new publications using [Google Scholar](https://scholar.google.com/) and find their BibTeX entries, follow these steps:

1. Search for the publication on Google Scholar.
2. Locate the citation for the publication.
3. Click on the "Cite" button below the citation.
4. Select "BibTeX" as the citation format.
5. Copy the BibTeX entry provided.
6. Open the BibTeX file located at `/public/publications/BibTeX.bib`.
7. Add a new row at the appropriate location in the file, maintaining the order.
8. Paste the copied BibTeX entry into the new row.
9. Save the changes to the BibTeX file.

**Ensure that the new row is added in the correct order based on the existing entries in the file.**

## TODO

- [x] Edit Sitemap address
- [x] Complete theme.config
- [x] Add SEO tags
- [ ] Mobile friendly icons
- [ ] Dark mode support

## License

This project is licensed under the MIT License.

## Tools

Developed using open-source tools:

- [X] https://nextra.site/
- [X] https://floatui.com/components/modals
