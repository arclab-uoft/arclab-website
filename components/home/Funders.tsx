import React from "react";

const LOGOS = [
    { image: "/funders/canue.png", className: "max-h-24" },
    { image: "/funders/indian.png", className: "max-h-32" },
    { image: "/funders/singapore.svg", className: "max-h-32" },
    { image: "/funders/taiwan.svg", className: "max-h-28" },
    { image: "/funders/SickKids.svg", className: "max-h-12" },
    { image: "/funders/sunnybrook.png", className: "max-h-14" },
    { image: "/funders/mount-sinai.png", className: "max-h-20" },
    { image: "/funders/uhn.png", className: "max-h-16" },
];

export default function Supporters() {
    return (
        <div className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="max-w-xl mx-auto text-center">
                    <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        Our Collaborators
                    </h3>
                </div>

                <div className="mt-12 flex justify-center">
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-10 items-center">
                        {LOGOS.map((logo, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-center h-28 w-64"
                            >
                                <img
                                    src={logo.image}
                                    alt=""
                                    className={`${logo.className} max-w-full object-contain`}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}