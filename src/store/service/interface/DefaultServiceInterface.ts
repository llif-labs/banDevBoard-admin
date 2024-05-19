type Methods = | 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH' | 'purge' | 'PURGE' | 'link' | 'LINK' | 'unlink' | 'UNLINK'
type ResponseType = | 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

interface DefaultServiceInterface {
  method: Methods,
  endPoint: string,
  headers?: any,
  params?: any,
  data?: any,
  body?: any,
  responseType?: ResponseType
  standAlone?: any
}

interface ServiceParamsHeaderInterface {
  headers: Headers | any
}
interface Headers {
  authorization : string
}

export type {
  Methods,
  ResponseType,
  DefaultServiceInterface,
  ServiceParamsHeaderInterface
}
