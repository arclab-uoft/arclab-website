import Link from "next/link";
import { memo, ReactNode } from "react";
import ReactMarkdown from "react-markdown";

import IconBar from "./IconBar";
import { FrontMatter } from "./type";

const WrapLink = ({
    href,
    children,
}: {
    href?: string;
    children: ReactNode;
}) => {
    if (href) {
        return <Link href={href}>{children}</Link>;
    }

    return <>{children}</>;
};

type ExtendedFrontMatter = FrontMatter & {
    keywords?: string;
    thumbnail?: string;
    image_position?: string;
};

const MemberCard = memo(
    ({
        frontMatter,
        route,
        idx = 0,
        showImage = true,
    }: {
        route?: string;
        frontMatter?: FrontMatter;
        idx?: number;
        showImage?: boolean;
    }) => {
        if (!frontMatter) {
            return null;
        }

        const extendedFrontMatter = frontMatter as ExtendedFrontMatter;

        const { range, current_position } = frontMatter;

        const keywords = extendedFrontMatter.keywords;

        const thumbnail =
            extendedFrontMatter.thumbnail || frontMatter.image;

        const imagePosition =
            extendedFrontMatter.image_position || "center center";

        /*
         * Individual profile page
         * Uses the original image.
         */
        if (idx < 1) {
            return (
                <div className="w-full text-center">
                    {showImage && frontMatter.image && (
                        <div className="mx-auto mb-6 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
                            <WrapLink href={route}>
                                <img
                                    src={frontMatter.image}
                                    alt={frontMatter.title || ""}
                                    style={{
                                        objectPosition: imagePosition,
                                    }}
                                    className="aspect-[4/5] w-full object-cover"
                                />
                            </WrapLink>
                        </div>
                    )}

                    <WrapLink href={route}>
                        <h2 className="text-xl font-semibold text-gray-800">
                            {frontMatter.title}
                        </h2>
                    </WrapLink>

                    <p className="mt-1 text-gray-600">
                        {frontMatter.role}
                    </p>

                    {range && (
                        <div className="mt-1 text-gray-600">
                            <ReactMarkdown>
                                {`${range} ${current_position || ""}`}
                            </ReactMarkdown>
                        </div>
                    )}

                    <div className="mt-3 flex justify-center gap-3">
                        {IconBar.map((item) => {
                            const value = frontMatter[item.field];

                            if (!value) {
                                return null;
                            }

                            return (
                                <Link
                                    key={item.field}
                                    href={value}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.icon}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            );
        }

        /*
         * Main Team page
         * Uses the manually prepared 4:3 thumbnail.
         */
        return (
            <li className="group mt-8">
                {showImage && thumbnail && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
                        <WrapLink href={route}>
                            <img
                                src={thumbnail}
                                alt={frontMatter.title || ""}
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                    object-center
                                    transition-transform
                                    duration-500
                                    ease-out
                                    group-hover:scale-[1.02]
                                "
                            />
                        </WrapLink>

                        {(frontMatter.role || keywords) && (
                            <div
                                className="
                                    absolute
                                    inset-x-0
                                    bottom-0
                                    translate-y-full
                                    bg-slate-900/85
                                    px-5
                                    py-4
                                    text-white
                                    backdrop-blur-sm
                                    transition-transform
                                    duration-300
                                    ease-out
                                    group-hover:translate-y-0
                                    group-focus-within:translate-y-0
                                "
                            >
                                {frontMatter.role && (
                                    <p className="text-sm font-semibold">
                                        {frontMatter.role}
                                    </p>
                                )}

                                {keywords && (
                                    <p className="mt-1.5 text-xs leading-5 text-slate-200">
                                        {keywords}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-4">
                    <WrapLink href={route}>
                        <h2 className="text-lg font-semibold leading-6 text-gray-800 transition-colors hover:text-slate-600">
                            {frontMatter.title}
                        </h2>
                    </WrapLink>

                    <p className="mt-1 text-sm text-gray-500">
                        {frontMatter.role}
                    </p>

                    {range && (
                        <div className="mt-1 text-sm text-gray-500">
                            <ReactMarkdown>
                                {`${range} ${current_position || ""}`}
                            </ReactMarkdown>
                        </div>
                    )}

                    <div className="mt-3 flex gap-3">
                        {IconBar.map((item) => {
                            const value = frontMatter[item.field];

                            if (!value) {
                                return null;
                            }

                            return (
                                <Link
                                    key={item.field}
                                    href={value}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.icon}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </li>
        );
    }
);

MemberCard.displayName = "MemberCard";

export default MemberCard;