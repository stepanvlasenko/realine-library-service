import { Buffer } from 'buffer'

export const useFiles = () => {
    /**
     * @param file file which will be converted to buffer
     * @returns buffer of this file
     */
    const fileToBuffer = async (file: File) => {
        const blob = new Blob([file])
        return Buffer.from(await blob.arrayBuffer())
    }

    /**
     * @param buffer buffer which will be converted into file
     * @param id id of book
     * @returns file with this id in name
     */
    const bufferToFile = (buffer: Buffer, id: string) => {
        return new File([buffer], id)
    }

    return {
        fileToBuffer, bufferToFile,
    }
}