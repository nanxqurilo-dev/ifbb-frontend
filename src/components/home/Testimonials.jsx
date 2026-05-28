// src/components/TestimonialsMarqueeFullBleed.jsx
import React from "react";

const testimonials = [
  {
    name: "Cameron Williamson",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: `The certificate course exceeded all my expectations. The program was well-structured, hands-on, and taught by experienced professionals who truly care about your growth. I gained in-depth knowledge about fitness, nutrition, and training techniques that not only helped me improve personally but also prepared me to start a career in the fitness industry. This course gave me both the skills and the confidence I needed. Highly recommended.`,
  },
  {
    name: "Olivia Flores",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: `Amazing course — practical and motivating. The instructors were very supportive and the curriculum was current. I was able to confidently start working with clients after finishing.`,
  },
  {
    name: "Samuel Lee",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    text: `Great balance of theory and hands-on practice. The certificate opened new career opportunities for me. Highly recommended for anyone serious about fitness.`,
  },
  {
    name: "Priya Sharma",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: `Well-structured classes and supportive mentors. I learned a lot about programming workouts and nutrition. It truly helped me switch careers.`,
  },
  {
    name: "Diego Ramos",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
    text: `The practical lab sessions were the highlight. Trainers put a lot of emphasis on correct technique and client communication.`,
  },
  {
    name: "Maya Patel",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    text: `Totally worth it. I got both the knowledge and the confidence to start my own small fitness coaching business.`,
  },
  {
    name: "Liam Johnson",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    text: `Comprehensive course with updated material. Realistic case studies and useful templates for starting a practice.`,
  },
  {
    name: "Sara Khan",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    text: `Instructors are experts. Great community and placement help. Loved the hands-on training.`,
  },
];

const TestimonialsMarqueeFullBleed = () => {
  const loopItems = [...testimonials, ...testimonials];
  const SPEED_MULTIPLIER = 3.6;
  const minDuration = 18;
  const durationSeconds = Math.max(minDuration, testimonials.length * SPEED_MULTIPLIER);

  return (
    <section
      className="relative w-screen left-0 overflow-hidden bg-white"
      style={{ paddingTop: "6rem", paddingBottom: "2.5rem" }} 
    >
      {/* Title kept within normal content width */}
      <div className="max-w-7xl pb-10 mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">Testimonials</h2>
      </div>

      <style>{`
        /* continuous marquee */
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }

        }

        .marquee-viewport-full {
          width: 100vw;
          position: relative;
          height:100%;
          marginTop:500px;
        }

        .marquee-track-full {
          display: flex;
          gap: 1.25rem;
          align-items: stretch;
          padding-left: 0;  /* no external left/right padding so full-bleed */
          padding-right: 0;
          will-change: transform;
        }

        /* CARD: position relative so avatar can be absolutely placed */
        .testimonial-card-full {
          position: relative;
          flex: 0 0 22rem;
          background: #f8fafc;
          border-radius: 12px;
          padding: 2.25rem 1.25rem 1.25rem; /* increased top padding to fit avatar */
          box-shadow: 0 6px 18px rgba(12,12,12,0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* AVATAR: absolute, centered horizontally; no negative margin that could get cut */
        .testimonial-avatar-full {
          position: absolute;
          top: calc(-1 * (72px / 2)); /* lift half the avatar height */
          left: 50%;
          transform: translateX(-50%);
          width: 72px;
          height: 72px;
          border-radius: 9999px;
          object-fit: cover;
          border: 4px solid #fff;
          box-shadow: 0 6px 14px rgba(12,12,12,0.08);
          -webkit-user-drag: none;
          user-drag: none;
          user-select: none;
          pointer-events: none; /* keeps smoothness */
        }

        .testimonial-text-full {
          color: #374151;
          font-size: 0.95rem;
          line-height: 1.45;
          // margin-top: 2.25rem; /* gives space below avatar */
          max-height: 6.6rem;
          overflow: hidden;
        }

        .testimonial-name-full {
          margin-top: 0.9rem;
          font-weight: 600;
          color: #111827;
        }

        /* responsive adjustments */
        @media (max-width: 1024px) {
          .testimonial-card-full { flex: 0 0 20rem; padding-top: 2rem; }
          .testimonial-avatar-full { width: 64px; height: 64px; top: calc(-1 * (64px / 2)); }
        }
        @media (max-width: 768px) {
          .testimonial-card-full { flex: 0 0 18.5rem; padding-top: 1.75rem; }
          .testimonial-avatar-full { width: 56px; height: 56px; top: calc(-1 * (56px / 2)); }
          .marquee-track-full { gap: 0.75rem; }
        }
        @media (max-width: 480px) {
          .testimonial-card-full { flex: 0 0 16rem; padding-top: 1.5rem; }
          .testimonial-avatar-full { width: 52px; height: 52px; top: calc(-1 * (52px / 2)); }
        }
      `}</style>

      <div className="marquee-viewport-full">
        <div
          className="marquee-track-full"
          style={{
            animation: `marquee-left ${durationSeconds}s linear infinite`,
          }}
          aria-hidden="false"
        >
          {loopItems.map((t, idx) => (
            <article
              key={`tm-${idx}-${t.name}`}
              className="testimonial-card-full"
              role="group"
              aria-label={`Testimonial by ${t.name}`}
            >
              <img
                src={t.image}
                alt={t.name}
                className="testimonial-avatar-full"
                draggable={false}
              />
              <p className="testimonial-text-full">{t.text}</p>
              <h3 className="testimonial-name-full">{t.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsMarqueeFullBleed;
