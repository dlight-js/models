import {
  type Modeling,
  Model,
  Pretty,
  Prop,
  Watch,
  required,
} from "@dlightjs/dlight"

interface MediaQueryProps {
  query: string
  defaultState?: boolean
}

/**
 * Represents a media query model.
 * @example
 *
 * import { use } from "@dlightjs/dlight"
 *
 * mediaQuery = use(MediaQuery, { query: "(min-width: 768px)" })
 * console.log(mediaQuery.matches) // Output: true or false depending on the media query
 */
@Model
class MediaQuery {
  @Prop private query: MediaQueryProps["query"] = required
  @Prop private defaultState?: boolean

  private mql = window.matchMedia(this.query)
  public match = this.defaultState ?? Boolean(this.mql.matches)

  @Watch
  private watchQuery() {
    this.mql.addEventListener("change", this.onChange)
  }

  willUnmount() {
    this.mql.removeEventListener("change", this.onChange)
  }

  private onChange() {
    this.match = Boolean(this.mql.matches)
  }
}

export default MediaQuery as Pretty as Modeling<MediaQuery, MediaQueryProps>
