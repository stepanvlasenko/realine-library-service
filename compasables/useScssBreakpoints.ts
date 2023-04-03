import { useBreakpoints } from '@vueuse/core'
import breakpoints from '@/assets/styles/_breakpoints.module.scss'

interface IBreakpoints {
    desktop: string
}

export const useScssBreakpoints = () => {
    const {
        desktop,
    } = breakpoints as IBreakpoints

    const _convertPxToNumber = (px: string) => +px.replace('px', '')

    const _breakpoints = {
        desktop: _convertPxToNumber(desktop),
    }

    return useBreakpoints(_breakpoints)
}
