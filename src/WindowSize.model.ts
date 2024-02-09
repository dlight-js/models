import type { Modeling, Pretty } from "@dlightjs/dlight"
import { Model, Prop } from "@dlightjs/dlight"

import { isBrowser, off, on } from "./utils"

interface WindowSizeProps {
  initialWidth?: number
  initialHeight?: number
}

/**
 * Represents window size model.
 * @example
 *
 * import { use } from "@dlightjs/dlight"
 *
 * windowSize = use(WindowSize, {
 *    // Optional initial values
 *    initialWidth: 1920,
 *    initialHeight: 1080,
 * })
 *
 * console.log(windowSize.width) // Output: 1920
 * console.log(windowSize.height) // Output: 1080
 */
@Model
class WindowSize {
  @Prop private initialWidth?: number = Infinity
  @Prop private initialHeight?: number = Infinity

  width = isBrowser() ? window.innerWidth : this.initialWidth
  height = isBrowser() ? window.innerHeight : this.initialHeight

  willMount() {
    on(window, "resize", this.handler.bind(this))
  }

  willUnmount() {
    off(window, "resize", this.handler.bind(this))
  }

  private handler() {
    this.width = window.innerWidth
    this.height = window.innerHeight
  }
}

export default WindowSize as Pretty as Modeling<WindowSize, WindowSizeProps>
