import { NFTStorage, File } from 'nft.storage'
import mime from 'mime'
import fs from 'fs'
import path from 'path'

const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGEyYTFlYkE4ODEwNzdFRDI2NzNEZDVGMmMxNkREZUZjRWIxRmM0QWEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MDY2MTQzODA0NiwibmFtZSI6Im1pbmFuZnQifQ.Cfi0SIeNbGJ4sv5n9MesbOvRfVnJd8LZp9HqZVVO2lc'

async function storeNFT(imagePath, name, description) {
    // load the file from disk
    const image = await fileFromPath(imagePath)

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    // call client.store, passing in the image & metadata
    return nftstorage.store({
        image,
        name,
        description,
    })
}