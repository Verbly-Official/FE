import React from "react";
import { ProgressIndicator } from "../components/ProgressIndicator";

const ProgressIndicatorDemo: React.FC = () => {
    const circleStates = [0, 25, 50, 75, 100];

    return (
        <div className="p-10 bg-white min-h-screen flex flex-col gap-16">
            <h1 className="text-3xl font-bold">Progress Indicator Demo</h1>

            {/* Circle Progress Section */}
            <section className="flex flex-col gap-8">
                <h2 className="text-xl font-semibold text-blue-60">Progress Indicator_Circle</h2>
                <div className="flex flex-col gap-12 bg-gray-1 p-8 rounded-xl">
                    {/* Large Size */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-gray-7">Size: Large</h3>
                        <div className="flex flex-wrap gap-10 items-end">
                            {circleStates.map((state) => (
                                <div key={state} className="flex flex-col items-center gap-2">
                                    <span className="text-sm text-gray-7 font-medium">{state}%</span>
                                    <ProgressIndicator variant="circle" value={state} size="large" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Small Size */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-gray-7">Size: Small</h3>
                        <div className="flex flex-wrap gap-10 items-end">
                            {circleStates.map((state) => (
                                <div key={state} className="flex flex-col items-center gap-2">
                                    <span className="text-sm text-gray-7 font-medium">{state}%</span>
                                    <ProgressIndicator variant="circle" value={state} size="small" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Linear Progress Section */}
            <section className="flex flex-col gap-8">
                <h2 className="text-xl font-semibold text-blue-60">Progress Indicator_Linear (9 Cases)</h2>

                <div className="flex flex-col gap-8 bg-gray-1 p-8 rounded-xl w-fit">
                    <div className="flex flex-col gap-6 w-[612px]">
                        {/* Small Size (No Labels) */}
                        <ProgressIndicator variant="linear" value={0} size="small" />
                        <ProgressIndicator variant="linear" value={50} size="small" />
                        <ProgressIndicator variant="linear" value={100} size="small" />

                        {/* Medium Size */}
                        <ProgressIndicator variant="linear" value={0} size="medium" labelLeft="tag1" labelRight="tag2" />
                        <ProgressIndicator variant="linear" value={50} size="medium" labelLeft="tag1" labelRight="tag2" />
                        <ProgressIndicator variant="linear" value={100} size="medium" labelLeft="tag1" labelRight="tag2" />

                        {/* Large Size */}
                        <ProgressIndicator variant="linear" value={0} size="large" labelLeft="tag1" labelRight="tag2" />
                        <ProgressIndicator variant="linear" value={50} size="large" labelLeft="tag1" labelRight="tag2" />
                        <ProgressIndicator variant="linear" value={100} size="large" labelLeft="tag1" labelRight="tag2" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProgressIndicatorDemo;
