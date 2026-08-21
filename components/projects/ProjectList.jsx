import React, { useEffect, useRef } from "react";

const researchAreas = [
  {
    number: "01",
    title: "Multimodal & Personalized Health",
    description:
      "AI approaches that bring together multiple sources of health data to support more personalized understanding, prediction, and care.",
    image: "/research/areas/multimodal-health.jpg",
    hoverText:
      "Multimodal Data · Personalized Health · Clinical AI",
  },
  {
    number: "02",
    title: "Responsible AI & Complex Systems",
    description:
      "AI methods designed for complex, changing, and high-stakes settings, with an emphasis on reliability, responsibility, and adaptability.",
    image: "/research/areas/responsible-ai.jpg",
    hoverText:
      "Responsible AI · Reliability · Complex Systems",
  },
  {
    number: "03",
    title: "Cancer & Computational Biomedicine",
    description:
      "Computational approaches to better understand cancer, support clinical research, and study complex biological and biomedical data.",
    image: "/research/areas/cancer-biomedicine.jpg",
    hoverText:
      "Cancer · Computational Biology · Precision Medicine",
  },
  {
    number: "04",
    title: "Mental, Cognitive & Neurodevelopmental Health",
    description:
      "AI and data-driven research focused on mental health, cognition, neurodevelopment, and related changes across the life course.",
    image: "/research/areas/mental-neuro-health.jpg",
    hoverText:
      "Mental Health · Cognition · Neurodevelopment",
  },
  {
    number: "05",
    title: "Child, Neonatal & Family Health",
    description:
      "Data-driven and personalized approaches to support research in neonatal, pediatric, and family health.",
    image: "/research/areas/child-neonatal-family.jpg",
    hoverText:
      "Neonatal Health · Pediatrics · Family Health",
  },
  {
    number: "06",
    title: "Population, Environmental & Mobility Health",
    description:
      "AI and data-driven research on environmental exposures, urban systems, transportation, traffic, mobility, population health, and their connections to health and well-being.",
    image: "/research/areas/population-environment-mobility.jpg",
    hoverText:
      "Environment · Mobility · Urban & Population Health",
  },
];

export default function ProjectList() {
  const elmRef = useRef(null);

  useEffect(() => {
    const parent =
      elmRef.current?.parentElement?.parentElement?.parentElement;

    const divCfgMargin = parent?.children?.[0];
    const firstNav = parent?.querySelector("nav");

    const divHadWidth =
      divCfgMargin?.classList.contains("_w-64");

    const navHadWidth =
      firstNav?.classList.contains("_w-64");

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

        {/* Page introduction */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            ARC Lab Research
          </h1>

          <p className="text-gray-600 mt-4 leading-7">
            ARC Lab research addresses complex questions across health
            and public systems. Our work spans clinical care, cancer,
            mental and cognitive health, child and neonatal health,
            environmental and urban health, and complex biomedical
            systems. Each project begins with a specific research
            question and brings together the data, domain knowledge,
            and computational methods needed to study it.
          </p>
        </div>

        {/* Research areas */}
        <div className="mt-14">
          <h2 className="text-2xl font-semibold text-gray-800">
            Research Areas
          </h2>

          <ul className="mt-7 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((area) => (
              <li key={area.number}>
                <article className="group">

                  {/* Image */}
                  <div
                    className="
                      relative
                      aspect-[4/3]
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-100
                      shadow-sm
                    "
                  >
                    <img
                      src={area.image}
                      alt={area.title}
                      className="
                        h-full
                        w-full
                        object-cover
                        object-center
                        transition-transform
                        duration-500
                        ease-out
                        group-hover:scale-[1.03]
                      "
                    />

                    {/* Number */}
                    <div
                      className="
                        absolute
                        left-4
                        top-4
                        rounded-full
                        bg-white/90
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-slate-600
                        shadow-sm
                        backdrop-blur-sm
                      "
                    >
                      {area.number}
                    </div>

                    {/* Hover overlay */}
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
                      "
                    >
                      <p className="text-sm font-medium leading-6">
                        {area.hoverText}
                      </p>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold leading-7 text-gray-800">
                      {area.title}
                    </h3>

                    <p className="mt-2 text-gray-600 leading-6">
                      {area.description}
                    </p>
                  </div>

                </article>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}