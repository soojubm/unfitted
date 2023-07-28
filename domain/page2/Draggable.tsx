import { useState, useEffect } from 'react'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Chip from 'components/chip'

type Account = {
  id: any
}

const droppableStyles = {
  display: 'flex',
  background: 'crimson',
  margin: '.5rem',
  gap: '.5rem',
}

const reorder = (list: Account[], startIndex: any, endIndex: any) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)

  result.splice(endIndex, 0, removed)

  return result
}

const move = (source: any, destination: any, droppableSource: any, droppableDestination: any) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}

  // result[droppableSource.droppableId] = sourceClone
  // result[droppableDestination.droppableId] = destClone

  return result
}

interface PaginationProps {
  initialPageNumber: number
  totalPage: number
}

function DraggableSample() {
  const [showUIElements, setShowUIElements] = useState(false)
  useEffect(() => {
    setShowUIElements(true)
  }, [])

  const [draggables, setDraggables] = useState({
    droppable: [{ id: '1' }, { id: '2' }],
    droppable2: [{ id: '3' }, { id: '4' }],
  })

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId === destination.droppableId) {
      const key = source.droppableId
      const items = reorder(
        draggables[key as 'droppable' | 'droppable2'],
        source.index,
        destination.index,
      )

      setDraggables({ ...draggables, [key]: items })
    } else {
      const result: any = move(
        draggables[source.draggableId as 'droppable' | 'droppable2'],
        draggables[destination.droppableId as 'droppable' | 'droppable2'],
        source,
        destination,
      )
      setDraggables(result)
    }
  }

  if (!showUIElements) return null
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} style={droppableStyles}>
            {draggables['droppable'].map((item: any, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided: any, snapshot: any) => (
                  <div
                    label={item.id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Chip label={item.id} onClick={() => {}} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="droppable2">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} style={droppableStyles}>
            {draggables['droppable2'].map((item: any, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided: any, snapshot: any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Chip label={item.id} onClick={() => {}} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DraggableSample
