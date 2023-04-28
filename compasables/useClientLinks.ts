export const useClientLinks = () => {
    /**
     * @param file files on which you want to get link
     * @returns link string
     */
    const getLink = (file: File): string => {
        return URL.createObjectURL(new Blob([file]))
    }

    return {
        getLink
    }
}