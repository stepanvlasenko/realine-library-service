import type { Ref } from 'vue-demi'

export const useSwiper = (length: number, itemsInRow: Ref<number> = ref(1)) => {
    if (length <= 0)
        throw new Error('Length must be at least 1')

    if (itemsInRow.value > length)
        throw new Error('Items in row cannot be more than length')

    const firstSlideIndex = computed<number>(() => 0)
    const _current = ref<number>(0)
    const lastSlideIndex = computed<number>(() => length - itemsInRow.value)

    const selectLastSlide = () => {
        _current.value = lastSlideIndex.value
    }
    const selectFirstSlide = () => {
        _current.value = firstSlideIndex.value
    }

    const deltaSlide = (delta: number) => {
        const newSlide = _current.value + delta

        if (newSlide > lastSlideIndex.value)
            selectLastSlide()
        else if (newSlide < firstSlideIndex.value)
            selectFirstSlide()
        else
            _current.value = newSlide
    }

    const current = computed(() => _current.value)

    const slides = computed(() => {
        const _slides = []
        for (let slide = firstSlideIndex.value; slide <= lastSlideIndex.value; slide++)
            _slides.push(slide)

        return _slides
    })

    const selectNextSlide = () => {
        deltaSlide(1)
    }
    const selectPrevSlide = () => {
        deltaSlide(-1)
    }

    const selectSlide = (slide: number) => {
        const delta = slide - _current.value
        deltaSlide(delta)
    }

    const visibleSlides = computed<number[]>(() => {
        const _slides = []
        for (let i = _current.value; i < _current.value + itemsInRow.value; i++)
            _slides.push(i)

        return _slides
    })

    return {
        firstSlideIndex,
        lastSlideIndex,
        current,
        visibleSlides,
        slides,

        selectNextSlide,
        selectPrevSlide,
        selectSlide,
        selectFirstSlide,
        selectLastSlide,
    }
}
