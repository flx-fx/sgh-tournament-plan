import Field from '@/components/field.jsx'
import Time from '@/components/time.jsx'
import Card from '@/components/ui/card.jsx'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.jsx'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import Slide from '@/components/slide.jsx'
import Plan from '@/components/plan.jsx'
import Leaderboard from '@/components/leaderboard.jsx'
import Autoplay from 'embla-carousel-autoplay'

export default function App() {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [slideIndex, setSlideIndex] = useState(0)

  const scrollTo = useCallback(
    index => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const handleToggleValueChange = useCallback(
    value => {
      scrollTo(value - 1)
    },
    [scrollTo],
  )

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSlideIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  return (
    <div className="flex h-dvh gap-3 p-6">
      <div className="flex w-1/4 flex-col gap-3">
        <Field index={1} />
        <Field index={2} />
        <Time className="mt-auto" />
      </div>
      <div className="flex grow flex-col gap-3">
        <div className="embla__viewport -m-2 grow overflow-hidden p-2" ref={emblaRef}>
          <div className="embla__container flex h-full">
            <Slide title="Turnierplan">
              <Plan />
            </Slide>
            <Slide title="Leaderboard">
              <Leaderboard />
            </Slide>
          </div>
        </div>
        <Card className="p-4">
          <ToggleGroup type="single" value={slideIndex + 1} onValueChange={handleToggleValueChange}>
            <ToggleGroupItem value={1}>Turnierplan</ToggleGroupItem>
            <ToggleGroupItem value={2}>Leaderboard</ToggleGroupItem>
          </ToggleGroup>
        </Card>
      </div>
    </div>
  )
}
