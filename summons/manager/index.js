const log = summon('log')(module),
      axios = require('axios'),
      schedule = require('node-schedule')

const Ticker = model('ticker'),
      Balance = model('balance'),
      Snap = model('snap')

const coins = {
    'BTC': 'BTC_RUB',
    'BCH': 'BCH_RUB',
    'DASH': 'DASH_RUB',
    'ETH': 'ETH_RUB',
    'ETC': 'ETC_RUB',
    'LTC': 'LTC_RUB',
    'ZEC': 'ZEC_RUB',
    'XRP': 'XRP_RUB',
    'WAVES': 'WAVES_RUB'
}

const getTickers = async () => {
    try {
        const { data } = await axios.get('https://api.exmo.com/v1/ticker/')
        for (let k in coins) {
            const rate = +data[coins[k]].sell_price

            new Ticker({
                name: k,
                value: rate,
                date: Date.now()
            }).save()

            const balance = await Balance.findOne({ name: k })
            if (balance)
                new Snap({
                    name: k,
                    value: balance.value * rate,
                    date: Date.now()
                }).save()
        }
    } catch(e) {
        log.error(e)
    }
}

const updateFiat = async () => {
    try {
        const balances = await Balance.find({})
        for (let balance of balances) {
            if (!coins[balance.name])
                new Snap({
                    name: balance.name,
                    value: balance.value,
                    date: Date.now()
                }).save()
        }
    } catch(e) {
        log.error(e)
    }
}

const job = schedule.scheduleJob('*/5 * * * *', () => {
    getTickers()
    updateFiat()
})