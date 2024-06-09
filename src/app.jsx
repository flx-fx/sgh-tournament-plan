import Card from '@/components/ui/card.jsx'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.jsx'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import Slide from '@/components/slide.jsx'
import Plan from '@/components/plan.jsx'
import Leaderboard from '@/components/leaderboard.jsx'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils.js'
import Field from '@/components/field.jsx'
import Time from '@/components/time.jsx'

export default function App() {
  const [expanded, setExpanded] = useState(false)

  const [emblaRef, emblaApi] = useEmblaCarousel({}, [
    Autoplay({
      delay: 10000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ])
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
    <div
      className={cn(
        'flex h-dvh flex-col gap-3 p-4 lg:flex-row lg:p-6',
        expanded ? 'overflow-hidden lg:overflow-y-scroll' : '',
      )}
    >
      <div
        className={cn(
          'fixed left-0 top-0 z-20 w-full p-4 transition-all duration-500 lg:static lg:h-full lg:w-1/4 lg:p-0 lg:transition-none',
          expanded ? '' : 'max-h-32 lg:max-h-full',
        )}
      >
        <Card className="mb-3 border-zinc-600 bg-zinc-800 shadow-none lg:hidden">
          <button
            className="flex h-full w-full flex-row items-center gap-1 text-lg font-medium text-zinc-50"
            onClick={() => setExpanded(!expanded)}
          >
            <ChevronDown className={cn('transition-all', expanded ? 'rotate-180' : '')} />
            Aktuelle Spiele
          </button>
        </Card>
        <div
          className={cn(
            'h-dropdown scrollbar-none flex w-full flex-col gap-3 overflow-y-auto transition-all duration-200 lg:static lg:h-full lg:transition-none',
            expanded ? 'visible' : 'invisible lg:visible lg:h-full lg:max-h-full lg:overflow-y-auto',
          )}
        >
          <Field
            index={1}
            className={cn(
              'shadow-none transition-opacity delay-0 duration-300 lg:shadow-df',
              expanded ? 'opacity-100' : 'opacity-0 delay-0 lg:opacity-100',
            )}
          />
          <Field
            index={2}
            className={cn(
              'shadow-none transition-opacity delay-150 duration-300 lg:shadow-df',
              expanded ? 'opacity-100' : 'opacity-0 delay-0 lg:opacity-100',
            )}
          />
          <Time
            className={cn(
              'g:shadow-df mt-auto shadow-none transition-opacity delay-300 duration-300',
              expanded ? 'opacity-100' : 'opacity-0 delay-0 lg:opacity-100',
            )}
          />
        </div>
      </div>
      <div className="mt-20 flex grow flex-col gap-3 lg:mt-0">
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
        <div className="sticky bottom-6 mt-3 flex w-full justify-center lg:static lg:mx-0 lg:mt-0">
          <Card className="w-fit p-3 lg:w-full lg:p-4">
            <ToggleGroup type="single" value={slideIndex + 1} onValueChange={handleToggleValueChange}>
              <ToggleGroupItem value={1}>Turnierplan</ToggleGroupItem>
              <ToggleGroupItem value={2}>Leaderboard</ToggleGroupItem>
            </ToggleGroup>
          </Card>
        </div>
      </div>
      <div className="w-full lg:hidden">
        <p className="w-full px-16 pb-6 text-center text-zinc-600">
          Technikgruppe des Staatlichen Gymnasiums Holzkirchen
        </p>
      </div>
      <div
        className={cn(
          'fixed left-0 top-0 z-10 h-dvh w-dvw bg-zinc-900 transition-opacity duration-500 lg:hidden',
          expanded ? 'visible opacity-35' : 'invisible opacity-0',
        )}
      />
    </div>
  )
}
