const NODES = [
  { x: 40, y: 40, r: 3, pulse: true },
  { x: 120, y: 20, r: 2.5 },
  { x: 90, y: 100, r: 4, pulse: true },
  { x: 200, y: 60, r: 2.5 },
  { x: 170, y: 140, r: 3 },
  { x: 260, y: 30, r: 3, pulse: true },
  { x: 300, y: 110, r: 2.5 },
  { x: 240, y: 170, r: 3.5 },
  { x: 340, y: 190, r: 2.5 },
  { x: 60, y: 190, r: 2.5 },
]

const EDGES = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 4],
  [3, 5],
  [4, 7],
  [5, 6],
  [6, 7],
  [6, 8],
  [7, 8],
  [2, 9],
  [4, 9],
]

export function NeuralNetBackdrop() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 380 220"
      preserveAspectRatio="xMaxYMid slice"
      className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-2/5 text-primary opacity-25 select-none sm:block"
    >
      {EDGES.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke="currentColor"
          strokeWidth="0.75"
        />
      ))}
      {NODES.map((node, i) => (
        <circle
          key={i}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill="currentColor"
          className={node.pulse ? "animate-pulse-node" : undefined}
        />
      ))}
    </svg>
  )
}
