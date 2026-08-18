import React from "react"

export default function SliderControlsInside() {
    return (
        <section className="py-16 bg-gray-100">
            <div className="max-w-screen-2xl mx-auto px-6">
                <div className="bg-white rounded-xl p-8 shadow-sm flex items-center justify-center gap-20">
                    
                    <div className="w-1/3 flex justify-center">
                        <img src="/arc-icon.png" className="w-80" />
                    </div>

                    <div className="w-2/3 max-w-3xl space-y-3">
                        <img src="/arc-text.png" className="w-96" />

                        <p className="mt-3 text-gray-600">
                            The AI for Responsible Care (ARC) Lab, established in July 2025 at the Institute of Health Policy, Management and Evaluation, Dalla Lana School of Public Health at the University of Toronto, uses, adapts, and develops AI and statistical methods to address problems in individual and population health. The lab brings together researchers from diverse backgrounds to study complex health challenges and design practical, equitable solutions for real-world settings. Our work spans unimodal and multimodal AI, causal inference, causal machine learning, and applied statistical approaches, with a focus on supporting better decisions and translating evidence into responsible action.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}