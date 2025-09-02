import styled, { keyframes, createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";

const bg = "../BUK/FONDO_MAIN.png";
const logo = "../BUK/LOGO_COPY.png";
const btnMundo = "../BUK/BOTON_MUNDO.png";
const btnRuleta = "../BUK/BOTON_RULETA.png";
const phones = "../BUK/CELS.png";

/* ================== CONFIG DEL CANVAS ================== */
const BASE_W = 1280;
const BASE_H = 720;

/* Animación con alternativa para prefers-reduced-motion */
const bounce = keyframes`
  0%, 100% { transform: translateY(0) }
  50%      { transform: translateY(-10px) }
`;

/* Breakpoints */
const BP = {
  mobile: "(max-width: 767px), (orientation: portrait)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
  desktop: "(min-width: 1024px)",
};

/* ================== GLOBAL: bloquear scroll y suavizar rendering ================== */
const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;              /* evita usar useEffect para bloquear scroll */
    background: #000;              /* fondo sólido detrás del hero */
  }
  body, #root { height: 100dvh; }  /* asegura viewport completo */
`;

/* ================== STAGE (pantalla completa) ================== */
const Stage = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  touch-action: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  will-change: transform;

  /* Escalas para el canvas */
  --sx: calc(100vw / ${BASE_W});
  --sy: calc(100dvh / ${BASE_H});
  --s-contain: min(var(--sx), var(--sy));

  /* ====== TOKENS por defecto (Desktop) ====== */
  --canvas-x: 0px;
  --canvas-y: 0px;
  --canvas-zoom: 1;

  --logo-w: 420px;
  --logo-x: 0px;
  --logo-y: -150px;

  --btn-w: 300px;
  --buttons-x: 0px;
  --buttons-y: -40px;

  --phones-w: 820px;
  --phones-ty: -28%;

  display: flex;
  align-items: center;
  justify-content: center;

  /* ====== MOBILE ====== */
  @media ${BP.mobile} {
    --canvas-zoom: 1;
    --logo-w: 400px;
    --logo-x: 0px;
    --logo-y: -150px;

    --btn-w: 300px;
    --buttons-x: 0px;
    --buttons-y: -30px;

    --phones-w: 650px;
    --phones-ty: -25%;
  }

  /* ====== TABLET ====== */
  @media ${BP.tablet} {
    --canvas-zoom: 1;
    --logo-w: 700px;
    --logo-x: 0px;
    --logo-y: -200px;

    --btn-w: 550px;
    --buttons-x: 0px;
    --buttons-y: -100px;

    --phones-w: 1280px;
    --phones-ty: -30%;
  }

  /* ====== DESKTOP GRANDE (opcional) ====== */
  @media (min-width: 1440px) {
    --canvas-zoom: 1;
    --logo-w: 460px;
    --logo-y: -160px;
    --btn-w: 320px;
    --phones-w: 900px;
  }
`;

/* Fondo full-bleed (cover) */
const FullBleedBg = styled.div<{ src: string }>`
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: url(${p => p.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transform: translateZ(0);
`;

const ScaledCanvas = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: ${BASE_W}px;
  height: ${BASE_H}px;
  transform-origin: top center;
  transform:
    translate3d(var(--canvas-x), var(--canvas-y), 0)
    scale(calc(var(--s-contain) * var(--canvas-zoom)));
  will-change: transform;
  pointer-events: auto;
`;

const CanvasBg = styled.img.attrs({
  decoding: "async",
  fetchPriority: "high", // usa camelCase si quieres
  loading: "eager",
})`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
  z-index: 0;
`;

const CanvasContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;          /* columna centrada */
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogoWrap = styled.div`
  position: relative;
  transform: translate3d(var(--logo-x), var(--logo-y), 0);
`;

const LogoImg = styled(motion.img).attrs({
  decoding: "async",
  loading: "eager",
  draggable: false,
})`
  width: var(--logo-w);
  height: auto;
  user-select: none;
  pointer-events: none;
`;

const Buttons = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  gap: 12px; /* reemplaza margin vertical en cada botón */
`;

const ButtonLink = styled.a.attrs({ rel: "noopener noreferrer" })`
  display: inline-block;
  line-height: 0;
`;

const ButtonImg = styled(motion.img).attrs({
  decoding: "async",
  loading: "lazy",
  draggable: false,
})`
  display: block;
  width: var(--btn-w);
  height: auto;
  cursor: pointer;
  user-select: none;
`;

const ButtonGroupWrapper = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  isolation: isolate;
`;

const ButtonsNudge = styled.div`
  position: relative;
  transform: translate3d(var(--buttons-x), var(--buttons-y), 0);
`;

const PhonesCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, var(--phones-ty), 0);
  width: var(--phones-w);
  pointer-events: none;
  z-index: -1;
`;

const PhonesSprite = styled(motion.img).attrs({
  decoding: "async",
  loading: "lazy",
  draggable: false,
})`
  width: 100%;
  height: auto;
  display: block;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${bounce} 3s ease-in-out infinite;
  }
`;
/* ================== ANIMACIONES (constantes fuera del render) ================== */
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
} as const;

const phoneVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 15, delay: 0.3 },
  },
} as const;

/* ================== COMPONENTE ================== */
export default function LandingPage() {
  return (
    <>
      <GlobalStyles />
      <Stage>
        {/* 1) Fondo que SIEMPRE llena pantalla */}
        <FullBleedBg src={bg} />
        <ScaledCanvas initial="hidden" animate="visible" variants={container}>
          <CanvasBg src={bg} alt="Fondo BUK" />

          <CanvasContent>
            <LogoWrap>
              <LogoImg src={logo} alt="BUK Logo" variants={item} />
            </LogoWrap>
            <ButtonGroupWrapper>
              <PhonesCenter>
                <PhonesSprite
                  src={phones}
                  alt="Celulares BUK"
                  variants={phoneVariant}
                />
              </PhonesCenter>
              <ButtonsNudge>
                <Buttons variants={item}>
                  <ButtonLink
                    href="https://where-is-buk.netlify.app"
                    aria-label="Mundo Buk"
                    target="_blank"
                  >
                    <ButtonImg
                      src={btnMundo}
                      alt="MUNDO BUK"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    />
                  </ButtonLink>
                  <ButtonLink
                    href="https://gen-fortunewheel.netlify.app"
                    aria-label="Ruleta Buk"
                    target="_blank"
                  >
                    <ButtonImg
                      src={btnRuleta}
                      alt="RULETA BUK"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    />
                  </ButtonLink>
                </Buttons>
              </ButtonsNudge>
            </ButtonGroupWrapper>
          </CanvasContent>
        </ScaledCanvas>
      </Stage>
    </>
  );
}
