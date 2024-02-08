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
  @Prop query: MediaQueryProps["query"] = required
  private mql = window.matchMedia(this.query)
  public matches = Boolean(this.mql.matches)

  @Watch
  watchQuery() {
    this.mql.addEventListener("change", this.onChange)
  }

  willUnmount() {
    this.mql.removeEventListener("change", this.onChange)
  }

  private onChange() {
    this.matches = Boolean(this.mql.matches)
  }
}

export default MediaQuery as Pretty as Modeling<MediaQuery, MediaQueryProps>
