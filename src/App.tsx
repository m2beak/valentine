import { useState, useEffect, useRef } from 'react';
import { Heart, ArrowRight } from 'lucide-react';

function App() {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [buttonSize, setButtonSize] = useState(1);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const noMessages = [
    // TODO: CUSTOMIZE ME - Change these messages to whatever you want!
    "Seriously ?",
    "Good Luck Pressing me",
    "Miss me ?",
    "Stubborn As always",
    "Love seeing you try",
    "You almost did it",
    "Hell No",
    "Better Catch me",
    "Stop Insisting",
    "Can you stop this ?",
  ];

  const moveNoButton = () => {
    if (!noButtonRef.current || !containerRef.current) return;

    // Get actual button dimensions (handling variable text length)
    const { width: buttonWidth, height: buttonHeight } = noButtonRef.current.getBoundingClientRect();
    const container = containerRef.current.getBoundingClientRect();

    // Calculate safe area (keep button within container)
    // Reduce movement range on mobile to keep it clickable
    const padding = 20;
    const maxX = container.width - buttonWidth - padding;
    const maxY = container.height - buttonHeight - padding;

    let newX, newY;
    let attempts = 0;
    const maxAttempts = 50;

    // Try to find a position that isn't too close to the center (Yes button)
    do {
      newX = Math.random() * maxX - maxX / 2;
      newY = Math.random() * maxY - maxY / 2;
      attempts++;

      // Minimum distance from center checks
      // 0,0 is roughly the center where the Yes button is
      // We want to avoid a 100x100 area in the center
      const inForbiddenZone = Math.abs(newX) < 80 && Math.abs(newY) < 60;

      if (!inForbiddenZone) break;
    } while (attempts < maxAttempts);

    setNoPosition({ x: newX, y: newY });
    setNoClickCount(prev => prev + 1);

    // Make YES button slightly bigger each time, but cap it lower on mobile
    const isMobile = window.innerWidth < 768;
    const maxSize = isMobile ? 1.5 : 1.8;
    setButtonSize(prev => Math.min(prev + (isMobile ? 0.1 : 0.15), maxSize));
  };

  const handleYesClick = () => {
    setShowCelebration(true);
  };

  // Floating hearts animation
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
    }));
    setHearts(newHearts);
  }, []);

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-900 via-red-800 to-rose-700 flex items-center justify-center p-4 overflow-hidden relative">
        {/* Floating hearts background */}
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-rose-300/30 animate-float"
            style={{
              left: `${heart.x}%`,
              bottom: '-50px',
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            <Heart size={24 + Math.random() * 32} fill="currentColor" />
          </div>
        ))}

        {/* Confetti effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                backgroundColor: ['#fbbf24', '#f87171', '#fbbf24', '#fca5a5', '#fde047'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 animate-fade-in">
          <div className="mb-8">
            {/* TODO: CUSTOMIZE ME - Add your own celebration GIF or picture here! */}
            <img src="/herheart.svg" alt="Celebration" className="w-48 h-48 mx-auto mt-4 rounded-lg object-cover" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            FINALLY YOU SAID YES
          </h1>
          <p className="text-xl md:text-2xl text-rose-100 mb-8">
            7ayati , You just made me the happiest person alive
          </p>
          <div className="flex justify-center gap-4">
            <Heart className="w-16 h-16 text-rose-300 animate-pulse" fill="currentColor" />
            <Heart className="w-20 h-20 text-rose-200 animate-pulse" style={{ animationDelay: '0.2s' }} fill="currentColor" />
            <Heart className="w-16 h-16 text-rose-300 animate-pulse" style={{ animationDelay: '0.4s' }} fill="currentColor" />
          </div>
          <p className="mt-12 text-rose-200 text-lg">
            I love you , my sweet valentine
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 flex items-center justify-center p-4 overflow-hidden relative"
    >
      {/* Floating hearts background */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-rose-500/20 animate-float"
          style={{
            left: `${heart.x}%`,
            bottom: '-50px',
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <Heart size={20 + Math.random() * 24} fill="currentColor" />
        </div>
      ))}

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 text-center">
          {/* Header with heart */}
          <div className="mb-8">
            <div className="relative inline-block">
              {/* TODO: CUSTOMIZE ME - Change src="/heart.svg" to your own image (e.g., "/my-photo.jpg") */}
              <img
                src="/myheart.jpg"
                alt="Heart"
                className="w-24 h-24 mx-auto animate-heartbeat object-contain"
              />
            </div>
          </div>

          {/* Question */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-md">
            Hey 7abibti
          </h1>
          <p className="text-lg md:text-xl text-rose-100 mb-10 leading-relaxed">
            Will you be my Valentine?
          </p>

          {/* Buttons container */}
          <div className="relative h-32 flex items-center justify-center gap-6">
            {/* YES Button - grows with each no attempt */}
            <button
              onClick={handleYesClick}
              className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-bold py-4 px-10 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-rose-500/50 flex items-center gap-2 group"
              style={{
                transform: `scale(${buttonSize})`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              YES
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* NO Button - moves away */}
            <button
              ref={noButtonRef}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              onTouchStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
                moveNoButton();
              }}
              className={`bg-slate-600 hover:bg-slate-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200 ${noClickCount > 0 ? 'absolute' : ''}`}
              style={noClickCount > 0 ? {
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${noPosition.x}px, ${noPosition.y}px)`,
                transition: 'transform 0.2s ease-out',
              } : undefined}
            >
              {noClickCount > 0 && noClickCount <= noMessages.length
                ? noMessages[noClickCount - 1]
                : noClickCount > noMessages.length
                  ? "Just FUCKING SAY YES"
                  : "NO"
              }
            </button>
          </div>

          {/* Hint text */}
          {noClickCount === 0 && (
            <p className="mt-8 text-rose-300/60 text-sm">
              Go ahead, try saying no.
            </p>
          )}

          {noClickCount > 0 && (
            <p className="mt-8 text-rose-300/80 text-sm animate-fade-in">
              Attempts to make me mad: {noClickCount} | The YES button is growing , you cant escape
            </p>
          )}
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center gap-3 mt-6">
          <Heart className="w-5 h-5 text-rose-400/50" fill="currentColor" />
          <Heart className="w-4 h-4 text-rose-400/30" fill="currentColor" />
          <Heart className="w-5 h-5 text-rose-400/50" fill="currentColor" />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.1);
          }
          28% {
            transform: scale(1);
          }
          42% {
            transform: scale(1.1);
          }
          70% {
            transform: scale(1);
          }
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        .animate-confetti {
          animation: confetti linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
