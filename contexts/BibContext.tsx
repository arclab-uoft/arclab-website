import React, { createContext, useContext, useEffect, useState } from 'react';
import { parse } from 'bibtex-parse';

export type BibTeXEntry = {
    index: number;
    name?: string;
    key?: string;
    type?: string;
    title?: string;
    author?: string;
    editor?: string;
    journal?: string;
    booktitle?: string;
    publisher?: string;
    organization?: string;
    institution?: string;
    school?: string;
    year?: string;
    month?: string;
    volume?: string;
    number?: string;
    pages?: string;
    chapter?: string;
    series?: string;
    address?: string;
    edition?: string;
    note?: string;
    doi?: string;
    url?: string;
    isbn?: string;
    keywords?: string[];
    abstract?: string;
};

export type BibTeXCollection = Array<BibTeXEntry>;

type BibTeXContextType = {
    bibTeXData: BibTeXCollection;
    citedKeys: { [key: string]: string[] };
    updateCitedKeys: (key: string, cites: string[]) => void;
};

const BibContext = createContext<BibTeXContextType | undefined>(undefined);

interface BibProviderProps {
    children: React.ReactNode;
}

export const BibProvider: React.FC<BibProviderProps> = ({ children }) => {
    const [bibTeXData, setBibTeXData] = useState<BibTeXCollection>([]);
    const [citedKeys, setCitedKeys] = useState<{ [key: string]: string[] }>({});

    useEffect(() => {
        const fetchBibTeXData = async () => {
            try {
                const response = await fetch('/publications/BibTeX.bib');
                const content = await response.text();
                const parsedBibTeX = parse(content);
                const references = parsedBibTeX.filter((x) => x.itemtype === 'entry' && !x.comment);
                const res = references.map((x, i) => ({
                    index: i + 1,
                    key: x.key,
                    type: x.type,
                    ...Object.fromEntries(x.fields?.map((f) => [f.name, f.value])),
                }));
                setBibTeXData(res);
            } catch (error) {
                console.error('Error fetching BibTeX content:', error);
            }
        };

        fetchBibTeXData();
    }, []);

    const updateCitedKeys = (key: string, cites: string[]) => {
        setCitedKeys((prevCitedKeys) => {
            return {
                ...prevCitedKeys,
                [key]: Array.from(new Set([...(prevCitedKeys[key] || []), ...cites])),
            };
        });
    }
    const contextValue: BibTeXContextType = { bibTeXData, citedKeys, updateCitedKeys };

    return <BibContext.Provider value={contextValue}>{children}</BibContext.Provider>;
};

export const useBibContext = () => {
    const context = useContext(BibContext);
    if (!context) {
        throw new Error('useBibContext must be used within a BibProvider');
    }
    return context;
};
