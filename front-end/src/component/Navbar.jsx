import React, { useState } from "react";
import style from "./Navbar.module.css";
import { BiLogoFlutter } from "react-icons/bi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";


function Navbar({ name ,logout}) {
  const [showMenu, setShowMenu] = useState(false);

  const showHamerger = () => {
    setShowMenu(!showMenu);
  };

  console.log(showMenu);
  return (
    <div className={showMenu ? style.active : ""}>
      <div className={style.container}>
        <h3>WebApp</h3>

        <ul>
          <li>
            <Link to={"/"} className={style.linkTage}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/favourite"} className={style.linkTage}>
              Favourite
            </Link>
          </li>
        </ul>
        <div className={style.divAuth}>
          <p data-testid="chand" >{name}</p>
          <p onClick={logout} className={style.logoutBtn}>Logout</p>
        </div>

        <div className={style.hamberger}>
          <AiOutlineMenu className={style.openMenu} onClick={showHamerger} />
          <AiOutlineClose className={style.closeMenu} onClick={showHamerger} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
