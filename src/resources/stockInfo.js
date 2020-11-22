import { iex } from '../utilities/iexToken.js'

export const stock = {

    latestPrice: (ticker, callback) => {
        fetch(stock.latestPriceUrl(ticker))
        .then((response) => response.json())
        .then((data) => callback(stock.formatPriceData(data)))
    },

    latestPriceUrl: (ticker) => {
        return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`

    },

    formatPriceData: (data) => {
        const stockData = data[data.length-1]
        const formattedData = {}
        formattedData.price = stockData.close
        formattedData.date = stockData.date
        formattedData.time = stockData.label

        return formattedData
    },

    getYesterdaysClose: (ticker, lastTradingDate, callback) => {
        //stock.getLastTradingDate(date).then((data) => {
        if (lastTradingDate != "" && lastTradingDate != undefined) {
            const url = stock.yesterdayCloseUrl(ticker, stock.formatDate(lastTradingDate))
            console.log(url)
            fetch(url)
            .then((response) => response.json())
            .then((data) => callback(stock.formatPriceData(data)))
        }
            
        //})
         
    },

    getLastTradingDate: () => {
        const today = new Date().toISOString().split('T')[0].replace(/-/g,'')
        const url = `${iex.base_url}/ref-data/us/dates/trade/last/1/${today}?token=${iex.api_token}`
        return fetch(url).then((res) => res.json())
    },

    yesterdayCloseUrl: (ticker, lastTradingDate) => {
        //var lastTradingDate = stock.formatDate(date);
        console.log(lastTradingDate)
        return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&exactDate=${lastTradingDate}&token=${iex.api_token}`
    },

    formatDate: (date) => {
        return new Date(date).toISOString().split('T')[0].replace(/-/g,'')
    }

}