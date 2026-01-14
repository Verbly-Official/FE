/*
  svg 사용이 안되어 오류 발생합니다.
  //@ts-ignore 는 타입 무시입니다.
  임시방편이니 해결되면 지우고 사용하면 됩니다.
*/

//@ts-ignore
import logoSmall from "./img/logo-small.svg";
//@ts-ignore
import logoLarge from "./img/logo-large.svg";
//@ts-ignore
import logoHori from "./img/logo-hori.svg";
//@ts-ignore
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
