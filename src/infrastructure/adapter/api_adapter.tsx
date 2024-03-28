import CoincapDriver from "../driver/coincap_driver";

export default class ApiAdapter {

    static async getAllAsset() {
        const endpoint = '/v2/assets';
        const res = await CoincapDriver.fetch(endpoint);
        return res != null ? res : [];

    }

    static async getByAssetId({id}:{id: string}) {
        const endpoint = `/v2/assets/${id}`;
        return await CoincapDriver.fetch(endpoint);
    }

    static async getByAssetIdAndInterval({id, interval}: {id: string, interval: string}) {
        const endpoint = `/v2/assets/${id}/history?interval=${interval}`;
        const res = await CoincapDriver.fetch(endpoint);
        return res != null ? res : [];
    }
}