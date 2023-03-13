import Image from 'next/image'

interface TooltipProps {
  content: string
  children: React.ReactNode
}
function Tooltip(props: TooltipProps) {
  return (
    <>
      <style jsx>
        {`
          .tooltip {
            position: relative;
          }
          .tooltip-trigger {
            display: flex;
            align-items: center;
            height: var(--size-small);
            align-items: center;
          }
          .tooltip-content {
            max-width: 320px;
            padding: 0.5rem var(--space-3);
            border-radius: var(--radius);
            background: var(--color-background-weak);
            box-shadow: var(--shadow);
            font-size: 12px;
            line-height: 1.6;
            // color: var(--color-text-weak);
            position: absolute;
            left: 0;
            top: var(--size-medium);
            z-index: 6;
          }
          .tooltip-content:before {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            right: 50%;
            top: -8px;
            bottom: 0;
          }
          .tooltip:hover .tooltip-content {
            display: block;
          }
        `}
      </style>
      <aside className="tooltip">
        <span className="tooltip-trigger" aria-describedby="tooltip1">
          <span style={{ marginRight: '.25rem' }}>{props.children}</span>
          <Image src="/help.svg" alt="툴팁" width="14" height="14" style={{ opacity: '.4' }} />
        </span>
        <p className="tooltip-content" role="tooltip" id="tooltip1" hidden>
          {props.content}
        </p>
      </aside>
    </>
  )
}

export default Tooltip
