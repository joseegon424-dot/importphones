import { useEffect, useState, useRef } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 1000;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);

      progressRef.current = newProgress;
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Start exit animation
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 700);
        }, 150);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  // Generate grid items with random images
  const gridItems = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    image: `/images/logo-${(i % 6) + 1}.png`,
  }));

  return (
    <div
      ref={preloaderRef}
      className={`preloader ${isExiting ? 'exiting' : ''}`}
    >
      {/* Floating Grid Background */}
      <div className="preloader-grid">
        {gridItems.map((item) => (
          <div
            key={item.id}
            className="preloader-grid-item"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="preloader-content">
        <div className="preloader-logo">
          <span className="preloader-logo-text">
            IMPORTPHONES<span style={{ color: '#DC2626' }}>.NET</span>
          </span>
        </div>

        <div className="preloader-progress">
          <span className="preloader-percent">{progress}</span>
          <span className="preloader-label">%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="preloader-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default Preloader;
