import React from "react";
import { GradientButton } from "../components/Button/GradientButton";
import type { GradientButtonSize, GradientButtonInteraction } from "../components/Button/GradientButton";

const GradientButtonTestPage: React.FC = () => {
    const sizes: GradientButtonSize[] = ["large", "medium", "small"];
    const interactions: GradientButtonInteraction[] = ["normal", "hovered", "pressed", "disabled"];

    return (
        <div className="min-h-screen bg-gray-50 p-10 font-sans">


            <div className="space-y-16">
                {sizes.map((size) => (
                    <section key={size} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold mb-6 text-violet-50 uppercase tracking-wider">{size} Size</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {interactions.map((interaction) => (
                                <div key={interaction} className="flex flex-col items-center gap-4">
                                    <span className="text-sm font-medium text-gray-400 capitalize">{interaction}</span>
                                    <GradientButton
                                        size={size}
                                        interaction={interaction}
                                        disabled={interaction === "disabled"}
                                    >
                                        텍스트
                                    </GradientButton>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <section className="mt-16 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold mb-6 text-gray-800">Interactive Test (Normal State)</h2>
                <div className="flex flex-wrap gap-8 justify-center">
                    <GradientButton size="large">Large Button</GradientButton>
                    <GradientButton size="medium">Medium Button</GradientButton>
                    <GradientButton size="small">Small Button</GradientButton>
                </div>
            </section>
        </div>
    );
};

export default GradientButtonTestPage;
