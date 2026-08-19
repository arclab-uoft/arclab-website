import { getPagesUnderRoute } from "nextra/context";
import { memo, useEffect, useRef, useState } from "react";
import MemberCard from "./MemberCard";

export default memo(() => {
    const backgroundImageRef = useRef(null);
    const [teams, setTeams] = useState({});

    useEffect(() => {
        const teams = getPagesUnderRoute("/team");
        const teamsByCategoryMap = {};

        teams.forEach((member) => {
            const category = member.frontMatter?.category || "";
            const key = category.split("_") || [];

            if (key.length < 2) {
                if (key.length < 1) {
                    key[0] = "-";
                } else {
                    key[1] = 0;
                }
            }

            const categoryKey = key[0];
            const categoryValue = key[1];

            if (!teamsByCategoryMap[categoryKey]) {
                teamsByCategoryMap[categoryKey] = [];
            }

            teamsByCategoryMap[categoryKey].push({
                member,
                value: parseInt(categoryValue),
            });
        });

        for (const category in teamsByCategoryMap) {
            teamsByCategoryMap[category].sort((a, b) => {
                if (a.value !== b.value) {
                    return a.value - b.value;
                } else {
                    if (a.member?.frontMatter?.range) {
                        return (
                            new Date(b.member?.frontMatter?.date).getTime() -
                            new Date(a.member?.frontMatter?.date).getTime()
                        );
                    }

                    return (
                        new Date(a.member?.frontMatter?.date).getTime() -
                        new Date(b.member?.frontMatter?.date).getTime()
                    );
                }
            });

            teamsByCategoryMap[category] = teamsByCategoryMap[category].map(
                (item) => item.member
            );
        }

        setTeams(teamsByCategoryMap);

        const parent =
            backgroundImageRef.current?.parentElement?.parentElement?.parentElement;
        const parentDiv = parent?.parentElement;
        const divCfgMargin = parent?.children[0];

        if (parentDiv) {
            parentDiv.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 1920 1080'%3E%3Cpath d='m1018.6 26.554c58.644 61.582 175.93 149.72 270.17 197.74 94.238 48.023 165.42 55.932 233.22 44.632 67.797-11.3 132.2-41.808 179.1-26.553 46.893 15.255 76.271 76.271 97.175 149.15 20.904 72.882 33.333 157.63 16.949 255.93-16.385 98.306-61.582 210.17-98.87 284.52-37.288 74.351-66.666 111.19-90.395 129.6s-41.808 18.418 8.1369 18.418h248.13c80.226 0 122.71 0 122.71-180s-42.485-540-54.35-726.78c-11.864-186.78 6.8925-200.34-153.11-217.85s-498.75-38.983-668.13-32.203-169.38 41.808-110.73 103.39z' fill='%2E7E8E5' fill-opacity='0.025' /%3E%3C/svg%3E")`;
        }

        const firstNav = parent?.querySelector("nav");

        divCfgMargin?.classList.remove("_w-64");
        firstNav?.classList.remove("_w-64");

        return () => {
            if (parentDiv) {
                parentDiv.style.backgroundImage = "";
            }

            divCfgMargin?.classList.add("_w-64");
            firstNav?.classList.add("_w-64");
        };
    }, []);

    return (
        <div ref={backgroundImageRef}>
            <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-8">
                <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
                    <div className="px-4 space-y-3 mt-6 sm:px-0 md:mt-0">
                        <h3 className="text-3xl font-semibold sm:text-4xl">
                            Our Team at ARC Lab
                        </h3>

                        <p className="mt-3">
                                We are a multidisciplinary team at ARC Lab using AI for health. We focus on multimodal methods, multi-source data, and cross-field collaboration to study real-world health problems.

                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    {Object.keys(teams)
                        .sort()
			.filter((category, index) => index < 3)
                        .map((category, index) => (
                            <div key={category}>
                                {index > 0 && (
                                    <>
                                        <h3 className="text-2xl mt-4 font-semibold">
                                            {index === 1 ? "Research Team" : "Alumni"}
                                        </h3>
                                        <hr />
                                    </>
                                )}

                                <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 items-start">
                                    {teams[category].map((page, idx) => (
                                        <MemberCard
                                            key={idx}
                                            frontMatter={page?.frontMatter}
                                            route={page?.route}
                                            idx={idx + 1}
                                            showImage={page?.frontMatter?.range ? false : true}
                                        />
                                    ))}
                                </ul>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
});