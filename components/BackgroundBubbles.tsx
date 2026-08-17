const bubbles = [
  { text: 'AI', className: 'bubble bubble-one' },
  { text: 'Digital', className: 'bubble bubble-two' },
  { text: 'Marketing', className: 'bubble bubble-three' },
  { text: 'AI', className: 'bubble bubble-four' },
];

export default function BackgroundBubbles() {
  return <div aria-hidden="true" className="background-bubbles">{bubbles.map((bubble, index) => <span key={`${bubble.text}-${index}`} className={bubble.className}>{bubble.text}</span>)}</div>;
}
