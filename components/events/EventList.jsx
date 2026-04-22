import React, { useState, useEffect, useRef } from "react";
import { getPagesUnderRoute } from "nextra/context";
import Link from "next/link";

export default () => {
  const [events, setEvents] = useState([]);
  const elmRef = useRef(null);

  useEffect(() => {
    const events = getPagesUnderRoute("/events");
    events.sort((a, b) => {
      return (
        new Date(b.frontMatter?.date).getTime() -
        new Date(a.frontMatter?.date).getTime()
      );
    });
    // console.log(teamsByCategoryMap)
    setEvents(events);

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
            HIVE Lab Events & Showcases
          </h3>
          <p className="text-gray-600 mt-3">Explore our events that bridge researchers, clinicians, and technologists to build intelligent, equitable health solutions.</p>
        </div>
          <div className="mt-12 space-y-10">
            {events.map((page, idx) => (
              <Link href={page.route} key={idx}>
                <div className="flex flex-col md:flex-row  my-6 items-center gap-8 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
                  {/* Image */}
                  <div className="flex-shrink-0 w-full md:w-1/2 h-60 md:h-64">
                    <img
                      src={page.frontMatter?.image}
                      alt={page.frontMatter?.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col justify-center md:w-1/2 text-gray-700">
                    <h4 className="text-2xl font-bold text-gray-800 mb-2">
                      {page.frontMatter?.title}
                    </h4>
                    <p className="text-[#35538E] text-lg leading-relaxed">
                      {page.frontMatter?.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
      </div>
    </section>
  );
};

