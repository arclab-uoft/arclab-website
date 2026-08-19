import React, { useEffect, useRef } from "react";

const researchAreas = [
  {
    number: "01",
    title: "Multimodal & Personalized Health",
    description:
      "AI approaches that bring together multiple sources of health data to support more personalized understanding, prediction, and care.",
  },
  {
    number: "02",
    title: "Responsible AI & Complex Systems",
    description:
      "AI methods designed for complex, changing, and high-stakes settings, with an emphasis on reliability, responsibility, and adaptability.",
  },
  {
    number: "03",
    title: "Cancer & Computational Biomedicine",
    description:
      "Computational approaches to better understand cancer, support clinical research, and study complex biological and biomedical data.",
  },
  {
    number: "04",
    title: "Mental, Cognitive & Neurodevelopmental Health",
    description:
      "AI and data-driven research focused on mental health, cognition, neurodevelopment, and related changes across the life course.",
  },
  {
    number: "05",
    title: "Child, Neonatal & Family Health",
    description:
      "Data-driven and personalized approaches to support research in neonatal, pediatric, and family health.",
  },
  {
    number: "06",
    title: "Population, Environmental & Mobility Health",
    description:
      "AI and data-driven research on environmental exposures, urban systems, transportation, traffic, mobility, population health, and their connections to health and well-being.",
  },
];

export default function ProjectList() {
  const elmRef = useRef(null);

  useEffect(() => {
    const parent =
      elmRef.current?.parentElement?.parentElement?.parentElement;

    const divCfgMargin = parent?.children?.[0];
    const firstNav = parent?.querySelector("nav");

    const divHadWidth = divCfgMargin?.classList.contains("_w-64");
    const navHadWidth = firstNav?.classList.contains("_w-64");

    divCfgMargin?.classList.remove("_w-64");
    firstNav?.classList.remove("_w-64");

    return () => {
      if (divHadWidth) {
        divCfgMargin?.classList.add("_w-64");
      }

      if (navHadWidth) {
        firstNav?.classList.add("_w-64");
      }
    };
  }, []);

  return (
    <section className="py-8" ref={elmRef}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            ARC Lab Research
          </h1>

          <p className="text-gray-600 mt-4 leading-7">
            ARC Lab research addresses complex questions across health and public
            systems. Our work spans clinical care, cancer, mental and cognitive
            health, child and neonatal health, environmental and urban health, and
            complex biomedical systems. Each project begins with a specific research
            question and brings together the data, domain knowledge, and computational
            methods needed to study it.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-semibold text-gray-800">
            Research Areas
          </h2>

          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((area) => (
              <li key={area.number} className="h-full">
                <article className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="text-sm font-medium text-slate-400">
                    {area.number}
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-gray-800">
                    {area.title}
                  </h3>

                  <p className="mt-3 text-gray-600 leading-6">
                    {area.description}
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