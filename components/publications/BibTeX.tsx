// components/publications/BibTeX.tsx

import React, { useState } from 'react';
import { useBibContext } from '@/contexts/BibContext';
import BibTeXItem from './BibTeXItem';
import { CitationStyle } from './citationStyle';

const BibTeX: React.FC<CitationStyle> = ({ citationStyle }) => {
  const { bibTeXData } = useBibContext();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredReferences = bibTeXData
    .filter((entry) => {
      const searchInFields = (fields: string[]) =>
        fields.some((field) =>
          entry[field]
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        );

      switch (citationStyle) {
        case 'mla':
          return searchInFields([
            'author',
            'title',
            'journal',
            'booktitle',
            'publisher',
            'year',
          ]);

        case 'apa':
          return searchInFields([
            'author',
            'title',
            'publisher',
            'year',
          ]);

        case 'chicago':
          return searchInFields([
            'author',
            'title',
            'journal',
            'booktitle',
            'year',
          ]);

        case 'harvard':
          return searchInFields([
            'author',
            'title',
            'publisher',
            'year',
          ]);

        case 'vancouver':
          return searchInFields([
            'author',
            'title',
            'journal',
            'booktitle',
            'year',
            'volume',
            'number',
            'pages',
          ]);

        default:
          return true;
      }
    })
    .sort(
      (a, b) =>
        Number(b.year || 0) - Number(a.year || 0)
    );

  return (
    <div className="_p-4">
      <div className="_mb-8">
        <h1 className="_text-3xl _font-semibold _text-gray-800 dark:_text-gray-100">
          Publications
        </h1>

        <p className="_mt-3 _max-w-3xl _text-gray-600 dark:_text-gray-300">
          Peer-reviewed publications across artificial intelligence, health, environmental and population research, transportation, and complex systems.
        </p>

        <a
          href="https://scholar.google.ca/citations?user=PiIspqkAAAAJ&hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="_mt-3 _inline-block _text-sm _font-medium _text-blue-700 hover:_underline dark:_text-blue-400"
        >
          Google Scholar profile →
        </a>
      </div>

      <input
        type="text"
        placeholder="Search publications..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="_block _w-full _appearance-none _rounded-lg _px-3 _py-2 _transition-colors
        _text-base _leading-tight md:_text-sm
        _bg-black/[.05] dark:_bg-gray-50/10
        focus:_bg-white dark:focus:_bg-dark
        placeholder:_text-gray-500 dark:placeholder:_text-gray-400
        contrast-more:_border contrast-more:_border-current"
      />

      {filteredReferences.length > 0 ? (
        <ul className="_list-none _p-0 _mt-4">
          {filteredReferences.map((entry, index) => (
            <li
              key={index}
              className={`_mb-6 ${
                index !== filteredReferences.length - 1
                  ? '_border-b _border-gray-300'
                  : ''
              }`}
            >
              <BibTeXItem
                entry={entry}
                citationStyle={citationStyle}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="_mt-6 _text-gray-500">
          No publications found.
        </p>
      )}
    </div>
  );
};

BibTeX.defaultProps = {
  citationStyle: 'mla',
};

export default BibTeX;