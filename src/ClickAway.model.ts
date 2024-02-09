import {
  type Modeling,
  type Pretty,
  Watch,
  Model,
  Prop,
  required,
} from "@dlightjs/dlight"

import { off, on } from "./utils"

interface ClickAwayProps {
  element: HTMLElement
  onClickAway: (event: Event) => void
  events?: string[]
}

/**
 * Represents a click away model.
 * @example
 *
 * import { use } from "@dlightjs/dlight"
 *
 * clickAway = use(ClickAway, {
 *    element: document.body,
 *    onClickAway: (event) => console.log('clicked away', event),
 * })
 */
@Model
class ClickAway {
  @Prop private element: HTMLElement = required
  @Prop private onClickAway: (event: Event) => void = required
  @Prop private events: string[] = ["mousedown", "touchstart"]

  @Watch
  private watchEvents() {
    for (const event of this.events) {
      on(document, event, this.handler.bind(this))
    }
  }

  willUnmount() {
    for (const event of this.events) {
      off(document, event, this.handler.bind(this))
    }
  }

  private handler(event: Event) {
    if (this.element && !this.element.contains(event.target as Node)) {
      this.onClickAway(event)
    }
  }
}

export default ClickAway as Pretty as Modeling<ClickAway, ClickAwayProps>
