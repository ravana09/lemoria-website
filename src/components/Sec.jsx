import { Mark } from './Logo.jsx';

// Wrapper every home section uses: anchor id + a faint floating logo symbol in the background.
export default function Sec({ id, className = '', children, ...rest }) {
  return (
    <section id={`sec-${id}`} className={`sec ${className}`} {...rest}>
      <span className="sec-deco" aria-hidden="true"><Mark size={260} /></span>
      {children}
    </section>
  );
}
