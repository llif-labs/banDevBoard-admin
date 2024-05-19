import {lazy, Suspense} from "react";
import {Routes, Route} from 'react-router-dom'

const Index = () => {

  const List = lazy(() => import('./List'))
  const Detail = lazy(() => import('./Detail'))

  return<>
    <Suspense>
      <Routes>
        <Route path={'/list'} element={<List />}/>
        <Route path={'/detail/:seq'} element={<Detail />}/>
      </Routes>
    </Suspense>
  </>
}

export default Index
