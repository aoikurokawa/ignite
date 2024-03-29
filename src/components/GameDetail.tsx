import React from "react";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
//import redux
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//images
import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";
//star
import starFull from "../img/star-full.png";
import starEmpty from "../img/star-empty.png";
//antd
import "antd/dist/antd.css";
import { Spin } from "antd";

interface GameDetailProps {
  pathId: any;
  getDetail: any;
}

const GameDetail: React.FC<GameDetailProps> = ({ pathId, getDetail }) => {
  //dispatch
  const dispatch = useDispatch();

  const histry = useHistory();
  //exit detail
  const exitDetailHandler = (e: any) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      document.body.style.overflow = "auto";
      histry.push("/");
      dispatch({ type: "CLEAR_DETAIL" });
    }
  };
  //get platform images
  const getPlatForm = (platform: any) => {
    switch (platform) {
      case "Plastation 4":
        return playstation;
      case "Xbox One":
        return xbox;
      case "PC":
        return steam;
      case "Nintendo Switch":
        return nintendo;
      case "ios":
        return apple;
      default:
        return gamepad;
    }
  };
  //get stars
  const getStar = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="star" key={i} src={starFull}></img>);
      } else {
        stars.push(<img alt="star" key={i} src={starEmpty}></img>);
      }
    }
    return stars;
  };

  //data
  //@ts-ignore
  const { screen, game, isLoading } = useSelector((state) => state.detail);

  return (
    <>
      {!isLoading && (
        <CardShadow className="shadow" onClick={exitDetailHandler}>
          <Detail layoutId={pathId}>
            {getDetail ? (
              <>
                <Stats>
                  <div className="rating">
                    <motion.h3 layoutId={`title ${pathId}`}>
                      {game.name}
                    </motion.h3>
                    <p>{game.rating}</p>
                    {getStar()}
                  </div>
                  <Info>
                    <h3>Platforms</h3>
                    <Platforms>
                      {game.platforms.map((data: any) => (
                        <img
                          key={data.platform.id}
                          src={getPlatForm(data.platform.name)}
                          alt={data.platform.name}
                        ></img>
                      ))}
                    </Platforms>
                  </Info>
                </Stats>

                <Media>
                  <motion.img
                    layoutId={`image ${pathId}`}
                    src={game.background_image}
                    alt="image"
                  />
                </Media>
                <Description>
                  <p>{game.description_raw}</p>
                </Description>
                <div className="gallery">
                  {screen.results.map((screen: any) => (
                    <img src={screen.image} key={screen.id} alt="game" />
                  ))}
                </div>
              </>
            ) : (
              <StyledSpin>
                <Spin />
              </StyledSpin>
            )}
          </Detail>
        </CardShadow>
      )}
    </>
  );
};

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  z-index: 10;
  img {
    width: 100%;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 1.5rem;
    height: 1.5rem;
    display: inline;
  }
`;

const Info = styled(motion.div)`
  text-align: center;
`;

const Platforms = styled(motion.div)`
  display: flex;
  justify-content: spacr-evenly;
  img {
    margin-left: 3rem;
  }
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0rem;
`;

const StyledSpin = styled.div`
  justify-content: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

export default GameDetail;
