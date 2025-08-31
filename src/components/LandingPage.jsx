import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// ✅ Assets BUK
import bg from "../BUK/FONDO_MAIN.png";
import logo from "../BUK/LOGO_COPY.png";
import btnMundo from "../BUK/BOTON_MUNDO.png";
import btnRuleta from "../BUK/BOTON_RULETA.png";
import phones from "../BUK/CELS.png";

// --- Animaciones ---
const bounce = keyframes`
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-10px); }
`;

// ---------- Helpers de visibilidad ----------
const DesktopOnly = styled.div`
  display: block;
  @media (max-width: 1023px), (orientation: portrait) {
    display: none;
  }
`;

const TabletOnly = styled.div`
  display: none;
  /* Muestra en pantallas angostas o en orientación vertical */
  @media (max-width: 1023px), (orientation: portrait) {
    display: block;
  }
`;

// ---------- Layout base compartido ----------
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

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
`;

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

// ---------- Variants ----------
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } },
};

// ---------- Desktop (landscape / ≥1024px) ----------
const LogoDesktop = styled(motion.img)`
  width: clamp(160px, 28vw, 300px);
  height: auto;
  user-select: none;
  pointer-events: none;
  margin-top: -140px;
`;

const ButtonsDesktop = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const ButtonImgDesktop = styled(motion.img)`
  width: clamp(260px, 32vw, 360px);
  height: auto;
  display: block;
  cursor: pointer;
  user-select: none;
`;

const PhonesDesktop = styled(motion.img)`
  position: absolute;
  bottom: clamp(-12px, -1vh, 0px);
  left: 20%;
  top: 30%;
  width: clamp(420px, 58vw, 900px);
  height: auto;
  animation: ${bounce} 3s ease-in-out infinite;
  pointer-events: none;
  user-select: none;
`;

// ---------- Tablet/Vertical (<1024px o portrait) ----------
/* En vertical hacemos todo MÁS GRANDE para que no “se vea pequeño”.
   Subimos límites de clamp y aumentamos el gap. */
const ContentTablet = styled(Content)`
  width: min(100%, 680px);
  gap: clamp(16px, 4.5vh, 28px);
  transform: translateY(-1vh);
`;

const LogoTablet = styled(motion.img)`
  width: clamp(220px, 60vw, 500px);
  height: auto;
  user-select: none;
  pointer-events: none;
  margin-top: -15vh;
`;

const ButtonsTablet = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const ButtonImgTablet = styled(motion.img)`
  width: clamp(300px, 88vw, 520px);
  height: auto;
  display: block;
  cursor: pointer;
  user-select: none;
`;

const PhonesTablet = styled(motion.img)`
  position: absolute;
  bottom: clamp(-6px, 1vh, 24px);
  left: -10%;
  top: 40%;
  width: clamp(450px, 120vw, 1500px);
  height: auto;
  animation: ${bounce} 3s ease-in-out infinite;
  pointer-events: none;
  user-select: none;
`;

// ---------- Componente ----------
export default function LandingPage() {
  return (
    <>
      {/* ====== Desktop ====== */}
      <DesktopOnly>
        <Hero>
          <BackgroundImage src={bg} alt="Fondo BUK" />
          <Content initial="hidden" animate="visible" variants={container}>
            <LogoDesktop src={logo} alt="buk" variants={item} />
            <ButtonsDesktop variants={item}>
              <a href="https://where-is-buk.netlify.app" aria-label="Mundo Buk">
                <ButtonImgDesktop
                  src={btnMundo}
                  alt="MUNDO BUK"
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                />
              </a>
              <a href="https://gen-fortunewheel.netlify.app" aria-label="Ruleta Buk">
                <ButtonImgDesktop
                  src={btnRuleta}
                  alt="RULETA BUK"
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ marginTop: "-30px" }}
                />
              </a>
            </ButtonsDesktop>
          </Content>

          <PhonesDesktop
            src={phones}
            alt="Celulares BUK"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 60, delay: 0.4 }}
          />
        </Hero>
      </DesktopOnly>

      {/* ====== Tablet / Vertical ====== */}
      <TabletOnly>
        <Hero>
          <BackgroundImage src={bg} alt="Fondo BUK" />
          <ContentTablet initial="hidden" animate="visible" variants={container}>
            <LogoTablet src={logo} alt="buk" variants={item} />
            <ButtonsTablet variants={item}>
              <a href="https://where-is-buk.netlify.app" aria-label="Mundo Buk">
                <ButtonImgTablet
                  src={btnMundo}
                  alt="MUNDO BUK"
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.96 }}
                />
              </a>
              <a href="https://gen-fortunewheel.netlify.app" aria-label="Ruleta Buk">
                <ButtonImgTablet
                  src={btnRuleta}
                  alt="RULETA BUK"
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.96 }}
                  style={{ marginTop: "-40px" }}
                />
              </a>
            </ButtonsTablet>
          </ContentTablet>

          <PhonesTablet
            src={phones}
            alt="Celulares BUK"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 60, delay: 0.4 }}
          />
        </Hero>
      </TabletOnly>
    </>
  );
}
