import { getPagesUnderRoute } from "nextra/context";
import Link from "next/link";
import { memo } from "react";
import IconBar from './IconBar';
import { FrontMatter } from './type';
import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown

const WrapLink = ({ href, children }: { href?: string, children: ReactNode }) => {
    if (href) {
        return (<Link href={href}>
            {children}
        </Link>);
    }
    return children;
}

const MemberCard = memo(({ frontMatter, route, idx = 0, showImage = true }: { route?: string, frontMatter?: FrontMatter, idx?: number, showImage?: boolean }) => {

    const { range, current_position } = frontMatter;
    const imageSize = idx == 0 ? "w-48 h-48 mb-4" : "w-24 h-24";

    const View = (
        <>
            {(showImage) && (
                <div className={`flex-none ${imageSize} `}>
                    <WrapLink href={route}>
                        <img
                            src={frontMatter?.image}
                            className="w-full h-full rounded-full"
                            alt=""
                        />
                    </WrapLink>
                </div>
            )}

            <div >
                <WrapLink href={route}>
                    <h2 className="text-xl hover:text-2xl font-semibold">{frontMatter.title}</h2>
                </WrapLink>
                <WrapLink href={route}>
                    <p>{frontMatter.role}</p>
                </WrapLink>
                {range && (
                    <ReactMarkdown>{`${range} ${current_position}`}</ReactMarkdown>
                )}


                <div className={`mt-3 flex gap-3 ${(idx < 1) ? 'justify-center' : ''}`}>
                    {
                        IconBar.map(item => {
                            const value = frontMatter[item.field]
                            if (value) {
                                return (
                                    <Link href={value} target="_blank">
                                        {item.icon}
                                    </Link>
                                );
                            }
                            return null;
                        })
                    }
                </div>
            </div>
        </>
    );

    if (idx < 1) {
        // in team member page 
        return (
            <center>
                <div className="w-full">
                    {View}
                </div>
            </center>
        );
    }
    return (
        <li key={idx} className="flex gap-4 items-center mt-8">
            {View}
        </li>
    );
});

export default MemberCard;