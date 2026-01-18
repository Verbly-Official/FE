import React, { useState } from "react";
import basicProfile from "../Profile/img/basicProfile.svg";

interface AvatarProps {
    src?: string;
    alt?: string;
    className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
    src,
    alt = "Profile",
    className = ""
}) => {
    const [imgSrc, setImgSrc] = useState(src || basicProfile);

    const handleError = () => {
        setImgSrc(basicProfile);
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            onError={handleError}
            className={`w-[48px] h-[48px] rounded-full object-cover ${className}`}
        />
    );
};
