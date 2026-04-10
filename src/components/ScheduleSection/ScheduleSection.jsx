import React, { useEffect, useRef } from 'react';
import './ScheduleSection.css';

const scheduleData = [
  { day: 'Monday',    time: '4:00 PM - 8:00 PM',    level: 'Beginners & Pro',      icon: '🟢' },
  { day: 'Tuesday',   time: '5:00 PM - 9:00 PM',    level: 'Competitive Squad',    icon: '🔥' },
  { day: 'Wednesday', time: '4:00 PM - 8:00 PM',    level: 'Beginners & Pro',      icon: '🟢' },
  { day: 'Thursday',  time: '5:00 PM - 9:00 PM',    level: 'Competitive Squad',    icon: '🔥' },
  { day: 'Friday',    time: '8:00 AM - 12:00 PM',   level: 'Open Training',        icon: '⚡' },
  { day: 'Weekend',   time: 'Closed',                level: 'Competitions / Rest',  icon: '🏆' },
];

const ScheduleSection = () => {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const tableRef   = useRef(null);
  const rowRefs    = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (tableRef.current)  observer.observe(tableRef.current);
    rowRefs.current.forEach((row) => { if (row) observer.observe(row); });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="classes" className="schedule-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <p className="section-eyebrow">Training Times</p>
          <h2 className="section-title">Class <span className="highlight">Schedule</span></h2>
          <p className="section-subtitle">Find the perfect time to dive in. Programs run year-round.</p>
        </div>

        <div className="schedule-table-wrap glass-panel reveal" ref={tableRef}>
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Time</th>
                <th>Program Focus</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((item, index) => (
                <tr
                  key={index}
                  className="schedule-row reveal"
                  ref={(el) => (rowRefs.current[index] = el)}
                  style={{ transitionDelay: `${index * 0.08}s` }}
                >
                  <td className="day-col">
                    <span className="day-icon">{item.icon}</span>
                    {item.day}
                  </td>
                  <td className="time-col">{item.time}</td>
                  <td className="level-col">
                    <span className="level-badge">{item.level}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export const getScheduleData = () => scheduleData;

export default ScheduleSection;
