
export default class HomeController {
    Index() {
        const assets = [
            { id: '1', avatar: {initial: 'BTC', bgcolor: "#FFFF00"}, title: 'Bitcoin', subtitle: 'Subtítulo 1', squareTitle: 'R$ 200,00', squareSubtitle: '+0,65%' },
            { id: '2', avatar: {initial: 'ETH', bgcolor: "#5F9EA0"}, title: 'Ethereum', subtitle: 'Subtítulo 2', squareTitle: 'R$ 250,00', squareSubtitle: '-0,30%' },
            { id: '3', avatar: {initial: 'LTR', bgcolor: "#008000"}, title: 'Litecoin', subtitle: 'Subtítulo 3', squareTitle: 'R$ 100,00', squareSubtitle: '+1,40%' }
        ]

        return assets;
    }
}