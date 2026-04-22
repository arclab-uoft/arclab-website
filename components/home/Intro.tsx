import React, { useEffect, useState } from "react"
import Glide from "@glidejs/glide"
import { getPagesUnderRoute } from "nextra/context";
import MDXContent from "*.mdx";
import { getStaticPaths } from "next/dist/build/templates/pages";
import Logo from '../hive/Logo'
import Hive from '../hive/Hive'

export default function SliderControlsInside() {
    return (
        <section className="py-14 bg-white">
            <div className="max-w-screen-xl md:px-8">
                <div className="items-center mx-auto sm:px-4 md:px-0 lg:flex">
                    <div className="flex-1 sm:hidden lg:block">
                        <center>
                        <Logo className="w-64"/>
                        </center>
                    </div>
                    <div className="max-w-xl sm:mx-auto px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                        <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            <Hive className='w-96' />
                        </p>
                        <p className="mt-3 text-gray-600">
                            The Health Informatics, Visualization, and Equity (HIVE) Lab, established in July 2022 at the Institute of Health Policy, Management and Evaluation, Dalla Lana School of Public Health at the University of Toronto, is a collective of data scientists, epidemiologists, and software engineers. This group operates at the intersection of Machine Learning, AI, Information Visualization, and Health Informatics. We are dedicated to integrating data from diverse sources and scales, developing innovative methods and open-source tools to enhance health at both individual and population levels. Our mission includes fostering national and international collaborations to propel the pursuit of health equity.
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
}