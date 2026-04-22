import React, { useEffect, useMemo } from 'react';
import { useBibContext } from '@/contexts/BibContext';
import Link from 'next/link'

interface CiteProps {
  cites: string;
}

const Cite: React.FC<CiteProps> = ({ cites }) => {
  const { bibTeXData, updateCitedKeys } = useBibContext();

  const keys = cites.split(',').map(x => x.trim());
  const refs = bibTeXData.filter((entry) => keys.includes(entry.key));

  useEffect(() => {
    // Generate mdxFileKey based on the current URL path
    const mdxFileKey = window.location.pathname.replace(/\//g, '_');
    if (mdxFileKey) {
      updateCitedKeys(mdxFileKey, keys)
    }
  }, []);

  return (
    <span>[
      {refs.map((x, i) =>
        (<Link key={x.key} href={`/publications/${x.key}.pdf`} target='_blank'>{x.index}{i != refs.length - 1 && ', '}</Link>))
      }
      ]
    </span>
  );
};

export default Cite;
