import CoincapDriver from "../driver/coincap_driver";

export default class ApiAdapter {

    static async getAllAsset() {
        const endpoint = '/v2/assets';
        console.log(`5[ApiAdapter][req][getAllAsset]get`);
        const res = await CoincapDriver.get(endpoint);
        console.log(`5[ApiAdapter][res][getAllAsset]get`);
        return res != null ? res : [];

    }

    static async getByAssetId({ id }: { id: string }) {
        const endpoint = `/v2/assets/${id}`;
        console.log(`5[ApiAdapter][req][getByAssetId]id:${id}`);
        const res = await CoincapDriver.get(endpoint);
        console.log(`5[ApiAdapter][res][getByAssetId]get ${JSON.stringify(res)}`);
        return res;
    }

    static async getByAssetIdAndInterval({ id, interval }: { id: string, interval: string }) {
        const endpoint = `/v2/assets/${id}/history?interval=${interval}`;
        const res = await CoincapDriver.get(endpoint);
        return res != null ? res : [];
    }
}