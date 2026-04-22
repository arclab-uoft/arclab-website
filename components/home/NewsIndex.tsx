import React from "react";
import { getPagesUnderRoute } from "nextra/context";
interface Page {
    name: string;
    route: string;
    children?: Page[];
    meta?: Record<string, any>;
    frontMatter?: any;
}
const NewsIndex = () => {
    const news = getPagesUnderRoute("/news");
    return (

            <section id="newsSection" className="max-w-screen-xl mx-auto px-4 py-8 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="mx-auto mb-[3px] max-w-[510px] text-center lg:mb-10">
                                <h2 className="mb-1 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px]">
                                    Our Recent News
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="-mx-4 flex flex-wrap">
                        {
                            news.map((page: Page, idx: number) => (

                                    <BlogCard
                                        Url={page.frontMatter.over_write_url ? page.frontMatter.over_write_url : page.route }
                                        date={page.frontMatter.date}
                                        CardTitle={page.frontMatter.title}
                                        CardDescription={page.frontMatter.short_story}
                                        image={page.frontMatter.image}
                                    />


                            ))
                        }
                    </div>
                </div>
            </section>

    );
};

export default NewsIndex;

const BlogCard = ({ image, date, CardTitle, CardDescription , Url }) => {
    return (
        <>
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div className="mb-10 w-full">
                    <div className="mb-8 overflow-hidden rounded">
                        <img src={image} alt="" className="w-full" />
                    </div>
                    <div>
                        {date && (
                            <span className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
                {date}
              </span>
                        )}
                        <h3>
                            <a
                                href={Url}
                                className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
                            >
                                {CardTitle}
                            </a>
                        </h3>
                        <p className="text-base text-body-color dark:text-dark-6">
                            {CardDescription}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
