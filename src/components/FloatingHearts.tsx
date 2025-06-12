// components/FloatingHearts.tsx
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function FloatingHearts() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1, // Fica no fundo
        },
        particles: {
          number: {
            value: 20,
            density: {
              enable: true,
              area: 800,
            },
          },
          shape: {
            type: "char",
            character: {
              value: ["❤️", "💖", "💕", "💘"],
              font: "Verdana",
              style: "",
              weight: "400",
              fill: true,
            },
          },
          color: {
            value: "#ff69b4",
          },
          size: {
            value: 24,
            random: {
              enable: true,
              minimumValue: 16,
            },
          },
          move: {
            direction: "top",
            enable: true,
            speed: 1.5,
            outModes: {
              default: "out",
            },
          },
          opacity: {
            value: 0.8,
            random: true,
          },
        },
        detectRetina: true,
        background: {
          color: "transparent",
        },
      }}
    />
  );
}
