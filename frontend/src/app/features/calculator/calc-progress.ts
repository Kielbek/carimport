/**
 * A randomised timeline for the "calculating" screen: the bar moves at varying speed and, once or twice,
 * nearly stalls at a random point (creeping by a percent or two), like a real job would.
 */
export interface ProgressPlan {
  /** Total length in ms - the result is not shown before this. */
  readonly duration: number;
  /** Keyframes [ms, percent], ascending, from [0, 0] to [duration, 100]. */
  readonly keys: readonly (readonly [number, number])[];
}

export function randomPlan(rand: () => number = Math.random): ProgressPlan {
  const between = (a: number, b: number) => a + rand() * (b - a);

  // 4-6 moving segments with random breakpoints between 0 and 100
  const count = 4 + Math.floor(rand() * 3);
  const cuts = Array.from({ length: count - 1 }, () => between(6, 90)).sort((a, b) => a - b);
  const points = [0, ...cuts, 100];

  // 1-2 of the inner breakpoints get a near-stall
  const stalls = new Set<number>();
  const wanted = 1 + Math.floor(rand() * 2);
  while (stalls.size < wanted) {
    stalls.add(1 + Math.floor(rand() * cuts.length));
  }

  const keys: [number, number][] = [[0, 0]];
  let t = 0;
  let p = 0;
  for (let i = 1; i < points.length; i++) {
    const target = Math.max(points[i], p);
    t += (target - p) * between(10, 38);
    p = target;
    keys.push([t, p]);
    if (stalls.has(i)) {
      // crawls on by 1-3 % instead of freezing, never past the next breakpoint
      const creep = Math.max(0, Math.min(between(1, 3), points[i + 1] - p - 1));
      t += rand() < 0.3 ? between(900, 1500) : between(350, 800);
      p += creep;
      keys.push([t, p]);
    }
  }

  // the whole run takes 2.6-3.5 s
  const duration = between(2600, 3500);
  return { duration: Math.round(duration), keys: keys.map(([ms, v]) => [(ms * duration) / t, v] as const) };
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
