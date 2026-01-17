import React from "react";
import { TextButton } from "../components/Button/TextButton";
import type { TextButtonVariant, TextButtonSize, TextButtonIcon, TextButtonInteraction } from "../components/Button/TextButton";

const TextButtonTestPage: React.FC = () => {
    const variants: TextButtonVariant[] = ["primary", "secondary"];
    const sizes: TextButtonSize[] = ["large", "medium", "small"];
    const icons: TextButtonIcon[] = ["none", "leading", "trailing", "both"];
    const interactions: TextButtonInteraction[] = ["normal", "hovered", "pressed", "disabled", "error"];

    return (
        <div className="min-h-screen bg-gray-50 p-10 font-sans">
            

            <div className="space-y-16">
                {variants.map((variant) => (
                    <section key={variant} className="bg-white p-8 rounded-xl shadow-sm overflow-x-auto border-2 border-dashed border-violet-100">
                        <h2 className="text-xl font-bold mb-6 text-violet-50 uppercase tracking-wider">{variant} Variant</h2>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-4 text-gray-400 font-medium border-b">Size / Icon</th>
                                    {interactions.map((interaction) => (
                                        <th key={interaction} className="p-4 text-gray-400 font-medium text-center border-b capitalize">{interaction}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sizes.map((size) => (
                                    <React.Fragment key={size}>
                                        {icons.map((icon, iconIdx) => (
                                            <tr key={`${size}-${icon}`} className="border-b border-gray-50 last:border-0">
                                                <td className="p-4 font-semibold text-gray-600 capitalize">
                                                    {iconIdx === 0 ? size : ""} <span className="text-xs font-normal text-gray-400">({icon})</span>
                                                </td>
                                                {interactions.map((interaction) => (
                                                    <td key={interaction} className="p-4 text-center">
                                                        <TextButton
                                                            variant={variant}
                                                            size={size}
                                                            icon={icon}
                                                            interaction={interaction}
                                                            disabled={interaction === "disabled"}
                                                        >
                                                            텍스트
                                                        </TextButton>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default TextButtonTestPage;
