function MenuItem({ option, onMenuItemClick }: any) {
  return (
    <button
      key={option.value}
      name={option.name}
      value={option.value}
      className="menuitem"
      onClick={onMenuItemClick}
    >
      {option.label}
    </button>
  )
}

export default MenuItem
