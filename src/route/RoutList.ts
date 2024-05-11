import DefaultLayout from "../layout/DefaultLayout";
import Bom from "../page/bom";

export interface RouteInterface {
  name: string
  path: string
  element: any
  child?: RouteInterface[]
}

const adminRouter: RouteInterface[] = [
  {name: '기본정보', path: '/bom/*', element: Bom}
]

export const Layout: RouteInterface[] = [
  {name: 'defualtLayout', path: '', element: DefaultLayout, child: adminRouter}
]
