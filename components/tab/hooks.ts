import { useState } from 'react'

const useTab = (initialSelectedTab: any) => {
  const [selectedTab, setSelectedTab] = useState(initialSelectedTab)

  const handleTabClick = (event: any) => {
    const { value } = event.currentTarget as HTMLButtonElement
    setSelectedTab(value)
  }

  return [selectedTab, handleTabClick]
}

export default useTab
