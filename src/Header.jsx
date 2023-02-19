import "./App.css";
import { FiMoon } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSun } from "react-icons/bi";

const Header = ({ HandleClick, darkTheme, HandleOverlay }) => {
  return (
    <div className="header-container">
      <h2>To-do-app</h2>
      <div className="icons">
        {darkTheme ? (
          <BiSun className="moon" onClick={HandleClick} />
        ) : (
          <FiMoon className="moon" onClick={HandleClick} />
        )}
        <AiOutlinePlus className="plus" onClick={HandleOverlay} />
      </div>
    </div>
  );
};

export default Header;
