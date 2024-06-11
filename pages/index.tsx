import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ErrorBoundary } from 'react-error-boundary'

import LayoutWide from 'layouts/LayoutWide'

import Filters from 'domain/Filters'
import List from 'domain/List'
import { tabOptions } from 'domain/TypeFilter'
import Tabs, { useTab } from 'components/tab'
import Pagehead from 'components/pagehead'
import Group from 'components/group'
import Button from 'components/button'
import Radio from 'components/radio'
import Checkbox from 'components/checkbox'

// const DraggableSample = dynamic(import('domain/page2/draggable'))

const navMenuList = [
  { label: 'section1', name: '1' },
  { label: 'section2', name: '2' },
]

const INITIAL_VIEW_INDEX = 0

function Page() {
  const [selectedTab, handleTabClick] = useTab(tabOptions[0].value)

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

  const [accordions, setAccordions] = useState<number[]>([1])

  const handleAccordionClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const { name } = event.currentTarget as HTMLButtonElement

      if (accordions.includes(Number(name))) {
        const filtered = accordions.filter(
          (accordion: number) => accordion !== Number(name),
        )
        setAccordions(filtered)
      } else {
        setAccordions(prevStates => [...prevStates, Number(name)])
      }
    },
    [accordions],
  )

  console.log(accordions)

  return (
    <LayoutWide>
      <Group>
        <Button label="버튼" onClick={() => console.log()} />
        <Button size="small" label="버튼 스몰" onClick={() => console.log()} />
      </Group>
      <Radio
        id="radio1"
        name="radio"
        label="Radio button"
        isChecked={true}
        onChange={() => console.log()}
      />
      <Checkbox name="checkbox" label="Checkbox" onChange={() => {}} />

      <div style={{ display: 'flex', gap: '.5rem' }}>
        {[1, 2, 3, 4, 5].map((item: number) => {
          return (
            <div key={item}>
              <button
                name={String(item)}
                onClick={handleAccordionClick}
                style={{ background: 'crimson' }}
              >
                123
              </button>
              <div
                style={{
                  display: accordions.includes(item) ? 'block' : 'none',
                }}
              >
                {item}
              </div>
            </div>
          )
        })}
      </div>
      <Pagehead title="Page title" />
      <ErrorBoundary FallbackComponent={() => <div>error</div>}>
        {/* <DraggableSample /> */}
        <Tabs
          tabs={tabOptions}
          selected={selectedTab}
          onClick={handleTabClick}
        />
        <Filters />
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

export default Page

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

// INFINITE SCROLLING with react query
// import { useInfiniteQuery } from "react-query"
// import {useRef, useCallback, useEffect} from 'react'

// function App() {
// const observerElem = useRef(null)
// const handleObserver = useCallback((entries) => {
//   const [target] = entries
//   if(target.isIntersecting && hasNextPage) {
//     fetchNextPage()
//   }
// }, [fetchNextPage, hasNextPage])

// useEffect(() => {
//   const element = observerElem.current
//   const option = { threshold: 0 }

//   const observer = new IntersectionObserver(handleObserver, option)
//   observer.observe(element)
//   return () => observer.unobserve(element)
// }, [fetchNextPage, hasNextPage, handleObserver])

// useEffect(() => {
//   let fetching = false
//   const handleScroll = async e => {
//     const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement
//     if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
//       fetching = true
//       if (hasNextPage) await fetchNextPage()
//       fetching = false
//     }
//   }
//   document.addEventListener('scroll', handleScroll)
//   return () => {
//     document.removeEventListener('scroll', handleScroll)
//   }
// }, [fetchNextPage, hasNextPage])

//   const LIMIT = 10

//   const fetchRepositories = async (page) => {
//     const response = await fetch(`https://api.github.com/search/repositories?q=topic:react&per_page=${LIMIT}&page=${page}`)
//     return response.json()
//   }

//   const {data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
//     'repos',
//     ({pageParam = 1}) => fetchRepositories(pageParam),
//     {
//       getNextPageParam: (lastPage, allPages) => {
//         const nextPage = allPages.length + 1
//         return nextPage
//       }
//     }

// getNextPageParam: (lastPage, allPages) => {
//   const nextPage = allPages.length + 1
//   return lastPage.items.length !== 0 ? nextPage : undefined
// }

// return (
//   <div className="app">
//     {isSuccess &&
//       data.pages.map(page =>
//         page.items.map(comment => (
//           <div className="result" key={comment.id}>
//             <span>{comment.name}</span>
//             <p>{comment.description}</p>
//           </div>
//         )),
//       )}
// <div className="loader" ref={observerElem}>
//   {isFetchingNextPage && hasNextPage ? 'Loading...' : 'No search left'}
// </div>
//   </div>
// )
//   )

// useEffect(() => {
//   metrics.forEach(item1 => {
//     item1.value = 0
//     item1.percentage = 0
//   })
// }, [])

// useEffect(() => {
// if (isExpiredRefreshToken()) router.push(ROUTES.LOGIN)
// if (!localStorage.getItem(ACCESS_TOKEN)) router.push(ROUTES.LOGIN)
// else if (localStorage.getItem('emailVerified') !== 'true') router.push(ROUTES.PASSWORD)
// }, [])

// TODO metric data를 어디에서 관리하는 것이 좋은가. rendering 될 때 초기화되어야 함.
// const { data } = useQuery(['test', params], queryFn, {
//   onSuccess: data => {
//     metrics.forEach(item1 => {
//       item1.value = 0
//       item1.percentage = 0

//       Object.entries(data).forEach(item2 => {
//         if (item1.name.toUpperCase() === item2[0]) {
//           item1.value = item2[1] as number
//         }
//       })
//     })

//     let totalCountSum = 0
//     Object.values(data).forEach(count => (totalCountSum += Number(count)))
//     setTotalCount(totalCountSum)

//     let successCountSum = 0
//     metrics.forEach(metric => {
//       if (metric.type === 'fail') return
//       successCountSum += metric.value
//     })
//     setSuccessCount(successCountSum)
//   },
// })

// metrics.forEach(item => (item.percentage = getPercentage(item.value, totalCount)))
// metrics.map(item => (item.percentage = getPercentage(item.value, totalCount)))
