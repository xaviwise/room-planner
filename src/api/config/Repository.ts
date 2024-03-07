import Xhr from './Xhr'

const xhr = Xhr.builder()
  .setBaseUrl(import.meta.env.VITE_APP_ROOT_API)
  .build()

export {
  xhr
}
