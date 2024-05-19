import {useEffect, useState} from "react";
import AdminAction from "../../../store/action/adminAction";
import {useNavigate} from "react-router-dom";

const Index = () => {

  const navigate = useNavigate()

  const {getList} = AdminAction()

  const [list, setList] = useState([])


  const handleDetail = (seq: number) => {
    navigate(`/bom/detail/${seq}`)
  }
  useEffect(() => {
    getList(setList)
  }, [])

  console.log(list)

  return <>
    {
      list.length > 1 && list.map( (it: any, key: number) => {
        return <div key={key} onClick={() => handleDetail(it.id)}>
          <p>"{it?.personal.firstName} {it?.personal.lastName}" 님이 작성한 설문</p>
          <p>{it?.created_at}</p>
        </div>
      })
    }
  </>
}

export default Index
