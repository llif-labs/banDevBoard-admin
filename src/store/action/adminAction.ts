import {defaultService} from "../service";

const AdminAction = () => {

  const getList = async (setState: any) => {
    await defaultService.handleService({
      endPoint: '/v1/admin/bom/list',
      method: 'get'
    }).then(
      response => setState(response.data.payload),
      error => console.log(error)
    )
  }

  const getDetail = async (seq: string, setState: any) => {
    await defaultService.handleService({
      endPoint: '/v1/admin/bom/detail/'+seq,
      method: 'get'
    }).then(
      response => setState(response.data.payload),
      error => console.log(error)
    )
  }

  return {
    getList,
    getDetail
  }

}

export default AdminAction
