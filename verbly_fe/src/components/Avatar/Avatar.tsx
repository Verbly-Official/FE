import React, { useState, useEffect } from "react";
// 기본 프로필을 medium 사이즈 SVG로 설정 (또는 상황에 맞게 변경 가능)
import defaultProfile from "../Profile/img/medium.svg"; 

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
    const [imgSrc, setImgSrc] = useState(src || defaultProfile);

    // prop인 src가 바뀌면 내부 상태도 업데이트
    useEffect(() => {
        setImgSrc(src || defaultProfile);
    }, [src]);

    const handleError = () => {
        setImgSrc(defaultProfile);
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            onError={handleError}
            // 기본 w/h는 설정하되, className으로 들어오는 값이 우선순위를 갖도록 뒤에 배치
            className={`rounded-full object-cover w-[48px] h-[48px] ${className}`}
        />
    );
};