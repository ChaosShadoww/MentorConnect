import React, { useEffect, useRef, useState } from 'react';
import MentorBoxes, { type Mentor } from './MentorBoxes';
import './BoxesBar.css'; 

const defaultTestMentors: Mentor[] = [
  { id: '1', name: 'John Doe', title: 'Software Engineer' },
  { id: '2', name: 'Jane Smith', title: 'Data Scientist' },
  { id: '3', name: 'Mike Johnson', title: 'Product Manager' },
  { id: '4', name: 'Sarah Williams', title: 'UX Designer' },
];

type Props = {
  mentors?: Mentor[];
  cardWidth?: number;
  gap?: number;
  onCardClick?: (m: Mentor) => void;
};

export default function BoxesBar({
  mentors = defaultTestMentors,
  cardWidth = 260,
  gap = 16,
  onCardClick,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft + el.clientWidth + 5 < el.scrollWidth);
    };
    update();
    el.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [mentors]);

  const scrollAmount = Math.round(cardWidth + gap);

  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

  const scrollToOffset = (targetLeft: number) => {
    const el = containerRef.current;
    if (!el) return;
    const clamped = clamp(targetLeft, 0, el.scrollWidth - el.clientWidth);
    el.scrollTo({ left: clamped, behavior: 'smooth' });
  };

  const handleScrollBy = (dir: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;
    const amount = dir === 'left' ? -scrollAmount : scrollAmount;
    scrollToOffset(el.scrollLeft + amount);
  };

  return (
    <div className="boxesbar-wrapper">
      <button
        className="scroll-btn left"
        onClick={() => handleScrollBy('left')}
        aria-label="Scroll left"
        disabled={!canScrollLeft}
      >
        ‹
      </button>

      <div ref={containerRef} className="boxesbar" role="list" tabIndex={0} aria-label="Mentors list">
        {mentors.map((m, i) => (
            <MentorBoxes key={m.id ?? i} mentor={m} onClick={onCardClick} />
        ))}
      </div>

      <button
        className="scroll-btn right"
        onClick={() => handleScrollBy('right')}
        aria-label="Scroll right"
        disabled={!canScrollRight}
      >
        ›
      </button>
    </div>
  );
}