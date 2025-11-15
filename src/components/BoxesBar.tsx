import React, { useEffect, useRef, useState } from 'react';
import MentorBoxes, { type Mentor } from './MentorBoxes';
import './BoxesBar.css';
import { supabase } from '../supabaseClient';

type Props = {
  mentors?: Mentor[];
  cardWidth?: number;
  gap?: number;
  onCardClick?: (m: Mentor) => void;
};

export default function BoxesBar({
  mentors: mentorsProp,
  cardWidth = 260,
  gap = 16,
  onCardClick,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [mentors, setMentors] = useState<Mentor[]>(mentorsProp ?? []);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (mentorsProp && mentorsProp.length > 0) {
      setMentors(mentorsProp);
      return;
    }

    let isMounted = true;
    setLoading(true);

    (async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id, name, email, career, role, created_at')
          .eq('role', 'mentor')
          .order('created_at', { ascending: false })
          .limit(100);

        if (error) {
          console.error('Error fetching mentors:', error);
          return;
        }
        if (!isMounted) return;

        const mapped: Mentor[] = (data ?? []).map((row: any) => ({
          id: row.id,
          name: row.name ?? `mentor-${row.id}`, 
          title: row.career ?? '',
        }));
        setMentors(mapped);
      } catch (err) {
        console.error('Unexpected error loading mentors:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [mentorsProp]);

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

      <div
        ref={containerRef}
        className="boxesbar"
        role="list"
        tabIndex={0}
        aria-label="Mentors list"
      >
        {loading ? (
          <div style={{ padding: 16 }}>Loading mentors…</div>
        ) : (
          mentors.map((m, i) => (
            <MentorBoxes key={m.id ?? i} mentor={m} onClick={onCardClick} />
          ))
        )}
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