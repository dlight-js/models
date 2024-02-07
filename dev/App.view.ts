import { View, use, div, Pretty, Typed } from "@dlightjs/dlight"
import { Fetch } from "../src"

@View
class App {
  postId = 1
  res = use(Fetch, {
    url: `https://jsonplaceholder.typicode.com/posts/${this.postId}`,
  })

  View() {
    if (this.res.loading) {
      div("Loading...")
    } else {
      div(JSON.stringify(this.res.data))
    }
  }
}

export default App as Pretty as Typed
