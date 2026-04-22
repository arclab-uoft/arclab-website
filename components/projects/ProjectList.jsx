import React, { useState, useEffect, useRef } from "react";
import { getPagesUnderRoute } from "nextra/context";
// import Link from "next/link";

export default () => {
  const [projects, setProjects] = useState([]);
  const elmRef = useRef(null);
  
  useEffect(() => {
    const projects = getPagesUnderRoute("/projects");
    projects.sort((a, b) => {
      return (
        new Date(a.frontMatter?.date).getTime() -
        new Date(b.frontMatter?.date).getTime()
      );
    });
    // console.log(teamsByCategoryMap)
    setProjects(projects);

    // TODO: Temp trick until update will publish in the Nextra
    const parent = elmRef.current?.parentElement?.parentElement?.parentElement;
    // const parentDiv = parent?.parentElement;
    const divCfgMargin = parent?.children[0];

    const firstNav = parent.querySelector('nav');

    // if (parentDiv) {
    //     parentDiv.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 1920 1080'%3E%3Cpath d='m1018.6 26.554c58.644 61.582 175.93 149.72 270.17 197.74 94.238 48.023 165.42 55.932 233.22 44.632 67.797-11.3 132.2-41.808 179.1-26.553 46.893 15.255 76.271 76.271 97.175 149.15 20.904 72.882 33.333 157.63 16.949 255.93-16.385 98.306-61.582 210.17-98.87 284.52-37.288 74.351-66.666 111.19-90.395 129.6s-41.808 18.418 8.1369 18.418h248.13c80.226 0 122.71 0 122.71-180s-42.485-540-54.35-726.78c-11.864-186.78 6.8925-200.34-153.11-217.85s-498.75-38.983-668.13-32.203-169.38 41.808-110.73 103.39z' fill='%2E7E8E5' fill-opacity='0.025' /%3E%3C/svg%3E")`;
    // }
    
    divCfgMargin?.classList.remove('_w-64');
    firstNav?.classList.remove('_w-64');
    return () => {
        // if (parentDiv) {
        //     parentDiv.style.backgroundImage = ''
        // }
        divCfgMargin?.classList.add('_w-64');
        firstNav?.classList.add('_w-64');
    }

  }, []);

  return (
    <section className="py-4" ref={elmRef}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto sm:text-center">
          <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            HIVE Lab Research Themes
          </h3>
          <p className="text-gray-600 mt-3">Explore our core themes, which showcase the scope of our AI research initiatives. As each project progresses, we will provide updates with detailed insights and demonstrations, and we look forward to your thoughts and feedback.</p>
        </div>
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {projects.map((page, idx) => (
              <li key={idx}>
                <div className="w-full h-60 sm:h-52 md:h-56">
                  <img
                    src={page.frontMatter?.image}
                    className="w-full h-full object-cover object-center shadow-md rounded-xl"
                    alt=""
                  />
                </div>
                <div className="mt-4">
                  <h4 className="text-xl text-gray-700 font-semibold">
                    {page.frontMatter?.title}
                  </h4>
                  {/* <Link href={page.route}>
                    <p className="text-[#35538E]">{page.frontMatter?.story}</p>
                  </Link> */}
                   <p className="text-slate-400">{page.frontMatter?.story}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
