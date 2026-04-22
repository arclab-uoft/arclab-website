import { CitationStyle } from './citationStyle';

type Authors = string[];

type Formatter = (authors: Authors) => string;

const formatMLA: Formatter = (authors) => {
  if (authors.length > 2) {
    return `${authors[0]}, et al`;
  } else if (authors.length == 2) {
    return `${authors[0]}, and ${authors[1]}`;
  }
  return authors[0];
};

const formatAPA: Formatter = (authors) => {
  return authors.map((author, index) => {
    const names = author.split(', ');
    const lastName = names[0];
    const initials = names[1].split(' ').map(name => name[0]).join('. ');
    return `${authors.length - 1 === index ? '& ' : ''}${lastName}, ${initials}`;
  }).join(', ');
};

const formatChicago: Formatter = (authors) => {
  return authors.map((author, index) => {
    const names = author.split(', ');
    const lastName = names[0];
    const firstName = names[1];
    if (index == 0) return `${lastName} ${firstName}`;
    return `${firstName} ${lastName}`;
  }).join(', ');
};

const formatHarvard: Formatter = (authors) => {
  return authors.map((author, index) => {
    const names = author.split(', ');
    const lastName = names[0];
    const initials = names[1].split(' ').map(name => name[0]).join('. ');
    return `${authors.length - 1 === index ? 'and ' : ''}${lastName}, ${initials}`;
  }).join(', ');
};

const formatVancouver: Formatter = (authors) => {
  return authors.map((author) => {
    const names = author.split(', ');
    const lastName = names[0];
    const initials = names[1].split(' ').map((name) => name[0]).join('');
    return `${lastName} ${initials}`;
  }).join(', ');
};

const formatAuthors = (authorStr: string, formatter: Formatter): string => {
  const authors = authorStr.split(' and ');
  return formatter(authors);
};

export const getAuthors = (authorStr: string, citationStyle: CitationStyle = { citationStyle: 'mla' }): string => {
  switch (citationStyle.citationStyle.toLowerCase()) {
    case 'mla':
      return formatAuthors(authorStr, formatMLA);
    case 'apa':
      return formatAuthors(authorStr, formatAPA);
    case 'chicago':
      return formatAuthors(authorStr, formatChicago);
    case 'harvard':
      return formatAuthors(authorStr, formatHarvard);
    case 'vancouver':
      return formatAuthors(authorStr, formatVancouver);
    default:
      return formatAuthors(authorStr, formatMLA);
  }
};

