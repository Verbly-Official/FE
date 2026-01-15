import "./App.css";
import GNB from "./components/Nav/GNB";
import GNB_Alarm from "./components/Nav/GNB_Alarm";
import SideMenu from "./components/Nav/SideMenu";
import SideMenu_Tab from "./components/Nav/SideMenu_Tab";
import Tab from "./components/Tab/Tab";

function App() {
  return (
    <>
      <Tab text="home" isSelected={true} />
    </>
  );
}

export default App;
