import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ErrorBoundary } from 'react-error-boundary'

import LayoutWide from 'layouts/LayoutWide'

import Filters from 'domain/page2/Filters'
import Avatar from 'components/avatar'
import List from 'domain/page2/List'

// const DraggableSample = dynamic(import('domain/page2/draggable'))

const navMenuList = [
  { label: 'section1', name: '1' },
  { label: 'section2', name: '2' },
]

const INITIAL_VIEW_INDEX = 0

function Page2() {
  // const [selectedTab, handleTabClick] = useTab(typeOptions[0].value)

  // const entry = useIntersectionObserver(ref, {})
  // const isVisible = !!entry?.isIntersecting

  // useEffect(() => {
  // setIsFetching(true)
  // setTimeout(() => {
  //   setPage(prevState => prevState + 1)
  //   setIsFetching(false)
  // }, 500)
  // }, [])

  const sectionRefs = useRef<HTMLElement[] | null[]>([])
  const [viewIndex, setViewIndex] = useState(INITIAL_VIEW_INDEX)

  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: [0.5],
  }

  const callback: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
  ) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return

      const { pageYOffset } = window
      const { offsetTop: targetOffsetTop, dataset } = entry.target as any

      // if (pageYOffset < targetOffsetTop)
      if (entry.intersectionRatio > 0.25) setViewIndex(dataset.index)

      // vanilla에서는 여기서 observer.unobserve(entry.target). parameter observer를 받을 필요가 없음
      // const index = Math.round(pageYOffset / height)
      // entry.target.addEventListener('animationend')
      // console.log(pageYOffset, 'targer', dataset.index, ': ', targetOffsetTop)
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options)

    sectionRefs.current.forEach((section: any) => observer.observe(section))
    return () => {
      observer.disconnect()
    }
  }, [])

  const handleNavItemClick = (index: number) => {
    sectionRefs?.current[index]?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
      inline: 'center',
    })
  }

  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const handleCategoryClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget as any

    const hasTarget = selectedCategory.includes(name)

    const result = hasTarget
      ? selectedCategory.filter(item => item !== name)
      : [...selectedCategory, name]

    setSelectedCategory(result)
  }

  return (
    <LayoutWide>
      <ErrorBoundary FallbackComponent={() => <div>error</div>}>
        {/* <DraggableSample /> */}

        {/* <Tabs tabs={typeOptions} selected={selectedTab} onClick={handleTabClick} /> */}
        <br />
        <Filters />
        <br />
        <List />

        {/* sticky */}
        <nav style={{ position: 'fixed', bottom: '0' }}>
          {navMenuList.map((item, index) => {
            return (
              <span
                key={item.name}
                onClick={() => handleNavItemClick(index)}
                style={{ background: viewIndex === index ? 'red' : '' }}
              >
                {item.label}
              </span>
            )
          })}
        </nav>

        <section
          data-index="0"
          ref={element => (sectionRefs!.current[0] = element)}
          style={{ height: '100vh', background: 'blue' }}
        >
          <div style={{ height: '50vh', background: 'gold' }}>0-1</div>
          <div style={{ height: '50vh', background: 'yellow' }}>0-2</div>
        </section>

        <section
          data-index="1"
          ref={element => (sectionRefs!.current[1] = element)}
          style={{ height: '200vh', background: 'green', position: 'relative' }}
        >
          <div style={{ height: '50vh', background: '#333' }}>1</div>
          <div style={{ height: '50vh', background: '#666' }}>1</div>
          <div style={{ height: '50vh', background: '#999' }}>1</div>
          <div style={{ height: '50vh', background: '#ccc' }}>1</div>
        </section>

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

// import React, { ComponentPropsWithRef, forwardRef } from 'react'

// interface ContentProps extends ComponentPropsWithRef<'div'> {
//   page: number
// }

// const Content = forwardRef<HTMLDivElement, ContentProps>(({ page }, ref) => {
//   return (
//     <div className="h-[100vh] leading-[100vh] text-center text-[15rem]" ref={ref}>
//       {page}
//     </div>
//   )
// })

// export default Content
