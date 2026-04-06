"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

/** Neural-network style linked dots: faint, repulse on cursor, slow opacity “breathing”. */
export default function NeuralParticlesBackground() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: false,
      background: {
        color: { value: "transparent" },
      },
      fpsLimit: 60,
      detectRetina: true,
      interactivity: {
        detectsOn: "window" as const,
        events: {
          onHover: {
            enable: true,
            mode: "repulse" as const,
          },
        },
        modes: {
          repulse: {
            distance: 110,
            duration: 0.35,
            factor: 42,
            speed: 1.1,
            maxSpeed: 2.5,
          },
        },
      },
      particles: {
        number: {
          value: 72,
          density: {
            enable: true,
            width: 1400,
            height: 1400,
          },
        },
        color: { value: "#ffffff" },
        opacity: {
          value: { min: 0.1, max: 0.38 },
          animation: {
            enable: true,
            speed: 0.22,
            sync: false,
            destroy: "none" as const,
            startValue: "random" as const,
            count: 0,
            decay: 0,
            delay: 0,
            mode: "auto" as const,
          },
        },
        size: {
          value: { min: 1, max: 2.2 },
        },
        links: {
          enable: true,
          distance: 132,
          color: "#ffffff",
          opacity: 0.14,
          width: 0.55,
          triangles: { enable: false },
        },
        move: {
          enable: true,
          speed: 0.28,
          direction: "none" as const,
          random: true,
          straight: false,
          outModes: { default: "bounce" as const },
        },
      },
    }),
    []
  );

  if (!engineReady) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
      aria-hidden
    >
      <Particles
        id="neural-particles"
        className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
        options={options}
      />
    </div>
  );
}
