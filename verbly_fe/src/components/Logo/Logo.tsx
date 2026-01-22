import logoSmall from "./img/logo-small.svg";
import logoLarge from "./img/logo-large.svg";
import logoHori from "./img/logo-hori.svg";
import logoVerti from "./img/logo-verti.svg";

export default function Logo({ variant = "small" }) {
  switch (variant) {
    case "small":
      return (
        <div>
          <img src={logoSmall} alt="logo small" />
        </div>
      );
    case "large":
      return (
        <div>
          <img src={logoLarge} alt="logo large" />
        </div>
      );
    case "hori":
      return (
        <div>
          <img src={logoHori} alt="logo hori" />
        </div>
      );
    case "verti":
      return (
        <div>
          <img src={logoVerti} alt="logo verti" />
        </div>
      );
  }
}
