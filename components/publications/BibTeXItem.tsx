import React from 'react';
import { BibTeXEntry } from '@/contexts/BibContext';
import { CitationStyle } from './citationStyle';

interface BibTeXItemProps {
  entry: BibTeXEntry;
  citationStyle: CitationStyle['citationStyle'];
}

type ExtendedBibTeXEntry = BibTeXEntry & {
  doi?: string;
  url?: string;
  note?: string;
  pdf?: string;
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

  const pdfUrl = item.pdf
    ? item.pdf.startsWith('http://') ||
      item.pdf.startsWith('https://') ||
      item.pdf.startsWith('/')
      ? item.pdf
      : `/publications/${item.pdf}`
    : '';

  const scholarUrl =
    `https://scholar.google.com/scholar?q=${encodeURIComponent(
      cleanText(entry.title)
    )}`;

  const metadata = [
    venue,
    entry.volume
      ? `${entry.volume}${entry.number ? `(${entry.number})` : ''}`
      : '',
    entry.pages
      ? cleanText(entry.pages).replace('--', '–')
      : '',
    entry.year || '',
  ].filter(Boolean);

  const buttonClass =
    '_inline-flex _items-center _gap-1.5 _rounded-md _border _border-gray-300 ' +
    '_bg-white _px-2.5 _py-1.5 _text-xs _font-medium _text-gray-700 ' +
    '_transition-colors hover:_bg-gray-50 hover:_border-gray-400 ' +
    'dark:_border-gray-600 dark:_bg-transparent dark:_text-gray-300 ' +
    'dark:hover:_bg-gray-800';

  return (
    <article className="_py-4">
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

      <div className="_mt-1 _flex _flex-wrap _items-center _gap-x-1.5 _gap-y-1 _text-sm _text-gray-500 dark:_text-gray-400">
        {metadata.map((part, index) => (
          <React.Fragment key={`${part}-${index}`}>
            {index > 0 && (
              <span className="_text-gray-300 dark:_text-gray-600">
                ·
              </span>
            )}

            <span className={index === 0 ? '_italic' : ''}>
              {part}
            </span>
          </React.Fragment>
        ))}

        {item.note && (
          <span className="_ml-1 _rounded-full _border _border-gray-300 _px-2 _py-0.5 _text-xs _font-medium _text-gray-600 dark:_border-gray-600 dark:_text-gray-300">
            {cleanText(item.note)}
          </span>
        )}
      </div>

      <div className="_mt-3 _flex _flex-wrap _gap-2">
        {publisherUrl && (
          <a
            href={publisherUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 3h7v7" />
              <path d="M10 14L21 3" />
              <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
            </svg>

            Publication page
          </a>
        )}

        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M8 15h8" />
              <path d="M8 18h5" />
            </svg>

            PDF
          </a>
        )}

        <a
          href={scholarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 512 512"
          >
            <path
              fill="#4285F4"
              d="M256 0 0 202.7l96.7 78.7C126.8 222.9 187.7 183 258 183c69.9 0 130.6 39.6 160.8 97.6L512 202.7 256 0z"
            />
            <path
              fill="#4285F4"
              d="M405.3 362.7C405.3 445.1 338.5 512 256 512s-149.3-66.9-149.3-149.3S173.5 213.3 256 213.3s149.3 66.9 149.3 149.4z"
            />
          </svg>

          Google Scholar
        </a>
      </div>
    </article>
  );
};

BibTeXItem.defaultProps = {
  citationStyle: 'mla',
};

export default BibTeXItem;