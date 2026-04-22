import React, { useState, useEffect, useRef } from "react";
import { getPagesUnderRoute } from "nextra/context";
import { Page } from "nextra";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/fall-animation.css';
import ProjectCard from './ProjectCard';

export default () => {
    const [research, setResearch] = useState<Page[]>([]);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setResearch(getPagesUnderRoute("/projects"));

        // function getHeight() {
        //     const footer = document.querySelector("footer");
        //     const footerHeight = footer.getBoundingClientRect().height;
        //     const sliderHeight = divRef.current.getBoundingClientRect();
        //     return window.innerHeight - footerHeight - sliderHeight.y;
        // }

        // function handleResize() {
        //     if (divRef.current) {
        //         divRef.current.parentElement.style.height = `${getHeight()}px`;
        //     }
        // }

        // Set initial height
        // if (divRef.current) {
        //     // console.log('--->', window.innerHeight - footerHeight - sliderHeight.y)
        //     divRef.current.parentElement.style.height = `${getHeight()}px`;
        // }

        // window.addEventListener('resize', handleResize);

        // return () => {
        //     window.removeEventListener('resize', handleResize);
        // };
    }, []);

    //  animation="fallAnimation"
    return (
        <div className="w-full h-2/3 pt-8" ref={divRef}>
{/*             <AwesomeSlider style={{ width: "100%", height: "100%", background: "#FAFAFA" }}>
                {research?.map((page: Page, idx: number) => {
                    const { story, title, image, collaborators } = page?.frontMatter;
                    return (<div key={idx}>
                        <ProjectCard
                            title={title}
                            story={story}
                            image={image}
                            collaborators={collaborators} />
                    </div>);
                })
                }
            </AwesomeSlider > */}
        </div >
    )
}
