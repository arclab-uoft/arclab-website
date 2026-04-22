import React, { useEffect, useState } from 'react';
import { useBibContext, BibTeXCollection } from '@/contexts/BibContext';
import BibTeXItem from './BibTeXItem'
import { CitationStyle } from './citationStyle';

const References: React.FC<CitationStyle> = ({ citationStyle }) => {
    const { bibTeXData, citedKeys } = useBibContext();
    const [citedReferences, setCitedReferences] = useState<BibTeXCollection>([]);

    useEffect(() => {
        // Generate mdxFileKey based on the current URL path
        const mdxFileKey = window.location.pathname.replace(/\//g, '_');
        if (mdxFileKey) {
            const filteredReferences = bibTeXData.filter((entry) =>
                (citedKeys[mdxFileKey] || []).includes(entry.key)
            );
            setCitedReferences(filteredReferences);
        }
    }, [bibTeXData, setCitedReferences]);

    return (
        <ul>
            {citedReferences.map((entry, index) => (
                <li key={index}
                    className={`nx-mb-6 ${index !== citedReferences.length - 1 ? 'nx-border-b nx-border-gray-300' : ''}`}>
                    <BibTeXItem entry={entry} citationStyle={citationStyle} />
                </li>
            ))}
        </ul>
    );
};

export default References;
