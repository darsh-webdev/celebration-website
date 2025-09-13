import React, { useState, useEffect, useRef } from "react";
import useWindowDimensions from "./useWindowDimensions";
import { testimonials } from "./testimonials";

// Shuffle array utility
const shuffleArray = (array) => {
  // Get all items except the last one
  const itemsToShuffle = array.slice(0, -1);
  const lastItem = array[array.length - 1];

  // Fisher-Yates shuffle for the items (excluding last)
  for (let i = itemsToShuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [itemsToShuffle[i], itemsToShuffle[j]] = [
      itemsToShuffle[j],
      itemsToShuffle[i],
    ];
  }

  // Return shuffled items + last item
  return [lastItem, ...itemsToShuffle];
};

const NailcrediblesEnvelope = () => {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [lettersVisible, setLettersVisible] = useState(false);
  const [letters, setLetters] = useState(shuffleArray(testimonials));
  const lettersContainerRef = useRef(null);
  const { width } = useWindowDimensions();

  // Center letters initially
  useEffect(() => {
    if (lettersContainerRef.current) {
      const containerWidth =
        lettersContainerRef.current.parentElement.offsetWidth;
      const letterWidth = width <= 450 ? 320 : 550; // --letter-x CSS variable value for desktop
      const center = containerWidth / 2 - letterWidth / 2;

      setLetters((prev) =>
        prev.map((letter) => ({
          ...letter,
          position: { ...letter.position, x: center },
        }))
      );
    }
  }, [width]);

  const handleOpenEnvelope = () => {
    setEnvelopeOpen(true);
    setLettersVisible(true);
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
    // Update z-index for the dragged letter
    setLetters((prev) =>
      prev.map((letter) =>
        letter.id === letterId ? { ...letter, zIndex: 2 } : letter
      )
    );
  };

  const handleCelebrate = (e) => {
    e.stopPropagation();
    dropConfetti(60);
    addSparkles(30);
  };

  const dropConfetti = (amount) => {
    const colors = [
      "#8b5cf6",
      "#ec4899",
      "#f59e0b",
      "#10b981",
      "#3b82f6",
      "#ef4444",
    ];

    for (let i = 0; i < amount; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 1 + "s";
      confetti.style.animationDuration = 2 + Math.random() * 2 + "s";
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

      document.body.appendChild(confetti);

      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.remove();
        }
      }, 4000);
    }
  };

  const addSparkles = (amount) => {
    for (let i = 0; i < amount; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = Math.random() * 100 + "vw";
      sparkle.style.top = Math.random() * 100 + "vh";
      sparkle.style.animationDelay = Math.random() * 2 + "s";

      document.body.appendChild(sparkle);

      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.remove();
        }
      }, 2500);
    }
  };

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
                className={`letter center`}
                id={letter.id.toString()}
                style={{
                  left: `${letter.position.x}px`,
                  top: `${letter.position.y}px`,
                  zIndex: letter.zIndex,
                  display: letter.visible ? "flex" : "none",
                  position: "absolute",
                  cursor: "pointer",
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
                <p className="letter-content">{letter.content}</p>

                {letter.id === 20 ? (
                  <>
                    <button className="celebrate-btn" onClick={handleCelebrate}>
                      🎉 Tap to Celebrate 🎉
                    </button>
                  </>
                ) : (
                  <cite>{letter.author}</cite>
                )}
              </blockquote>
            ))}
        </div>
      </section>
    </div>
  );
};

export default NailcrediblesEnvelope;
