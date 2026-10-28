/**
 * A randomised timeline for the "calculating" screen: the bar moves at varying speed and stalls
 * at random points (sometimes briefly, sometimes for a couple of seconds), like a real job would.
 */
export interface ProgressPlan {
  /** Total length in ms - the result is not shown before this. */
  readonly duration: number;
  /** Keyframes [ms, percent], ascending, from [0, 0] to [duration, 100]; equal percents are stalls. */
  readonly keys: readonly (readonly [number, number])[];
}

const MAX_MS = 7500;

export function randomPlan(rand: () => number = Math.random): ProgressPlan {
  const between = (a: number, b: number) => a + rand() * (b - a);

  // 5-8 moving segments with random breakpoints between 0 and 100
  const count = 5 + Math.floor(rand() * 4);
  const cuts = Array.from({ length: count - 1 }, () => between(4, 96)).sort((a, b) => a - b);
  const points = [0, ...cuts, 100];

  // 2-4 of the inner breakpoints get a stall
  const stalls = new Set<number>();
  const wanted = 2 + Math.floor(rand() * 3);
  while (stalls.size < Math.min(wanted, cuts.length)) {
    stalls.add(1 + Math.floor(rand() * cuts.length));
  }

  const keys: [number, number][] = [[0, 0]];
  let t = 0;
  for (let i = 1; i < points.length; i++) {
    t += (points[i] - points[i - 1]) * between(10, 38);
    keys.push([t, Math.round(points[i])]);
    if (stalls.has(i)) {
      t += rand() < 0.3 ? between(1200, 2400) : between(250, 900);
      keys.push([t, Math.round(points[i])]);
    }
  }

  const scale = t > MAX_MS ? MAX_MS / t : 1;
  return { duration: Math.round(t * scale), keys: keys.map(([ms, p]) => [ms * scale, p] as const) };
}

/** Percent shown at `ms` into the plan; eases within each moving segment. */
export function progressAt(plan: ProgressPlan, ms: number): number {
  const { keys } = plan;
  for (let i = 1; i < keys.length; i++) {
    const [t1, p1] = keys[i];
    if (ms <= t1) {
      const [t0, p0] = keys[i - 1];
      const x = t1 > t0 ? (ms - t0) / (t1 - t0) : 1;
      const eased = x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
      return p0 + (p1 - p0) * eased;
    }
  }
  return 100;
}
