import breakpoints from '@/assets/styles/_breakpoints.module.scss'

interface IBreakpoints {
    desktop: string
}

export const useScssVariables = () => {
    const _breakpoints: IBreakpoints = breakpoints

    const {
        desktop,
    } = _breakpoints

    const _convertPxToNumber = (px: string) => +px.replace('px', '')

    // const _breakpoints = {
    //     mobile: _convertPxToNumber(mobile),
    //     desktop: _convertPxToNumber(desktop),
    // }

    return {
        desktop: _convertPxToNumber(desktop),
    }
}
