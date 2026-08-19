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
                            Established in July 2025, ARC Lab develops AI for complex problems across health and public systems, from individual patient care to population, environmental, and urban health. Our research combines multimodal data, domain knowledge, and computational models to support prediction, personalization, scientific discovery, and real-world decision making. We focus on AI that is reliable, responsible, and useful as data, evidence, and real-world settings evolve.
                        </p>

                        <p className="mt-4 text-sm text-gray-500">
                        Institute of Health Policy, Management and Evaluation · Dalla Lana School
                        of Public Health · University of Toronto
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
}