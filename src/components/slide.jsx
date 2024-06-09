import Card from '@/components/ui/card.jsx'
import Box from '@/components/ui/box.jsx'
import PropTypes from 'prop-types'

export default function Slide({ title, children }) {
  return (
    <Card className="mr-3 flex min-w-0 flex-embla flex-col gap-3 last:mr-0">
      <h3 className="mx-3 text-2xl font-bold tracking-tight">{title}</h3>
      <Box className="h-full overflow-hidden p-7">{children}</Box>
    </Card>
  )
}

Slide.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}
