import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';

// A dropdown styled to match the site (used by the hero form and the contact form). The chosen option shows with
// its icon; the list shows an icon, name and short note for each option, with a tick on the chosen one.
// Works with the mouse, touch and keyboard (arrows, Home/End, Enter, Escape) and closes when you tap outside.
// It opens upwards when there is not enough room below inside its section (e.g. at the bottom of the hero).
// options: [{ label, icon, note }] — the label is the value that is sent.
export default function NiceSelect({ id, label, options, value, onChange, className = '' }) {
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const [hi, setHi] = useState(0); // highlighted option while the list is open
  const box = useRef(null);
  const btn = useRef(null);
  const list = useRef(null);
  const index = Math.max(0, options.findIndex((o) => o.label === value));
  const current = options[index];

  const openList = () => {
    const section = btn.current.closest('section') || document.body;
    const below = Math.min(section.getBoundingClientRect().bottom, window.innerHeight) - btn.current.getBoundingClientRect().bottom;
    const above = btn.current.getBoundingClientRect().top;
    setUp(below < 300 && above > below);
    setHi(index);
    setOpen(true);
  };
  const choose = (i) => { onChange(options[i].label); setOpen(false); btn.current.focus(); };

  useEffect(() => {
    if (!open) return undefined;
    const away = (e) => { if (!box.current.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', away);
    return () => document.removeEventListener('pointerdown', away);
  }, [open]);
  useEffect(() => { if (open) list.current?.children[hi]?.scrollIntoView({ block: 'nearest' }); }, [open, hi]);

  const onKey = (e) => {
    if (!open && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); openList(); return; }
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHi((i) => Math.min(options.length - 1, i + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((i) => Math.max(0, i - 1)); }
    else if (e.key === 'Home') { e.preventDefault(); setHi(0); }
    else if (e.key === 'End') { e.preventDefault(); setHi(options.length - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(hi); }
    else if (e.key === 'Escape' || e.key === 'Tab') { setOpen(false); }
  };

  return (
    <div className={`ns ${open ? 'is-open' : ''} ${up ? 'is-up' : ''} ${className}`} ref={box}>
      <span className="ns-label" id={`${id}-label`}>{label}</span>
      <button
        ref={btn} type="button" className="ns-btn"
        aria-haspopup="listbox" aria-expanded={open} aria-labelledby={`${id}-label ${id}-value`}
        aria-activedescendant={open ? `${id}-opt-${hi}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())} onKeyDown={onKey}
      >
        <span className="ns-ic"><Icon name={current.icon} size={18} /></span>
        <span className="ns-value" id={`${id}-value`}>{current.label}</span>
        <Icon name="down" size={18} className="ns-chev" />
      </button>
      {open && (
        <ul ref={list} className="ns-list" role="listbox" aria-labelledby={`${id}-label`} tabIndex={-1}>
          {options.map((o, i) => (
            <li
              key={o.label} id={`${id}-opt-${i}`} role="option" aria-selected={o.label === current.label}
              className={i === hi ? 'is-hi' : ''}
              onPointerEnter={() => setHi(i)} onClick={() => choose(i)}
            >
              <span className="ns-ic"><Icon name={o.icon} size={18} /></span>
              <span className="ns-txt"><b>{o.label}</b>{o.note && <small>{o.note}</small>}</span>
              {o.label === current.label && <Icon name="check" size={18} className="ns-tick" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
