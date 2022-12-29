import { useEffect, useState } from "react";
import Router from "next/router";
import { Phrases } from "./";
import { AiOutlineArrowLeft } from "react-icons/ai";
import styles from "../styles/Game.module.css";

const Game = () => {
  const tinycolor = require("tinycolor2");

  const [position, setPosition] = useState({
    top: "50%",
    left: "50%",
    count: 0,
  });
  const [homePosition, setHomePosition] = useState({
    top: "2%",
    right: "2%",
    count: 0,
  });
  const [settings, setSettings] = useState({});
  const [image, setImage] = useState("");

  useEffect(() => {
    // Set default settings
    let newSettings = {
      company: "Boss",
      bonus: "Bonus",
      img: `${image}`,
      bg: "white",
      btn_color: "green",
    };

    const searchParams = new URLSearchParams(window.location.search);
    let paramCompany = searchParams.get("company");
    let paramBonus = searchParams.get("bonus");
    let paramImg = searchParams.get("img");
    let paramBg = searchParams.get("bg");
    let paramColor = searchParams.get("color");

    paramCompany.length > 0 ? (newSettings.company = paramCompany) : null;
    paramBonus.length > 0 ? (newSettings.bonus = paramBonus) : null;
    paramImg.length > 0 ? (newSettings.img = paramImg) : null;
    paramBg.length > 0
      ? isColor(paramBg.length)
        ? (newSettings.bg = paramBg)
        : null
      : null;
    paramColor.length > 0
      ? isColor(paramBg.length)
        ? (newSettings.color = paramColor)
        : null
      : null;

    // Set settings status
    setSettings(newSettings);
    setImage(newSettings.img);
  }, []);

  //Validate if color exists
  const isColor = (color) => {
    const colorRegex =
      /^(?:(?:#(?:[\da-f]{3}){1,2})|(?:rgb\((?:\d{1,3},\s*){2}\d{1,3}\))|(?:hsl\((?:\d{1,3},\s*){2}\d{1,3}\))|(?:[\da-z]+))$/i;
    return colorRegex.test(color);
  };

  //Get contrast color for text
  const getColor = (color) => {
    let newColor = tinycolor(color);
    const luminance = newColor.getLuminance();
    return luminance > 0.5 ? "black" : "white";
  };

  //handleError Image, set default
  const handleError = () => {
    setImage("/boss.png");
  };

  //Position for Bonus btn
  const changePosition = () => {
    let count = position.count;
    let randX = Math.random() * 80;
    let randY = Math.random() * 80;

    randX = Math.floor(randX);
    randY = Math.floor(randY);
    count = position.count + 1;

    setPosition({ top: `${randY}%`, left: `${randX}%`, count: count });
  };

  //Position for Home btn
  const changeHomePosition = () => {
    let count = homePosition.count;
    let randX = Math.random() * 80;
    let randY = Math.random() * 80;
    count = homePosition.count + 1;

    if (homePosition.count < 3) {
      randX = Math.floor(randX);
      randY = Math.floor(randY);
      setHomePosition({ top: `${randY}%`, right: `${randX}%`, count: count });
    } else {
      setTimeout(
        () => setHomePosition({ top: `2%`, right: `2%`, count: 0 }),
        4000
      );
    }
  };

  //Navigate to Home
  const clickHome = () => {
    homePosition.count === 3 ? Router.push(`/`) : null;
    changeHomePosition();
  };

  return (
    <div
      className={`${styles.container}`}
      style={{ backgroundColor: `${settings.bg}` }}
    >
      <div className={`${styles.container_box}`}>
        <div
          className={`${styles.btn_home}`}
          style={{ top: homePosition.top, right: homePosition.right }}
          onMouseEnter={changeHomePosition}
          onClick={clickHome}
        >
          <AiOutlineArrowLeft style={{ fontSize: "20px" }} />
        </div>
        <div
          className={`${styles.box}`}
          style={{ top: position.top, left: position.left }}
          onMouseEnter={changePosition}
          onClick={changePosition}
        >
          <div
            className={`${styles.box_content}`}
            style={{
              backgroundColor: `${settings.btn_color}`,
              color: `${getColor(settings.btn_color)}`,
            }}
          >
            {settings.bonus}
          </div>
        </div>
      </div>

      <div className={`${styles.container_boss}`}>
        <div
          className={`${styles.boss_text}`}
          style={{ color: `${getColor(settings.bg)}` }}
        >
          <div className={`${styles.boss_name}`}>{settings.company}</div>
          <div className={`${styles.boss_phrase}`}>
            <Phrases homeMsg={homePosition.count} boxMsg={position.count} />
          </div>
        </div>
        <div className={`${styles.boss_img}`}>
          <img
            src={`${image}`}
            onError={handleError}
            alt="boss"
            className="boss"
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
