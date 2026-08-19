import React from 'react';
import { BibTeXEntry } from '@/contexts/BibContext';
import { Button } from 'nextra/components';
import { CitationStyle } from './citationStyle';

interface BibTeXItemProps {
  entry: BibTeXEntry;
  citationStyle: CitationStyle['citationStyle'];
}

type ExtendedBibTeXEntry = BibTeXEntry & {
  doi?: string;
  url?: string;
  note?: string;
};

const cleanText = (text?: string) => {
  if (!text) return '';

  return text
    .replace(/[{}]/g, '')
    .replace(/\\&/g, '&')
    .trim();
};

const formatAuthorName = (name: string) => {
  const trimmed = cleanText(name.trim());

  if (trimmed.includes(',')) {
    const parts = trimmed.split(',');
    const lastName = parts[0].trim();
    const firstName = parts.slice(1).join(',').trim();

    return `${firstName} ${lastName}`.trim();
  }

  return trimmed;
};

const renderAuthors = (authorString?: string) => {
  if (!authorString) return null;

  const authors = authorString
    .split(/\s+and\s+/)
    .map(formatAuthorName)
    .filter(Boolean);

  return authors.map((author, index) => {
    const isMohammadNoaeen =
      author.toLowerCase() === 'mohammad noaeen';

    return (
      <React.Fragment key={`${author}-${index}`}>
        {isMohammadNoaeen ? (
          <strong className="_font-semibold _text-gray-800 dark:_text-gray-100">
            {author}
          </strong>
        ) : (
          <span>{author}</span>
        )}

        {index < authors.length - 1 && ', '}
      </React.Fragment>
    );
  });
};

const BibTeXItem: React.FC<BibTeXItemProps> = ({ entry }) => {
  const item = entry as ExtendedBibTeXEntry;

  const venue = cleanText(
    entry.journal ||
    entry.booktitle ||
    entry.publisher ||
    ''
  );

  const publisherUrl =
    item.url ||
    (item.doi ? `https://doi.org/${item.doi}` : '');

  const scholarUrl =
    `https://scholar.google.com/scholar?q=${encodeURIComponent(
      cleanText(entry.title)
    )}`;

  return (
    <article className="_py-3">
      <h3 className="_text-base _font-semibold _leading-6 _text-gray-800 dark:_text-gray-100">
        {publisherUrl ? (
          <a
            href={publisherUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:_underline"
          >
            {cleanText(entry.title)}
          </a>
        ) : (
          cleanText(entry.title)
        )}
      </h3>

      <p className="_mt-1 _text-sm _leading-6 _text-gray-600 dark:_text-gray-300">
        {renderAuthors(entry.author)}
      </p>

      <div className="_mt-1 _flex _flex-wrap _items-center _gap-x-2 _gap-y-1 _text-sm _text-gray-500 dark:_text-gray-400">
        {venue && (
          <span className="_italic">
            {venue}
          </span>
        )}

        {entry.volume && (
          <span>
            {entry.volume}
            {entry.number ? `(${entry.number})` : ''}
          </span>
        )}

        {entry.pages && (
          <span>
            {cleanText(entry.pages).replace('--', '–')}
          </span>
        )}

        {entry.year && <span>{entry.year}</span>}

        {item.note && (
          <span className="_rounded-full _border _border-gray-300 _px-2 _py-0.5 _text-xs _font-medium _text-gray-600 dark:_border-gray-600 dark:_text-gray-300">
            {cleanText(item.note)}
          </span>
        )}
      </div>

      <div className="_mt-3 _flex _gap-2">
        {publisherUrl && (
          <Button
            className="_px-2 _py-1 _text-xs"
            onClick={() =>
              window.open(
                publisherUrl,
                '_blank',
                'noopener,noreferrer'
              )
            }
          >
            Publisher
          </Button>
        )}

        <Button
          className="_px-2 _py-1 _text-xs"
          onClick={() =>
            window.open(
              scholarUrl,
              '_blank',
              'noopener,noreferrer'
            )
          }
        >
          Google Scholar
        </Button>
      </div>
    </article>
  );
};

BibTeXItem.defaultProps = {
  citationStyle: 'mla',
};

export default BibTeXItem;