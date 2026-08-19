import React, { useState, useEffect, useRef } from "react";
import { getPagesUnderRoute } from "nextra/context";

export default function ProjectList() {
  const [researchAreas, setResearchAreas] = useState([]);
  const elmRef = useRef(null);

  useEffect(() => {
    const pages = getPagesUnderRoute("/projects");

    const areas = pages
      .filter((page) => page.frontMatter?.type === "research-area")
      .sort(
        (a, b) =>
          (a.frontMatter?.order ?? 999) -
          (b.frontMatter?.order ?? 999)
      );

    setResearchAreas(areas);

    // Preserve the existing Nextra layout adjustment
    const parent =
      elmRef.current?.parentElement?.parentElement?.parentElement;

    const divCfgMargin = parent?.children[0];
    const firstNav = parent?.querySelector("nav");

    divCfgMargin?.classList.remove("_w-64");
    firstNav?.classList.remove("_w-64");

    return () => {
      divCfgMargin?.classList.add("_w-64");
      firstNav?.classList.add("_w-64");
    };
  }, []);

  return (
    <section className="py-8" ref={elmRef}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">

        <div className="max-w-4xl mx-auto sm:text-center">
          <h1 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            ARC Lab Research
          </h1>

          <p className="text-gray-600 mt-4 leading-7">
            ARC Lab projects investigate how AI can be used to answer difficult
            questions in health and public systems. Our work spans clinical
            care, cancer, mental and cognitive health, child and neonatal
            health, environmental and urban health, and complex biomedical
            systems. Each project starts from a specific problem and brings
            together the data, domain knowledge, and computational methods
            needed to study it.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-semibold text-gray-800">
            Research Areas
          </h2>

          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((page, idx) => (
              <li key={page.route || idx} className="h-full">
                <article className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-sm font-medium text-slate-400">
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-gray-800">
                    {page.frontMatter?.title}
                  </h3>

                  <p className="mt-3 text-gray-600 leading-6">
                    {page.frontMatter?.story}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}