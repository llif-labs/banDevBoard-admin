export default function auth() {
  const getAuth = () => {
    const initialValue : string | null = null

    try {
      const item: any = window.localStorage.getItem('persist_root')
      // console.log(item ? JSON.parse(item) : initialValue)
      return item ? JSON.parse(item).authAtom : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  }

  const auth = getAuth()

  if (auth && (auth.token || auth.token.jwt)) {
    /***********
    for Spring Boot
    return {
     Authorization: 'Bearer ' + user.token.jwt
    }
    ***********/

    /***********
    for Node.js Express
    ***********/
    // console.log('Bearer ' + auth.token)
    return {
      'authorization': 'Bearer ' + auth.token
    }
  }
  else {
    return null
  }
}
