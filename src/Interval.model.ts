import type { Modeling, Pretty } from "@dlightjs/dlight"
import { Model, Prop, Watch, required } from "@dlightjs/dlight"

interface IntervalProps {
  onTick: () => void
  delay?: number | null
}

/**
 * Represents an interval model.
 * @example
 *
 * import { use } from "@dlightjs/dlight"
 *
 * interval = use(Interval, {
 *    onTick: () => console.log('tick'),
 *    delay: 1000
 * })
 */
@Model
class Interval {
  @Prop private onTick: IntervalProps["onTick"] = required
  @Prop private delay?: IntervalProps["delay"] = null

  private intervalId: number | null = null

  @Watch
  private watchDelay() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }

    if (this.delay) {
      this.intervalId = setInterval(this.onTick, this.delay || 0)
    }
  }

  willUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
}

export default Interval as Pretty as Modeling<Interval, IntervalProps>
