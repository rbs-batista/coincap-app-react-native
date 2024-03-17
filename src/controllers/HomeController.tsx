
export default class HomeController {
    Index() {
        const assets = [
            {id: 1, name: "Bitcoin"},
            {id: 2, name: "Ethereum"},
            {id: 3, name: "Litecoin"}
        ]

        return assets;
    }
}