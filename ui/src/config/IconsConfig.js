import { library } from '@fortawesome/fontawesome-svg-core'

import {faComment, faPencilAlt, faCoffee, faNewspaper} from "@fortawesome/free-solid-svg-icons/index";

export function initFontAwesomeIcons() {
  library.add(faComment, faPencilAlt, faCoffee, faNewspaper)
}
