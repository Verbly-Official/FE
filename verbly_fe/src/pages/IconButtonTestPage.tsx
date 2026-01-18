import React from "react";
import { IconButton } from "../components/Button/IconButton";

const IconButtonTestPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-10 font-sans">


            <div className="space-y-12">
                {/* 1. Shape Comparison */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">1. Shape: Square vs Round (Size: Large)</h2>
                    <div className="bg-white p-6 rounded-xl shadow-sm flex gap-[24px]">
                        <div className="flex flex-col items-center gap-2">
                            <IconButton shape="square" ariaLabel="square icon button" />
                            <span className="text-sm text-gray-500">Square</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <IconButton shape="round" ariaLabel="round icon button" />
                            <span className="text-sm text-gray-500">Round</span>
                        </div>
                    </div>
                </section>

                {/* 2. Size Comparison */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">2. Size: Large / Medium / Small (Shape: Square)</h2>
                    <div className="bg-white p-6 rounded-xl shadow-sm flex items-end gap-[24px]">
                        <div className="flex flex-col items-center gap-2">
                            <IconButton size="large" ariaLabel="large icon button" />
                            <span className="text-sm text-gray-500">Large (60px)</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <IconButton size="medium" ariaLabel="medium icon button" />
                            <span className="text-sm text-gray-500">Medium (48px)</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <IconButton size="small" ariaLabel="small icon button" />
                            <span className="text-sm text-gray-500">Small (40px)</span>
                        </div>
                    </div>
                </section>

                {/* 3. Interaction Comparison */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">3. Interaction: States (Shape: Square, Size: Large)</h2>
                    <div className="bg-white p-6 rounded-xl shadow-sm flex gap-[24px] flex-wrap">
                        <div className="flex flex-col items-center gap-2">
                            <IconButton interaction="normal" ariaLabel="normal icon button" />
                            <span className="text-sm text-gray-500">Normal</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <IconButton interaction="hovered" ariaLabel="hovered icon button" />
                            <span className="text-sm text-gray-500">Hovered (Forced)</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <IconButton interaction="pressed" ariaLabel="pressed icon button" />
                            <span className="text-sm text-gray-500">Pressed (Forced)</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <IconButton interaction="disabled" disabled ariaLabel="disabled icon button" />
                            <span className="text-sm text-gray-500">Disabled</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <IconButton interaction="error" ariaLabel="error icon button" />
                            <span className="text-sm text-gray-500">Error</span>
                        </div>
                    </div>
                </section>

                {/* 4. Full Grid Matrix */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">4. Full Matrix (Shape x Size x Interaction)</h2>
                    <div className="bg-white p-8 rounded-xl shadow-sm overflow-x-auto border-dashed border-2 border-violet-100">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-2 text-gray-400 font-medium">Size / State</th>
                                    <th className="p-2 text-gray-400 font-medium text-center">Normal</th>
                                    <th className="p-2 text-gray-400 font-medium text-center">Hovered</th>
                                    <th className="p-2 text-gray-400 font-medium text-center">Pressed</th>
                                    <th className="p-2 text-gray-400 font-medium text-center">Disabled</th>
                                    <th className="p-2 text-gray-400 font-medium text-center">Error</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {(["large", "medium", "small"] as const).map((size) => (
                                    <tr key={size}>
                                        <td className="p-4 font-semibold text-gray-600 capitalize">{size}</td>
                                        {(["normal", "hovered", "pressed", "disabled", "error"] as const).map((state) => (
                                            <td key={state} className="p-[12px] text-center">
                                                <IconButton
                                                    size={size}
                                                    interaction={state}
                                                    disabled={state === "disabled"}
                                                    ariaLabel={`${size} ${state} icon button`}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                {/* Round variations */}
                                {(["large", "medium", "small"] as const).map((size) => (
                                    <tr key={`round-${size}`}>
                                        <td className="p-4 font-semibold text-gray-600 capitalize">Round {size}</td>
                                        {(["normal", "hovered", "pressed", "disabled", "error"] as const).map((state) => (
                                            <td key={state} className="p-[12px] text-center">
                                                <IconButton
                                                    shape="round"
                                                    size={size}
                                                    interaction={state}
                                                    disabled={state === "disabled"}
                                                    ariaLabel={`round ${size} ${state} icon button`}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default IconButtonTestPage;
