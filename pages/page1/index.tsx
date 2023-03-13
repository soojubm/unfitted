import Pagehead from 'components/pagehead'
import LayoutWide from 'layouts/LayoutWide'

function Page() {
  // useEffect(() => {
  //   metrics.forEach(item1 => {
  //     item1.value = 0
  //     item1.percentage = 0
  //   })
  // }, [])

  // useEffect(() => {
  //   if (isExpiredRefreshToken()) router.push(ROUTES.LOGIN)
  //   else if (localStorage.getItem('emailVerified') !== 'true') router.push(ROUTES.PASSWORD)
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
