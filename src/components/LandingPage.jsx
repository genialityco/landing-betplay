import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// ✅ Assets BUK
import bg from "../BUK/FONDO_MAIN.png";
import logo from "../BUK/LOGO_COPY.png";
import btnMundo from "../BUK/BOTON_MUNDO.png";
import btnRuleta from "../BUK/BOTON_RULETA.png";
import phones from "../BUK/CELS.png";

// Animaciones
const bounce = keyframes`
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-10px); }
`;

// Layout base
const Hero = styled.section`
  position: relative;
  width: 100vw;
  height: 100dvh;
  max-height: 100dvh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Fondo full-bleed
const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
`;

// Contenido centrado en columna
const Content = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: min(100%, 900px);
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(10px, 3vh, 24px);
`;

// Logo superior
const LogoImage = styled(motion.img)`
  width: clamp(50px, 50vw, 300px);
  height: auto;
  user-select: none;
  pointer-events: none;
  margin-top: -200px;
`;


// Grupo de botones
const ButtonGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;


// Botón como imagen clickeable
const ButtonImage = styled(motion.img)`
  width: clamp(220px, 70vw, 360px);
  height: auto;
  display: block;
  cursor: pointer;
  user-select: none;
  translate-y: 2px;
`;

// Celulares decorativos (abajo, centrados)
const PhonesImg = styled(motion.img)`
  position: absolute;
  bottom: clamp(-12px, -1vh, 0px);
  left: 1/2;
  transform: translateY(100%);
  width: clamp(300px, 80vw, 600px);
  max-width: 95vw;
  height: auto;
  animation: ${bounce} 3s ease-in-out infinite;
  pointer-events: none;
  user-select: none;
  scale: 1;
`;

// Variants para fade-in en cascada
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } },
};

export default function LandingPage() {
  return (
    <Hero>
      {/* Fondo */}
      <BackgroundImage src={bg} alt="Fondo BUK" />
      <Content initial="hidden" animate="visible" variants={container}>
        <LogoImage src={logo} alt="buk" variants={item} />
        <ButtonGroup variants={item}>
          <a href="https://where-is-buk.netlify.app" aria-label="Mundo Buk">
            <ButtonImage
              src={btnMundo}
              alt="MUNDO BUK"
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
            />
          </a>
          {/* RULETA BUK */}
          <a href="https://gen-fortunewheel.netlify.app" aria-label="Ruleta Buk">
            <ButtonImage
              src={btnRuleta}
              alt="RULETA BUK"
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              style={{ marginTop: "-20px" }} // 👈 mueve solo este botón hacia arriba
            />
          </a>

        </ButtonGroup>
      </Content>

      {/* Celulares decorativos */}
      <PhonesImg
        src={phones}
        alt="Celulares BUK"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 60, delay: 0.4 }}
      />
    </Hero>
  );
}
