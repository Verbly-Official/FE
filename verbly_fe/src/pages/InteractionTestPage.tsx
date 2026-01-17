import React, { useState } from "react";
import { InteractionIcon } from "../components/Interaction";
import type { InteractionType } from "../types/interaction";

const InteractionTestPage: React.FC = () => {
    const [states, setStates] = useState<Record<InteractionType, boolean>>({
        checkbox: false,
        star: true,
        bookmark: false,
        heart: true,
    });

    const handleToggle = (type: InteractionType) => (next: boolean) => {
        setStates((prev) => ({ ...prev, [type]: next }));
    };

    const types: InteractionType[] = ["checkbox", "star", "bookmark", "heart"];

    return (
        <div className="p-10 space-y-10 bg-white min-h-screen">


            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-6">클릭테스트</h2>
                <div className="flex gap-8 items-center p-6 bg-gray-1 rounded-xl">
                    {types.map((type) => (
                        <div key={type} className="flex flex-col items-center gap-2">
                            <InteractionIcon
                                type={type}
                                selected={states[type]}
                                onToggle={handleToggle(type)}
                            />
                            <span className="text-xs text-gray-5 capitalize">{type}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-4">
                <div className="grid grid-cols-2 gap-8 p-6 bg-gray-1 rounded-xl">
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-4">Unselected (false)</h3>
                        <div className="flex gap-4">
                            {types.map((type) => (
                                <InteractionIcon key={`${type}-false`} type={type} selected={false} />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-4">Selected (true)</h3>
                        <div className="flex gap-4">
                            {types.map((type) => (
                                <InteractionIcon key={`${type}-true`} type={type} selected={true} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InteractionTestPage;
