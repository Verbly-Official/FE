import { useLocation, useNavigate } from "react-router-dom";
import BtnTabs from "../../../components/Tab/BtnTabs";
import WriteIcon from "../../assets/emoji/write.svg";
import TempleteIcon from "../../assets/emoji/template.svg";

export default function CorrectionWriteTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  const isTemplate = location.pathname.startsWith("/correction/write/template");
  const activeIndex = isTemplate ? 1 : 0;

  return (
    <BtnTabs
      btnTabs={["Write", "Template"]}
      iconSrcs={[WriteIcon, TempleteIcon]}
      defaultIndex={activeIndex}
      onChange={(index) => {
        if (index === 0) navigate("/correction/write");
        else navigate("/correction/write/template");
      }}
    />
  );
}
