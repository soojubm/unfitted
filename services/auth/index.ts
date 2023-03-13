// 2-1. query string으로 포함할 수도 있으나 보안 이슈
// * refreshToken을 secure httpOnly 쿠키로, accessToken은 JSON payload로 받아와서 웹 어플리케이션 내 로컬 변수로 이용
// * 이를 통해 CSRF 취약점 공격 방어하고, XSS 취약점 공격으로 저장된 유저 정보 읽기는 막을 수 있음
// * 하지만 XSS 취약점을 통해 API 콜을 보낼 때는 무방비하니 XSS 자체를 막기 위해 서버와 클라이언트 모두 노력해야 함
// 서버측에서 응답을 하면서 쿠키를 설정 해 줄 때 httpOnly 값을 활성화를 해주면, 네트워크 통신 상에서만 해당 쿠키가 붙게 됩니다. 따라서, 브라우저상에서는, 자바스크립트로 토큰값에 접근하는것이 불가능해지죠.
// 두번째 대안에 대한 단점은, 쿠키가 한정된 도메인에서만 사용이 된다는 점 입니다. 이 부분은, 토큰이 필요해질 때 현재 쿠키에 있는 토큰을 사용하여 새 토큰을 문자열로 받아올 수 있게 하는 API를 구현하여 해결하면 됩니다.
// 또 다른 단점은, XSS의 위험에서 완벽히 해방되는 대신, CSRF 공격의 위험성이 생긴다는 점 입니다. CSRF의 경우엔 HTTP 요청 레퍼러 체크, 그리고 CSRF 토큰의 사용을 통하여 방지 할 수 있습니다.

import { getSearchParams } from 'services/utils'

import { authAxios, userAxios } from 'services/authAxios'

export type UserInfoType = {
  username: string
  password: string
}

export type FormDataType = {
  client_id: string
  grant_type: string
}

const formData: FormDataType = {
  client_id: '',
  grant_type: 'password',
}

// 이미 만료된 것을 알고 있는데 왜 또 요청하냐.

function populateStorage() {}

const tokenUri = ''

export async function login(userInfo: UserInfoType) {
  try {
    const params: UserInfoType & FormDataType = { ...userInfo, ...formData }
    const response = await userAxios.post(tokenUri, getSearchParams(params))

    return response.data
  } catch (error) {
    console.error('login error', error)
  }
}

export function logout() {
  localStorage.clear()
}

export async function postPassword(data: any) {
  try {
    const response = authAxios
      .put('/user/password', data)
      .then(response => {
        return response
      })
      .catch(error => {
        const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
        const errorArray = error.response.data.message.split('error_description')
        alert(errorArray[1].replace(reg, '')) // TODO message 로 변경 필요
        return error.response
      })

    return response
  } catch (error) {}
}

// const options = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   body: getSearchParams(params),
// }
// const response = await fetch(url, options)
