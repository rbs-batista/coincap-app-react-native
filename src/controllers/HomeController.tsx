
export default class HomeController {
    Index() {
        const assets = [
            { id: '1', avatar: {initial: 'BTC', bgcolor: "#FFFF00"}, title: 'Bitcoin', subtitle: 'PM: 1000', squareTitle: 'R$ 200,00', squareSubtitle: '+0,65%' },
            { id: '2', avatar: {initial: 'ETH', bgcolor: "#5F9EA0"}, title: 'Ethereum', subtitle: 'PM: 1000', squareTitle: 'R$ 250,00', squareSubtitle: '-0,30%' },
            { id: '3', avatar: {initial: 'LTR', bgcolor: "#008000"}, title: 'Litecoin', subtitle: 'PM: 1000', squareTitle: 'R$ 100,00', squareSubtitle: '+1,40%' },
            { id: '4', avatar: {initial: 'BTC', bgcolor: "#FFFF00"}, title: 'Bitcoin', subtitle: 'PM: 1000', squareTitle: 'R$ 200,00', squareSubtitle: '+0,65%' },
            { id: '5', avatar: {initial: 'ETH', bgcolor: "#5F9EA0"}, title: 'Ethereum', subtitle: 'PM: 1000', squareTitle: 'R$ 250,00', squareSubtitle: '-0,30%' },
            { id: '6', avatar: {initial: 'LTR', bgcolor: "#008000"}, title: 'Litecoin', subtitle: 'PM: 1000', squareTitle: 'R$ 100,00', squareSubtitle: '+1,40%' },
            { id: '7', avatar: {initial: 'BTC', bgcolor: "#FFFF00"}, title: 'Bitcoin', subtitle: 'PM: 1000', squareTitle: 'R$ 200,00', squareSubtitle: '+0,65%' },
            { id: '8', avatar: {initial: 'ETH', bgcolor: "#5F9EA0"}, title: 'Ethereum', subtitle: 'PM: 1000', squareTitle: 'R$ 250,00', squareSubtitle: '-0,30%' },
            { id: '9', avatar: {initial: 'LTR', bgcolor: "#008000"}, title: 'Litecoin', subtitle: 'PM: 1000', squareTitle: 'R$ 100,00', squareSubtitle: '+1,40%' },
        ]

        return assets;
    }
}