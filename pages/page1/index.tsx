import Pagehead from 'components/pagehead'
import LayoutWide from 'layouts/LayoutWide'

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

function Page() {
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
  return (
    <LayoutWide>
      <Pagehead title="Page title" />
    </LayoutWide>
  )
}

export default Page
