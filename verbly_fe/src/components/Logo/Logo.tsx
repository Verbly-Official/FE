import logoSmall from "./img/logo-small.svg";
import logoLarge from "./img/logo-large.svg";
import logoHori from "./img/logo-hori.svg";
import logoVerti from "./img/logo-verti.svg";
import { useNavigate } from "react-router-dom";

type LogoVariant = "small" | "large" | "hori" | "verti";
interface LogoProps {
  variant?: LogoVariant;
}

const logoMap: Record<LogoVariant, string> = {
  small: logoSmall,
  large: logoLarge,
  hori: logoHori,
  verti: logoVerti,
};

export default function Logo({ variant = "small" }: LogoProps) {
  const navigate = useNavigate();
  const logoSrc = logoMap[variant];

  return (
    <div onClick={() => navigate("/home-korean")} className="cursor-pointer">
      <img src={logoSrc} alt={`logo ${variant}`} />
    </div>
  );
}
