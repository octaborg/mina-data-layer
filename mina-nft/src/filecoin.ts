import {Web3Storage, File} from "web3.storage";
import {NFTMetaData} from "./NFT";

const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQyZGQ0NDhFMDI2YTIwMGM2M0Y4NEMzODVDRDA5QkMzZEFCNkIyYTEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTA3MDk4MTk4MjksIm5hbWUiOiJKdXN0In0.AvF4_qaQSBpsztWz0XLKbVK40IcjZ4opehKxL7praPU'

export async function store(storeApiKey: string | null, data: NFTMetaData): Promise<string[]> {
    storeApiKey = storeApiKey || NFT_STORAGE_KEY;
    // Construct with token and endpoint
    const client = new Web3Storage({ token: storeApiKey });
    // Pack files into a CAR and send to web3.storage
    const rootCid = await client.put([data.image], {
        name: data.image.name,
        maxRetries: 3
    });
    console.log('Root URL/CID of the image', 'https://ipfs.io/ipfs/'+ rootCid + '/' + data.image.name);
    return [rootCid.toString(), 'https://ipfs.io/ipfs/'+ rootCid + '/' + data.image.name];
}