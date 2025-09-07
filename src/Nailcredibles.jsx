import { useState } from "react";

const NailcrediblesEnvelope = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [flapOpened, setFlapOpened] = useState(false);
  const [cardShowing, setCardShowing] = useState(false);

  const handleSealClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOpened) return;

    setIsOpened(true);
    setFlapOpened(true);

    // Add initial sparkles
    addSparkles(10);

    // Show card after flap opens
    setTimeout(() => {
      setCardShowing(true);
      dropConfetti(35);
      addSparkles(15);
    }, 800);
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
    <div>
      <h1 className="title">Dear Yashi Jain,</h1>
      <p className="heading">Please click on the seal to open the envelope.</p>
      <div className={`envelope-container ${isOpened ? "opened" : ""}`}>
        <div className="envelope">
          <div className="envelope-body"></div>
          <div className={`envelope-flap ${flapOpened ? "opened" : ""}`}></div>
          <div
            className={`wax-seal ${flapOpened ? "hidden" : ""}`}
            onClick={handleSealClick}
          >
            <div className="seal-logo"></div>
          </div>
          <div className={`card ${cardShowing ? "showing" : ""}`}>
            <h2>Congrats Nailcredibles! 💅 </h2>
            <p className="card-message">
              Happy 5 years to the most <strong>Nailcredible</strong> journey!
              Your dedication, creativity, and passion have truly made a mark.{" "}
              You didn't just build a brand, you <i>nailed</i> it!😉 Here's to
              many more fabulous years ahead!✨
            </p>
            <button className="celebrate-btn" onClick={handleCelebrate}>
              🎉 Tap to Celebrate 🎉
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NailcrediblesEnvelope;
