import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

import videoSrc from "../assets/BETPLAY/RULETA_TOTEM.mp4";
import topText from "../assets/BETPLAY/FRASE_COPY.png";
import logo from "../assets/BETPLAY/LOGO-BETPLAY.png";
import buttonBg from "../assets/BETPLAY/BOTON_INICIO.png";
import coins from "../assets/BETPLAY/MONEDAS_HOME.png";
import legales from "../assets/BETPLAY/LEGALES.png";

// Animaciones
const bounce = keyframes`
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-10px); }
`;

// Breakpoints
const bp = { lg: "1200px", md: "768px", sm: "480px" };

// Estilos base
const Hero = styled.section`
  position: relative;
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoBg = styled.video`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100dvh;
  object-fit: cover;
  z-index: 0;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  /* Sutil degradado para mejorar contraste de textos/botones */
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.25) 40%,
    rgba(0, 0, 0, 0.45) 100%
  );
  z-index: 0;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  display: grid;
  place-items: center;

  /* Permite scroll si algo se desborda en altura */
  overflow-y: auto;
  padding: clamp(12px, 2.5vh, 24px) 12px;
`;

/* Columna central con ancho contenido para evitar “demasiado ancho” */
const MaxCol = styled.div`
  width: 100%;
  max-width: 720px; /* se ve bien en 1080x1920 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(16px, 3vh, 28px);
`;

const TopImage = styled(motion.img)`
  width: min(95vw, 840px);
`;

const LogoImage = styled(motion.img)`
  width: min(95vw, 820px);
`;

/* Grupo de botones APILADOS en vertical por defecto (portrait) */
const ButtonGroup = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(10px, 2.2vh, 16px);
  margin-top: clamp(8px, 1vh, 12px);

  /* En landscape amplio, los mostramos en fila */
  @media (orientation: landscape) and (min-width: ${bp.md}) {
    flex-direction: row;
    justify-content: center;
    flex-wrap: nowrap;
  }
`;

/* Botón con imagen de fondo, altura fija y texto centrado */
const Btn = styled(motion.button)`
  width: min(90vw, 720px);
  height: clamp(120px, 20vh, 200px);
  background: url(${buttonBg}) center / contain no-repeat transparent;
  border: none;
  color: #ffd24c;
  font-size: clamp(3.8rem, 3.8vw, 2rem);
  letter-spacing: 0.5px;
  font-weight: 800;
  text-transform: uppercase;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  /* Sombra sutil para separar del fondo */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);

  /* “Hit area” cómoda */
  padding-inline: 12px;

  /* Pequeña elevación al hacer hover/tap ya la maneja framer, pero añadimos focus */
  &:focus-visible {
    outline: 2px solid #ffd24c;
    outline-offset: 2px;
    border-radius: 10px;
  }
`;

const Coins = styled(motion.img)`
  width: min(60vw, 470px);
  margin-top: 100px;
  animation: ${bounce} 2.5s ease-in-out infinite;
`;

const Footer = styled.footer`
  position: relative;
  z-index: 1;
  width: 100%;
  display: grid;
  place-items: center;
  padding-bottom: clamp(8px, 2vh, 16px);
`;

const LegalesImg = styled.img`
  width: min(95vw, 1000px);
  height: auto;
`;

const IframeContainer = styled.div`
  width: 100vw;
  height: 100dvh;
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
  top: max(16px, env(safe-area-inset-top));
  left: max(16px, env(safe-area-inset-left));
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

  const URLRULETA = "https://gen-fortunewheel.netlify.app/";

  return (
    <>
      <Hero>
        <VideoBg src={videoSrc} autoPlay muted loop playsInline />
        <Overlay />
        <Content initial="hidden" animate="visible" variants={container}>
          <MaxCol>
            <TopImage src={topText} alt="Frase superior" variants={item} />
            <LogoImage src={logo} alt="Logo Betplay" variants={item} />

            <ButtonGroup variants={item}>
              <Btn
                onClick={() =>
                  setIframeUrl(import.meta.env.VITE_RULETA_URL)
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                variants={item}
              >
                RULETA
              </Btn>
              <Btn
                onClick={() =>
                  setIframeUrl(import.meta.env.VITE_RASPA_LISTO_URL)
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                variants={item}
              >
                RASPA Y GANA
              </Btn>
            </ButtonGroup>

            <Coins src={coins} alt="Monedas" variants={item} />
          </MaxCol>
        </Content>

        <Footer>
          <LegalesImg src={legales} alt="Legales" />
        </Footer>
      </Hero>
    </>
  );
}
