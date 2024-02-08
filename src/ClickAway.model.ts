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
  onClickAway: (e: Event) => void
  events?: string[]
}

@Model
class ClickAway {
  @Prop element: ClickAwayProps["element"] = required
  @Prop onClickAway: ClickAwayProps["onClickAway"] = required
  @Prop events: string[] = ["mousedown", "touchstart"]

  @Watch
  watchEvents() {
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
