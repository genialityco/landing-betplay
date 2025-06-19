import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

import videoSrc from "../assets/FONDO_INICIO.png";
// import topText from "../assets/FRASE_SUPERIOR.png";
import logo from "../assets/FRASE_COPY.png";
import buttonBg from "../assets/BOTON.png";
import coins from "../assets/MONEDAS_HOME.png";
import legales from "../assets/LEGALES.png";

// Animaciones
const bounce = keyframes`
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-10px); }
`;

// Breakpoints
const bp = { md: "768px", sm: "480px" };

// Estilos base
const Hero = styled.section`
  position: relative;
  width: 100vw;
  height: 100dvh;
  max-height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// const VideoBg = styled.video`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   width: 100vw;
//   height: 100vh;
//   transform: translate(-50%, -50%);
//   object-fit: cover;
// `;

const BackgroundImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%);
  object-fit: cover;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
  margin-top: 100px;
`;

const TopImage = styled(motion.img)`
  width: clamp(180px, 40vw, 350px);
`;
const LogoImage = styled(motion.img)`
  width: clamp(240px, 80vw, 650px);
`;
const ButtonGroup = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(5px, 2vw, 10px);

  @media (max-width: ${bp.sm}) {
    flex-direction: column;
    width: 100%;
    gap: clamp(4px, 1.5vw, 8px);
  }
`;

const Btn = styled(motion.button)`
  width: clamp(120px, 25vw, 230px);
  padding: 45px;
  background: url(${buttonBg}) center/contain no-repeat;
  border: none;
  color: #ffd24c;
  font-size: clamp(1.3rem, 1.5vw, 3rem);
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${bp.sm}) {
    font-size: 1.1rem;
    padding: 30px;
  }
`;

const Coins = styled(motion.img)`
  width: clamp(80px, 60vw, 420px);
  max-width: 90vw;
  animation: ${bounce} 2.5s ease-in-out infinite;
`;

const Footer = styled.footer`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-inline: 1rem;
`;

const LegalesImg = styled.img`
  width: clamp(180px, 90vw, 800px);
  height: auto;
`;

const IframeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

// Botón flotante para volver
const BackButton = styled.button`
  position: absolute;
  top: 16px;
  left: 160px;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffd24c;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

// Animación en cascada
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
};

export default function LandingPage() {
  const [iframeUrl, setIframeUrl] = useState("");

  if (iframeUrl) {
    return (
      <IframeContainer>
        <BackButton onClick={() => setIframeUrl("")}>← Volver</BackButton>
        <StyledIframe src={iframeUrl} />
      </IframeContainer>
    );
  }

  return (
    <Hero>
      {/* <VideoBg src={videoSrc} autoPlay muted loop playsInline /> */}
      <BackgroundImage src={videoSrc} alt="Fondo" />
      <Content initial="hidden" animate="visible" variants={container}>
        {/* <TopImage src={topText} alt="Frase superior" variants={item} /> */}
        <LogoImage src={logo} alt="Pretty Dirty" variants={item} />

        <ButtonGroup variants={item}>
          <Btn
            onClick={() => setIframeUrl(import.meta.env.VITE_RULETA_URL)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={item}
          >
            Ruleta BetPlay
          </Btn>
          <Btn
            onClick={() => setIframeUrl(import.meta.env.VITE_AGILIDAD_URL)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={item}
          >
            REFLEJO BetPlay
          </Btn>

          {/* <Btn
            onClick={() => window.location = import.meta.env.VITE_PHOTO_URL}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={item}
          >
            Filtro
          </Btn> */}

          <Btn
            onClick={() => (window.location = import.meta.env.VITE_RASPA_LISTO_URL)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={item}
          >
            RASPA & LISTO
          </Btn>
        </ButtonGroup>

        <Coins src={coins} alt="Monedas" variants={item} />
      </Content>
      <Footer>
        <LegalesImg src={legales} alt="Legales" />
      </Footer>
    </Hero>
  );
}
