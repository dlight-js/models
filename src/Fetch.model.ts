import type { Modeling, Pretty } from "@dlightjs/dlight"
import { Model, Prop, Watch, required } from "@dlightjs/dlight"

interface FetchProps {
  url: string
}

@Model
class Fetch {
  @Prop url: FetchProps["url"] = required
  data = null
  loading = false

  @Watch
  private async fetch() {
    this.loading = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    this.data = await fetch(this.url).then(res => res.json())
    this.loading = false
  }
}

export default Fetch as Pretty as Modeling<Fetch, FetchProps>
