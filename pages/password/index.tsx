import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import Button from 'components/button'
import Textfield from 'components/textfield'
import Titlebar from 'components/titlebar'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { postPassword } from 'services/auth'
import { ACCESS_TOKEN } from 'services/constants'
import { ROUTES } from 'services/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Alert from 'components/alert'

type FormValues = {
  password: string
  passwordConfirm: string
}

function Password() {
  const { t } = useTranslation('password')

  const router = useRouter()

  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: { password: '', passwordConfirm: '' },
  })

  const onSubmit: SubmitHandler<FormValues> = async data => {
    console.log(errors)

    const { password, passwordConfirm } = data
    // if (password !== passwordConfirm) {
    //   alert('비밀번호가 다릅니다.')
    //   return
    // }

    await postPassword({ value: password }).then(response => {
      if (response.status < 400) {
        // localStorage.setItem('emailVerified', 'true')
        localStorage.clear()
        router.push(ROUTES.LOGIN)
      }
    })
  }

  const pwd = watch('password')

  useEffect(() => {
    // if (!localStorage.getItem(ACCESS_TOKEN)) router.push(ROUTES.LOGIN)
  }, [router])

  return (
    <>
      <Titlebar />
      <form
        className="login"
        name="login"
        style={{ maxWidth: '480px', margin: '0 auto' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <PageHead title={t('title')} />
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Please enter your Passwords.',
          }}
          render={({ field }) => (
            <Textfield
              {...field}
              type="password"
              label={t('newPassword')}
              id="password"
              placeholder=""
            />
          )}
        />
        {errors?.password && (
          <Alert description={errors?.password?.message || ''} />
        )}

        <Controller
          name="passwordConfirm"
          control={control}
          rules={{
            required: t('newPasswordInput') || 'Please enter your Passwords.',
            validate: value => {
              if (value !== pwd) {
                return t('newPasswordNotEqual') || 'Passwords do not match.'
              }
              if (
                !/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(
                  value,
                )
              ) {
                return (
                  t('newPasswordPolicy') ||
                  'Contains letters, numbers, and special characters. 8 or more digits.'
                )
              }
            },
          }}
          render={({ field }) => (
            <Textfield
              {...field}
              type="password"
              label={t('newPasswordConfirm')}
              id="password-confirm"
              placeholder=""
            />
          )}
        />

        {errors?.passwordConfirm && (
          <Alert description={errors?.passwordConfirm?.message || ''} />
        )}

        <ul>
          <li>{t('newPasswordPolicy')}</li>
          <li>{t('newPasswordNotice')}</li>
        </ul>
        <Button
          type="submit"
          label={t('title') || 'Change Password'}
          isFullWidth
        />
      </form>
    </>
  )
}

export default Password

function PageHead(props: { title: string }) {
  return (
    <header style={{ padding: '2rem 0' }}>
      <h1>{props.title}</h1>
    </header>
  )
}

export async function getStaticProps({ locale, locales }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['password'])),
      locales,
    },
  }
}
