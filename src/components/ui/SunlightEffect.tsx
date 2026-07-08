"use client";

export function SunlightEffect() {
  return (
    <>
      <div id="dappled-light">
        <div id="glow"></div>
        <div id="glow-bounce"></div>
        <div className="perspective">
          <div id="leaves">
            <svg style={{ width: 0, height: 0, position: "absolute" }}>
              <defs>
                <filter id="wind" x="-20%" y="-20%" width="80%" height="80%">
                  <feTurbulence type="fractalNoise" numOctaves="2" seed="1">
                    <animate
                      attributeName="baseFrequency"
                      dur="16s"
                      keyTimes="0;0.33;0.66;1"
                      values="0.005 0.003;0.01 0.009;0.008 0.004;0.005 0.003"
                      repeatCount="indefinite"
                    />
                  </feTurbulence>
                  <feDisplacementMap
                    in="SourceGraphic"
                    scale="30"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <div id="blinds">
            <div className="shutters">
              <div className="shutter"></div>
              <div className="shutter"></div>
              <div className="shutter"></div>
              <div className="shutter"></div>
              <div className="shutter"></div>
              <div className="shutter"></div>
              <div className="shutter"></div>
              <div className="shutter"></div>
              <div className="shutter"></div>
              <div className="shutter"></div>
              <div className="shutter"></div>
              <div className="shutter"></div>
              <div className="shutter"></div>
            </div>
            <div className="vertical">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            #dappled-light {
              --day: #ffffff;
              --evening: #fccc83;
              --dusk: #db7a2a;
              --night: #0e0e0e;
              --dawn: #16132b;
              --morning: #9fb3bf;

              --light: var(--day);
              --dark: var(--night);
              --shadow: #f0f0f0;
              --bounce-light: #faf9f6;
              --timing-fn: cubic-bezier(0.455, 0.190, 0.000, 0.985);

              pointer-events: none;
              position: fixed;
              inset: 0;
              height: 100vh;
              width: 100vw;
              z-index: 0; /* Behind all content and interactive layers */
              overflow: hidden;
            }

            html.dark #dappled-light, .dark #dappled-light {
              --light: var(--night);
              --dark: var(--day);
              --shadow: #080808;
              --bounce-light: #101010;
            }

            #glow {
              position: absolute;
              background: linear-gradient(309deg, var(--bounce-light), var(--bounce-light) 20%, transparent);
              transition: background 1.0s var(--timing-fn);
              height: 100%;
              width: 100%;
              opacity: 0.12;
            }

            #glow-bounce {
              content: "";
              position: absolute;
              background: linear-gradient(355deg, var(--bounce-light) 0%, transparent 30%, transparent 100%);
              transition: background 1.0s var(--timing-fn);
              opacity: 0.12;
              height: 100%;
              width: 100%;
              bottom: 0;
            }

            .perspective {
              position: absolute;
              transition: transform 1.7s var(--timing-fn), opacity 4.0s ease;
              top: -30vh;
              right: 0;
              width: 80vw;
              height: 130vh;
              opacity: 0.02;
              background-blend-mode: darken;
              transform-origin: top right;
              transform-style: preserve-3d;
              transform: matrix3d(0.7500, -0.0625, 0.0000, 0.0008,
                  0.0000, 1.0000, 0.0000, 0.0000,
                  0.0000, 0.0000, 1.0000, 0.0000,
                  0.0000, 0.0000, 0.0000, 1.0000);
            }

            html.dark .perspective, .dark .perspective {
              opacity: 0.05;
              transform: matrix3d(0.8333, 0.0833, 0.0000, 0.0003,
                  0.0000, 1.0000, 0.0000, 0.0000,
                  0.0000, 0.0000, 1.0000, 0.0000,
                  0.0000, 0.0000, 0.0000, 1.0000);
            }

            #leaves {
              position: absolute;
              background-size: cover;
              background-repeat: no-repeat;
              bottom: -20px;
              right: -700px;
              width: 1600px;
              height: 1400px;
              background-image: url("https://raw.githubusercontent.com/jackyzha0/sunlit/main/leaves.png");
              filter: url(#wind);
              animation: billow 8s ease-in-out infinite;
            }

            #blinds {
              position: relative;
              width: 100%;
            }

            #blinds .shutter,
            #blinds .bar {
              background-color: var(--shadow);
              transition: background-color 1.0s var(--timing-fn);
            }

            #blinds>.shutters {
              display: flex;
              flex-direction: column;
              align-items: end;
              gap: 60px;
              transition: gap 1.0s var(--timing-fn);
            }

            html.dark #blinds>.shutters, .dark #blinds>.shutters {
              gap: 20px;
            }

            #blinds>.vertical {
              top: 0;
              position: absolute;
              height: 100%;
              width: 100%;
              display: flex;
              justify-content: space-around;
            }

            .vertical>.bar {
              width: 5px;
              height: 100%;
            }

            .shutter {
              width: 100%;
              height: 40px;
              transition: height 1.0s var(--timing-fn);
            }

            html.dark .shutter, .dark .shutter {
              height: 80px;
            }

            @keyframes billow {
              0% {
                transform: perspective(400px) rotateX(0deg) rotateY(0deg) scale(1);
              }
              25% {
                transform: perspective(400px) rotateX(1deg) rotateY(2deg) scale(1.02);
              }
              50% {
                transform: perspective(400px) rotateX(-4deg) rotateY(-2deg) scale(0.97);
              }
              75% {
                transform: perspective(400px) rotateX(1deg) rotateY(-1deg) scale(1.04);
              }
              100% {
                transform: perspective(400px) rotateX(0deg) rotateY(0deg) scale(1);
              }
            }
          `,
        }}
      />
    </>
  );
}
