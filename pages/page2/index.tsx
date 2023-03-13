import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ErrorBoundary } from 'react-error-boundary'

import LayoutWide from 'layouts/LayoutWide'
import Pagehead from 'components/pagehead'

import { ACCESS_TOKEN } from 'services/constants'
import { ROUTES } from 'services/routes'
import { isExpiredRefreshToken } from 'services/utils'
import Filters from 'domain/page2/Filters'
import Group from 'components/group'
import Avatar from 'components/avatar'
import MeterOrigin from 'domain/page2/MeterOrigin'
import List from 'domain/page2/List'
import Tabs, { useTab } from 'components/tab'
import { typeOptions } from 'domain/page2/TypeFilter'

function Page2() {
  const { t } = useTranslation('')

  const [selectedTab, handleTabClick] = useTab(typeOptions[0].value)

  const router = useRouter()
  useEffect(() => {
    // if (isExpiredRefreshToken()) router.push(ROUTES.LOGIN)
    // if (!localStorage.getItem(ACCESS_TOKEN)) router.push(ROUTES.LOGIN)
    // else if (localStorage.getItem('emailVerified') !== 'true') router.push(ROUTES.PASSWORD)
  }, [])

  return (
    <LayoutWide>
      <ErrorBoundary FallbackComponent={() => <div>error</div>}>
        <div className="story-container">
          <button className="story">
            {/* <Avatar size="huge" name="test" fallback={<AddIcon />} /> */}
            <Avatar size="huge" name="test" fallback="ALL" />
            <b className="story-name">전체</b>
          </button>
          <button className="story" data-is-active={true}>
            <Avatar size="huge" name="test"></Avatar>
            <b>카테고리1</b>
          </button>
          <button className="story">
            <Avatar size="huge" name="test"></Avatar>
            <b>카테고리1</b>
          </button>
        </div>

        {/* <Tabs tabs={typeOptions} selected={selectedTab} onClick={handleTabClick} /> */}
        <br />
        <Filters />
        <br />
        <List />

        {/* <MeterOrigin /> */}
      </ErrorBoundary>
    </LayoutWide>
  )
}

export default Page2

export async function getStaticProps({ locale, locales }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', ''])),
      locales,
    },
  }
}

function Background() {
  return <div className="background"></div>
}
