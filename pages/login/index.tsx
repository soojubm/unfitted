import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'

import { atom, useRecoilState } from 'recoil'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import jwt_decode from 'jwt-decode'

import Button from 'components/button'
import Textfield from 'components/textfield'
import Alert from 'components/alert'
import Titlebar from 'components/titlebar'

import { login } from 'services/auth'

import { ACCESS_TOKEN, REFRESH_TOKEN } from 'services/constants'
import { ROUTES } from 'services/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type FormValues = {
  username: string
  password: string
}

const initialValues = { username: '', password: '' }

export const userState = atom({
  key: 'userState',
  default: null,
})

function Login() {
  const { t } = useTranslation('login')

  const [user, setUser] = useRecoilState(userState)
  const [isLoginError, setIsLoginError] = useState(false)

  const router = useRouter()

  const { control, handleSubmit, setFocus } = useForm<FormValues>({
    defaultValues: initialValues,
  })

  useEffect(() => {
    setFocus('username')
  }, [setFocus])

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      await login(data).then(response => {
        const { access_token, refresh_token } = response
        const decodedAccessToken: any = jwt_decode(access_token)
        const { emailVerified, exp } = decodedAccessToken as any

        setUser(emailVerified)

        localStorage.setItem(ACCESS_TOKEN, access_token)
        localStorage.setItem(REFRESH_TOKEN, refresh_token)
        // localStorage.setItem('expiredTime', exp)
        localStorage.setItem('emailVerified', emailVerified)

        if (emailVerified) {
          router.push(ROUTES.PAGE1)
        } else {
          router.push(ROUTES.PASSWORD)
        }
      })
    } catch (error) {
      setIsLoginError(true)
      console.error('login page', error)
    }
  }

  return (
    <>
      <Titlebar />
      <form
        className="login"
        name="login"
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: '400px', margin: '0 auto', padding: '0 var(--grid-margin)' }}
      >
        <PageHead />
        <Controller
          name="username"
          control={control}
          rules={{
            required: t('userRequire') || 'Please check your account information again.',
          }}
          render={({ field }) => (
            <Textfield
              {...field}
              type="text"
              label={t('userName')}
              id="login-email"
              placeholder={t('userId')}
              isAutoFocus
            />
          )}
        />

        <div style={{ margin: '1rem 0' }}></div>

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Textfield
              {...field}
              type="password"
              label={t('userPassword')}
              id="loginin-password"
              placeholder={t('userPassword')}
            />
          )}
        />

        <div style={{ margin: '1rem 0' }}></div>
        {isLoginError && <Alert description={t('userLoginFail')} />}
        <div style={{ margin: '1rem 0' }}></div>

        <menu className="">
          <Button type="submit" label={t('userLogin') || 'LOGIN'} isFullWidth />
          <div style={{ margin: '1.5rem 0' }}></div>
          <p className="textfield-link">
            {t('userPasswordLost1')}
            {/* 비밀번호를 잊으셨나요?{' '}
            <a href="" style={{ fontWeight: 'var(--font-weight-bold)', color: ' var(--color-primary)' }}>
              비밀번호 재설정
            </a> */}
          </p>
          <p style={{ margin: '0 0 0 15px' }}>{t('userPasswordLost2')}</p>
        </menu>
      </form>
    </>
  )
}

export default Login

function PageHead() {
  const { t } = useTranslation('login')
  return (
    <header style={{ padding: '2rem 0' }}>
      <h1>{t('userLogin')}</h1>
    </header>
  )
}

export async function getStaticProps({ locale, locales }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'login'])),
      locales,
    },
  }
}
