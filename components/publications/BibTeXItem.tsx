// components/BibTeX.tsx
import React from 'react';
import Link from 'next/link'
import { BibTeXEntry } from '@/contexts/BibContext';
import { Button } from 'nextra/components'
import { CitationStyle } from './citationStyle';
import { getAuthors } from './author';
//
// NOTE: IN THIS VERSION ONLY mla STYLE IMPLEMENTED
//
interface BibTeXItemProps {
    entry: BibTeXEntry;
    citationStyle: CitationStyle['citationStyle'];
}

// Latex accent (google scholar)
const accentMap = {
    "\\c{E}": "Ȩ",
    "\\'O": "Ó",
    "\\=u": "ū",
    "\\~N": "Ñ",
    "\\=e": "ē",
    "\\c{e}": "ȩ",
    "\\'o": "ó",
    "\\=U": "Ū",
    "\\~n": "ñ",
    "\\=E": "Ē",
    "\\.E": "Ė",
    "\\\"i": "ï",
    "\\~u": "ũ",
    "\\v{C}": "Č",
    "\\\"y": "ÿ",
    "\\^U": "Û",
    "\\.e": "ė",
    "\\\"I": "Ï",
    "\\v{s}": "š",
    "\\~U": "Ũ",
    "\\^E": "Ê",
    "\\\"Y": "Ÿ",
    "\\^u": "û",
    "\\v{c}": "č",
    "\\v{S}": "Š",
    "\\^e": "ê",
    "\\u{u}": "ŭ",
    "\\^h": "ĥ",
    "\\'i": "í",
    "\\c{c}": "ç",
    "\\u{E}": "Ĕ",
    "\\'y": "ý",
    "\\c{S}": "Ş",
    "\\'I": "Í",
    "\\^H": "Ĥ",
    "\\u{U}": "Ŭ",
    "\\u{e}": "ĕ",
    "\\'Y": "Ý",
    "\\c{C}": "Ç",
    "\\c{s}": "ş",
    "\\v{I}": "Ǐ",
    "\\^o": "ô",
    "\\.O": "Ȯ",
    "\\c{l}": "ļ",
    "\\'n": "ń",
    "\\`A": "À",
    "\\~o": "õ",
    "\\.o": "ȯ",
    "\\'N": "Ń",
    "\\v{i}": "ǐ",
    "\\^O": "Ô",
    "\\`a": "à",
    "\\~O": "Õ",
    "\\c{L}": "Ļ",
    "\\=y": "ȳ",
    "\\'C": "Ć",
    "\\k{A}": "Ą",
    "\\'S": "Ś",
    "\\=i": "ī",
    "\\u{O}": "Ŏ",
    "\\k{a}": "ą",
    "\\v{l}": "ľ",
    "\\'c": "ć",
    "\\u{o}": "ŏ",
    "\\=Y": "Ȳ",
    "\\=I": "Ī",
    "\\'s": "ś",
    "\\v{L}": "Ľ",
    "\\^Y": "Ŷ",
    "\\\"E": "Ë",
    "\\^I": "Î",
    "{\\NG}": "Ŋ",
    "{\\ng}": "ŋ",
    "\\~I": "Ĩ",
    "\\\"U": "Ü",
    "\\^y": "ŷ",
    "\\^i": "î",
    "\\v{o}": "ǒ",
    "\\\"e": "ë",
    "\\.I": "İ",
    "\\v{O}": "Ǒ",
    "\\\"u": "ü",
    "\\~i": "ĩ",
    "\\c{g}": "ģ",
    "\\v{r}": "ř",
    "\\u{A}": "Ă",
    "\\k{o}": "ǫ",
    "{\\L}": "Ł",
    "\\v{R}": "Ř",
    "\\u{a}": "ă",
    "\\c{G}": "Ģ",
    "\\k{O}": "Ǫ",
    "\\^c": "ĉ",
    "\\.C": "Ċ",
    "\\v{e}": "ě",
    "\\\"o": "ö",
    "\\r{a}": "å",
    "\\v{U}": "Ǔ",
    "\\'r": "ŕ",
    "\\^S": "Ŝ",
    "\\v{E}": "Ě",
    "\\.c": "ċ",
    "\\r{A}": "Å",
    "\\\"O": "Ö",
    "\\^C": "Ĉ",
    "\\'R": "Ŕ",
    "\\^s": "ŝ",
    "\\v{u}": "ǔ",
    "\\k{U}": "Ų",
    "\\k{e}": "ę",
    "{\\DJ}": "Đ",
    "\\v{h}": "ȟ",
    "{\\dj}": "đ",
    "\\k{u}": "ų",
    "\\v{H}": "Ȟ",
    "\\k{E}": "Ę",
    "\\c{n}": "ņ",
    "\\H{u}": "ű",
    "\\v{k}": "ǩ",
    "\\'l": "ĺ",
    "\\\"a": "ä",
    "\\c{N}": "Ņ",
    "\\v{K}": "Ǩ",
    "\\H{U}": "Ű",
    "\\'L": "Ĺ",
    "\\\"A": "Ä",
    "\\'A": "Á",
    "{\\ss}": "ß",
    "{\\aa}": "å",
    "\\v{n}": "ň",
    "{\\AA}": "Å",
    "\\c{K}": "Ķ",
    "\\v{N}": "Ň",
    "\\'a": "á",
    "\\c{k}": "ķ",
    "\\v{a}": "ǎ",
    "\\`I": "Ì",
    "\\r{U}": "Ů",
    "\\H{o}": "ő",
    "\\^W": "Ŵ",
    "\\.g": "ġ",
    "\\c{t}": "ţ",
    "\\^G": "Ĝ",
    "{\\o}": "ø",
    "\\v{A}": "Ǎ",
    "\\`i": "ì",
    "\\^w": "ŵ",
    "\\^g": "ĝ",
    "\\r{u}": "ů",
    "\\H{O}": "Ő",
    "\\.G": "Ġ",
    "{\\O}": "Ø",
    "\\c{T}": "Ţ",
    "{\\OE}": "Œ",
    "\\=A": "Ā",
    "\\.Z": "Ż",
    "\\v{D}": "Ď",
    "\\k{I}": "Į",
    "{\\oe}": "œ",
    "\\^J": "Ĵ",
    "\\.z": "ż",
    "\\u{G}": "Ğ",
    "\\=a": "ā",
    "\\v{t}": "ť",
    "\\k{i}": "į",
    "\\^j": "ĵ",
    "\\v{d}": "ď",
    "\\v{T}": "Ť",
    "\\u{g}": "ğ",
    "\\^a": "â",
    "\\c{r}": "ŗ",
    "{\\i}": "ı",
    "\\v{G}": "Ǧ",
    "{\\ETH}": "Ð",
    "\\.A": "Ȧ",
    "\\`O": "Ò",
    "\\~a": "ã",
    "{\\eth}": "ð",
    "\\.a": "ȧ",
    "\\^A": "Â",
    "{\\I}": "ł",
    "\\c{R}": "Ŗ",
    "\\v{g}": "ǧ",
    "\\`o": "ò",
    "\\~A": "Ã",
    "\\=o": "ō",
    "\\'U": "Ú",
    "{\\AE}": "Æ",
    "{\\ae}": "æ",
    "{\\dh}": "ð",
    "\\u{i}": "ĭ",
    "\\v{Z}": "Ž",
    "\\'e": "é",
    "\\=O": "Ō",
    "\\'u": "ú",
    "{\\TH}": "Þ",
    "\\u{I}": "Ĭ",
    "\\v{z}": "ž",
    "\\'E": "É",
    "{\\DH}": "Ð",
    "{\\th}": "þ",
    "\\'Z": "Ź",
    "\\`e": "è",
    "\\`U": "Ù",
    "\\'z": "ź",
    "\\`E": "È",
    "\\`u": "ù",
    "\\textregistered": "®",
    "\\`y": "ý"
};

function convertLatexToUnicode(text) {
    const regex = /{(\\(?:[^{}]|{[^{}]*})*)}/g;
    return text?.replace(regex, (_, group) => accentMap[group]);
}


const BibTeXItem: React.FC<BibTeXItemProps> = ({ entry, citationStyle }) => {
    const searchGoogleScholar = (title: string) => {
        const googleScholarUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(title)}`;
        window.open(googleScholarUrl, '_blank');
    };
    const renderReference = (): React.ReactNode => {
        let {
            author,
            journal,
            booktitle,
            publisher,
            year,
            volume,
            number,
            pages,
        } = entry;

        const volumePart = volume ? `${volume}` : '';
        const numberPart = number ? `${number.replace('--', '—')}` : '';
        const pagesPart = pages ? `${pages.replace('--', '-')}` : '';

        author = getAuthors(convertLatexToUnicode(author));
        const titleLink = <Link href={`/publications/${entry.key}.pdf`} target='_blank'>{convertLatexToUnicode(entry.title)}</Link>;

        const journalOrBooktitle = convertLatexToUnicode(journal || booktitle);

        if (publisher) {
            publisher = convertLatexToUnicode(publisher);
        }

        switch (citationStyle) {
            case 'mla':

                return (
                    <>
                        {`${author}. "`}
                        {titleLink}
                        {`." `}
                        <i>{journalOrBooktitle}</i>
                        {entry.organization ?
                            (`, ${convertLatexToUnicode(entry.organization)}, ${year}.`)
                            :
                            (<>
                                {volumePart && `, ${volumePart}`}
                                {numberPart && `.${numberPart}`}
                                {` (${year})`}
                                {pagesPart && `: ${pagesPart}`}
                                .
                            </>)
                        }

                    </>
                );

            case 'apa':
                return (
                    <>
                        {`${author} (${year}). ${titleLink} ${publisher}.`}
                    </>
                );

            case 'chicago':
                return (
                    <>
                        {`${author}. "${titleLink}" <i>${journalOrBooktitle}</i> ${year}.`}
                    </>
                );

            case 'harvard':
                return (
                    <>
                        {`${author} (${year}) ${titleLink}, ${publisher}.`}
                    </>
                );

            case 'vancouver':
                return (
                    <>
                        {`${author}. ${titleLink} <i>${journalOrBooktitle}</i>. ${year};${entry.volume}(${entry.number}):${entry.pages}.`}
                    </>
                );
        }
    };

    const renderActions = (): React.ReactNode => {
        return (
            <div className="_flex _mb-2 _gap-2">
                <Button className="_flex _items-center _px-2 _py-1"
                    onClick={() => searchGoogleScholar(entry.title)}>
                    <svg
                        className="invert-on-dark"
                        hanging="16" width="16"
                        viewBox="0 0 512 512">
                        <path fill="#4285F4" d="M390.9 298.5c0 0 0 .1 .1 .1c9.2 19.4 14.4 41.1 14.4 64C405.3 445.1 338.5 512 256 512s-149.3-66.9-149.3-149.3c0-22.9 5.2-44.6 14.4-64h0c1.7-3.6 3.6-7.2 5.6-10.7c4.4-7.6 9.4-14.7 15-21.3c27.4-32.6 68.5-53.3 114.4-53.3c33.6 0 64.6 11.1 89.6 29.9c9.1 6.9 17.4 14.7 24.8 23.5c5.6 6.6 10.6 13.8 15 21.3c2 3.4 3.8 7 5.5 10.5zm26.4-18.8c-30.1-58.4-91-98.4-161.3-98.4s-131.2 40-161.3 98.4L0 202.7 256 0 512 202.7l-94.7 77.1z" />
                    </svg>
                    <span className="_ml-2 _text-xs">Google Scholar</span>
                </Button>

                <Button className="_flex _items-center _px-2 _py-1"
                    onClick={() => window.open(`/publications/${entry.key}.pdf`, '_blank')}>
                    <svg className="invert-on-dark" width="16" height="16" viewBox="0 0 48 48">
                        <path fill="#e53935" d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v28	C42,40.209,40.209,42,38,42z"></path><path fill="#fff" d="M34.841,26.799c-1.692-1.757-6.314-1.041-7.42-0.911c-1.627-1.562-2.734-3.45-3.124-4.101 c0.586-1.757,0.976-3.515,1.041-5.402c0-1.627-0.651-3.385-2.473-3.385c-0.651,0-1.237,0.391-1.562,0.911 c-0.781,1.367-0.456,4.101,0.781,6.899c-0.716,2.018-1.367,3.97-3.189,7.42c-1.888,0.781-5.858,2.604-6.183,4.556 c-0.13,0.586,0.065,1.172,0.521,1.627C13.688,34.805,14.273,35,14.859,35c2.408,0,4.751-3.32,6.379-6.118 c1.367-0.456,3.515-1.107,5.663-1.497c2.538,2.213,4.751,2.538,5.923,2.538c1.562,0,2.148-0.651,2.343-1.237 C35.492,28.036,35.297,27.32,34.841,26.799z M33.214,27.905c-0.065,0.456-0.651,0.911-1.692,0.651 c-1.237-0.325-2.343-0.911-3.32-1.692c0.846-0.13,2.734-0.325,4.101-0.065C32.824,26.929,33.344,27.254,33.214,27.905z M22.344,14.497c0.13-0.195,0.325-0.325,0.521-0.325c0.586,0,0.716,0.716,0.716,1.302c-0.065,1.367-0.325,2.734-0.781,4.036 C21.824,16.905,22.019,15.083,22.344,14.497z M22.214,27.124c0.521-1.041,1.237-2.864,1.497-3.645 c0.586,0.976,1.562,2.148,2.083,2.669C25.794,26.213,23.776,26.604,22.214,27.124z M18.374,29.728 c-1.497,2.473-3.059,4.036-3.905,4.036c-0.13,0-0.26-0.065-0.391-0.13c-0.195-0.13-0.26-0.325-0.195-0.586 C14.078,32.136,15.77,30.899,18.374,29.728z"></path>
                    </svg>
                    <span className="_ml-2 _text-xs">Pdf</span>
                </Button>
            </div>
        );
    }

    return (
        <div className="_flex _my-2">
            {/* <span className="_mr-2">[{entry.index}]</span> */}
            <img src={`/publications/${entry.key}.png`} className='w-48 mr-4 hidden md:block'/>
            <div>
                <p className="_mb-2">{renderReference()}</p>
                {renderActions()}
            </div>
        </div>
    );
};

BibTeXItem.defaultProps = {
    citationStyle: 'mla',
};
export default BibTeXItem;