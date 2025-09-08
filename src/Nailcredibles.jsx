// import { useState } from "react";

// const NailcrediblesEnvelope = () => {
//   const [isOpened, setIsOpened] = useState(false);
//   const [flapOpened, setFlapOpened] = useState(false);
//   const [cardShowing, setCardShowing] = useState(false);

//   const handleSealClick = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (isOpened) return;

//     setIsOpened(true);
//     setFlapOpened(true);

//     // Add initial sparkles
//     addSparkles(10);

//     // Show card after flap opens
//     setTimeout(() => {
//       setCardShowing(true);
//       dropConfetti(35);
//       addSparkles(15);
//     }, 800);
//   };

//   const handleCelebrate = (e) => {
//     e.stopPropagation();
//     dropConfetti(60);
//     addSparkles(30);
//   };

//   const dropConfetti = (amount) => {
//     const colors = [
//       "#8b5cf6",
//       "#ec4899",
//       "#f59e0b",
//       "#10b981",
//       "#3b82f6",
//       "#ef4444",
//     ];

//     for (let i = 0; i < amount; i++) {
//       const confetti = document.createElement("div");
//       confetti.className = "confetti";
//       confetti.style.left = Math.random() * 100 + "vw";
//       confetti.style.backgroundColor =
//         colors[Math.floor(Math.random() * colors.length)];
//       confetti.style.animationDelay = Math.random() * 1 + "s";
//       confetti.style.animationDuration = 2 + Math.random() * 2 + "s";
//       confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

//       document.body.appendChild(confetti);

//       setTimeout(() => {
//         if (confetti.parentNode) {
//           confetti.remove();
//         }
//       }, 4000);
//     }
//   };

//   const addSparkles = (amount) => {
//     for (let i = 0; i < amount; i++) {
//       const sparkle = document.createElement("div");
//       sparkle.className = "sparkle";
//       sparkle.style.left = Math.random() * 100 + "vw";
//       sparkle.style.top = Math.random() * 100 + "vh";
//       sparkle.style.animationDelay = Math.random() * 2 + "s";

//       document.body.appendChild(sparkle);

//       setTimeout(() => {
//         if (sparkle.parentNode) {
//           sparkle.remove();
//         }
//       }, 2500);
//     }
//   };

//   return (
//     <div>
//       <h1 className="title">Dear Yashi Jain,</h1>
//       {isOpened ? (
//         <p className="heading">
//           Congratulations!!!🎉🎉 <br />
//           We are super proud of you!
//         </p>
//       ) : (
//         <p className="heading">
//           Please click on the seal to open the envelope.
//         </p>
//       )}
//       <div className={`envelope-container ${isOpened ? "opened" : ""}`}>
//         <div className="envelope">
//           <div className="envelope-body"></div>
//           <div className={`envelope-flap ${flapOpened ? "opened" : ""}`}></div>
//           <div
//             className={`wax-seal ${flapOpened ? "hidden" : ""}`}
//             onClick={handleSealClick}
//           >
//             <div className="seal-logo"></div>
//           </div>
//           <div className={`card ${cardShowing ? "showing" : ""}`}>
//             <h2>Congrats Nailcredibles! 💅 </h2>
//             <p className="card-message">
//               Happy 5 years to the most <strong>Nailcredible</strong> journey!
//               Your dedication, creativity, and passion have truly made a mark.{" "}
//               You didn't just build a brand, you <i>nailed</i> it!😉 Here's to
//               many more fabulous years ahead!✨
//             </p>
//             <button className="celebrate-btn" onClick={handleCelebrate}>
//               🎉 Tap to Celebrate 🎉
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NailcrediblesEnvelope;

import React, { useState, useEffect, useRef } from "react";

const testimonails = [
  {
    id: 1,
    author: "Amelia Rose",
    content:
      "From the moment our paths intertwined, you filled my days with laughter and my nights with sweet dreams. Your love is a constant melody that plays softly in my heart, making every moment magical.",
    visible: true,
    position: { x: 390, y: 0 },
    zIndex: 10,
  },
  {
    id: 2,
    author: "Oliver James",
    content:
      "Every shared glance and whispered secret adds another verse to our endless love song. You make even the simplest moments sparkle with joy and wonder, as if we're living in our very own romantic film.",
    visible: true,
    position: { x: 390, y: 0 },
    zIndex: 11,
  },
  {
    id: 3,
    author: "Isabella Grace",
    content:
      "In your arms, I find both comfort and adventure. You are the calm in my storm and the spark that ignites my passion, turning every day into a delightful escapade full of surprises.",
    visible: true,
    position: { x: 390, y: 0 },
    zIndex: 12,
  },
];

const LoveLetters = () => {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [lettersVisible, setLettersVisible] = useState(false);
  const [letters, setLetters] = useState(testimonails);

  const [zIndexCounter, setZIndexCounter] = useState(13);
  const [dragState, setDragState] = useState({
    isDragging: false,
    letterId: null,
    offset: { x: 0, y: 0 },
  });

  const lettersContainerRef = useRef(null);

  // Shuffle array utility
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize letter positions
  useEffect(() => {
    const shuffledLetters = shuffleArray(letters);
    setLetters(
      shuffledLetters.map((letter, index) => ({
        ...letter,
        zIndex: 10 + index,
      }))
    );
  }, []);

  // Center letters initially
  useEffect(() => {
    if (lettersContainerRef.current) {
      const containerWidth =
        lettersContainerRef.current.parentElement.offsetWidth;
      const letterWidth = 500; // --letter-x CSS variable value for desktop
      const center = containerWidth / 2 - letterWidth / 2;

      setLetters((prev) =>
        prev.map((letter) => ({
          ...letter,
          position: { ...letter.position, x: center },
        }))
      );
    }
  }, []);

  const handleOpenEnvelope = () => {
    setEnvelopeOpen(true);
    // Show letters after envelope animation completes (0.6s transition)
    setTimeout(() => {
      setLettersVisible(true);
    }, 600);
  };

  const handleCloseLetter = (letterId) => {
    setLetters((prev) =>
      prev.map((letter) =>
        letter.id === letterId ? { ...letter, visible: false } : letter
      )
    );
  };

  const handleMouseDown = (e, letterId) => {
    if (e.target.tagName === "BUTTON") return;

    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDragState({
      isDragging: true,
      letterId: letterId,
      offset: { x: offsetX, y: offsetY },
    });

    // Update z-index for the dragged letter
    setLetters((prev) =>
      prev.map((letter) =>
        letter.id === letterId ? { ...letter, zIndex: zIndexCounter } : letter
      )
    );
    setZIndexCounter((prev) => prev + 1);
  };

  const handleMouseMove = (e) => {
    if (!dragState.isDragging) return;

    const newX = e.clientX - dragState.offset.x;
    const newY = e.clientY - dragState.offset.y;

    setLetters((prev) =>
      prev.map((letter) =>
        letter.id === dragState.letterId
          ? { ...letter, position: { x: newX, y: newY } }
          : letter
      )
    );
  };

  const handleMouseUp = () => {
    setDragState({
      isDragging: false,
      letterId: null,
      offset: { x: 0, y: 0 },
    });
  };

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragState]);

  return (
    <div className="love-letters-app">
      <section className={`cssletter ${!envelopeOpen ? "greeting" : ""}`}>
        {!envelopeOpen && (
          <>
            <h1 className="title">Dear Yashi Jain,</h1>
            <p className="heading">
              Please click on the seal to open the envelope.
            </p>
          </>
        )}
        <div className={`envelope ${envelopeOpen ? "active" : ""}`}>
          <div
            className="heart"
            id="openEnvelope"
            aria-label="Open Envelope"
            onClick={handleOpenEnvelope}
          >
            <div className="seal-logo"></div>
          </div>
          <div className="envelope-flap"></div>
          <div className="envelope-folds">
            <div className="envelope-left"></div>
            <div className="envelope-right"></div>
            <div className="envelope-bottom"></div>
          </div>
        </div>

        <div className="letters" ref={lettersContainerRef}>
          {lettersVisible &&
            letters.map((letter) => (
              <blockquote
                key={letter.id}
                className={`letter center ${
                  dragState.letterId === letter.id ? "dragging" : ""
                }`}
                id={letter.id.toString()}
                tabIndex="0"
                style={{
                  left: `${letter.position.x}px`,
                  top: `${letter.position.y}px`,
                  zIndex: letter.zIndex,
                  display: letter.visible ? "flex" : "none",
                  position:
                    dragState.letterId === letter.id ? "fixed" : "absolute",
                  cursor:
                    dragState.letterId === letter.id ? "grabbing" : "grab",
                }}
                onMouseDown={(e) => handleMouseDown(e, letter.id)}
              >
                <button
                  className="closeLetter"
                  title={`Close ${letter.author}'s letter`}
                  onClick={() => handleCloseLetter(letter.id)}
                >
                  Close {letter.author}'s letter
                </button>
                <p>{letter.content}</p>
                <cite>{letter.author}</cite>
              </blockquote>
            ))}
        </div>
      </section>
    </div>
  );
};

export default LoveLetters;
