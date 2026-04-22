import React from 'react';

const Address = ({ children }) => {
    const { children: elms = [] } = children?.props || {};

    const lines = elms.map(x => {
        if (x.$$typeof === undefined) {
            return x.split('\n').map((line, index) => (<p key={index}>{line}</p>));
        }
        return x;
    });

    return (<div className='pt-4'>
        {lines}
    </div>
    );
};

export default Address;
