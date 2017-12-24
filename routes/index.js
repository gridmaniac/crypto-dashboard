const Router = require('koa-router'),
      router = new Router()

const moment = require('moment')

const Balance = model('balance'),
      Snap = model('snap'),
      Ticker = model('ticker')

router.get('/', async (ctx) => {
    const trends = []

    const balances = await Balance.find({})
    for (let k in balances) {
        const rate = await Ticker.findOne({ name: balances[k].name }).sort('-date')
        if (rate)
            balances[k].rate = rate.value

        const trend = {
            name: balances[k].name
        }
        
        const now = new Date(),
              hrs3 = moment(now).subtract(3, 'hours'),
              hrs6 = moment(now).subtract(6, 'hours'),
              hrs12 = moment(now).subtract(12, 'hours'),
              day = moment(now).subtract(1, 'day'),
              days2 = moment(now).subtract(2, 'days'),
              days3 = moment(now).subtract(3, 'days'),
              days5 = moment(now).subtract(5, 'days'),
              wk = moment(now).subtract(1, 'week'),
              wks2 = moment(now).subtract(2, 'weeks'),
              mnth = moment(now).subtract(1, 'month'),
              mnths2 = moment(now).subtract(2, 'months')

        const hrs3Rate = await Ticker.findOne({
            name: balances[k].name.toUpperCase(),
            date: { $lte: hrs3 }
        }).sort('-date')
        trend.hrs3 = hrs3Rate ? rate.value > hrs3Rate.value : null
        if (hrs3Rate) {
            if (rate.value > hrs3Rate.value) {
                trend.hrs3p = (rate.value / hrs3Rate.value - 1) * 100
            } else {
                trend.hrs3p = (hrs3Rate.value / rate.value - 1) * 100
            }
        }

        const hrs6Rate = await Ticker.findOne({
            name: balances[k].name.toUpperCase(),
            date: { $lte: hrs6 }
        }).sort('-date')
        trend.hrs6 = hrs6Rate ? rate.value > hrs6Rate.value : null
        if (hrs6Rate) {
            if (rate.value > hrs6Rate.value) {
                trend.hrs6p = (rate.value / hrs6Rate.value - 1) * 100
            } else {
                trend.hrs6p = (hrs6Rate.value / rate.value - 1) * 100
            } 
        }

        const hrs12Rate = await Ticker.findOne({
            name: balances[k].name.toUpperCase(),
            date: { $lte: hrs12 }
        }).sort('-date')
        trend.hrs12 = hrs12Rate ? rate.value > hrs12Rate.value : null
        if (hrs12Rate) {
            if (rate.value > hrs12Rate.value) {
                trend.hrs12p = (rate.value / hrs12Rate.value - 1) * 100
            } else {
                trend.hrs12p = (hrs12Rate.value / rate.value - 1) * 100
            } 
        }

        const dayRate = await Ticker.findOne({
            name: balances[k].name.toUpperCase(),
            date: { $lte: day }
        }).sort('-date')
        trend.day = dayRate ? rate.value > dayRate.value : null
        if (dayRate) {
            if (rate.value > dayRate.value) {
                trend.dayp = (rate.value / dayRate.value - 1) * 100
            } else {
                trend.dayp = (dayRate.value / rate.value - 1) * 100
            } 
        }
        const dayChange = await Snap.findOne({
            name: balances[k].name.toUpperCase(),
            date: { $lte: day }
        }).sort('-date')
        bal = rate ? balances[k].value * rate.value : balances[k].value

        balances[k].day = dayChange ? bal > dayChange.value : null
        if (dayChange) {
            if (bal > dayChange.value) {
                balances[k].dayp = (bal / dayChange.value - 1) * 100
            } else {
                balances[k].dayp = (dayChange.value / bal - 1) * 100
            }
        }

        const days2Rate = await Ticker.findOne({
            name: balances[k].name.toUpperCase(),
            date: { $lte: days2 }
        }).sort('-date')
        trend.days2 = days2Rate ? rate.value > days2Rate.value : null
        if (days2Rate) {
            if (rate.value > days2Rate.value) {
                trend.days2p = (rate.value / days2Rate.value - 1) * 100
            } else {
                trend.days2p = (days2Rate.value / rate.value - 1) * 100
            } 
        }

        const days2Change = await Snap.findOne({
            name: balances[k].name.toUpperCase(),
            date: { $lte: days2 }
        }).sort('-date')
        bal = rate ? balances[k].value * rate.value : balances[k].value

        balances[k].days2 = days2Change ? bal > days2Change.value : null
        if (days2Change) {
            if (bal > days2Change.value) {
                balances[k].days2p = (bal / days2Change.value - 1) * 100
            } else {
                balances[k].days2p = (days2Change.value / bal - 1) * 100
            }
        }

        const days3Rate = await Ticker.findOne({
            name: balances[k].name.toUpperCase(),
            date: { $lte: days3 }
        }).sort('-date')
        trend.days3 = days3Rate ? rate.value > days3Rate.value : null
        if (days3Rate) {
            if (rate.value > days3Rate.value) {
                trend.days3p = (rate.value / days3Rate.value - 1) * 100
            } else {
                trend.days3p = (days3Rate.value / rate.value - 1) * 100
            } 
        }

        const days5Rate = await Ticker.findOne({
            name: balances[k].name.toUpperCase(),
            date: { $lte: days5 }
        }).sort('-date')
        trend.days5 = days5Rate ? rate.value > days5Rate.value : null
        if (days5Rate) {
            if (rate.value > days5Rate.value) {
                trend.days5p = (rate.value / days5Rate.value - 1) * 100
            } else {
                trend.days5p = (days5Rate.value / rate.value - 1) * 100
            } 
        }

        const wkRate = await Ticker.findOne({
            name: balances[k].name.toUpperCase(),
            date: { $lte: wk }
        }).sort('-date')
        trend.wk = wkRate ? rate.value > wkRate.value : null
        if (wkRate) {
            if (rate.value > wkRate.value) {
                trend.wkp = (rate.value / wkRate.value - 1) * 100
            } else {
                trend.wkp = (wkRate.value / rate.value - 1) * 100
            } 
        }

        const wkChange = await Snap.findOne({
            name: balances[k].name.toUpperCase(),
            date: { $lte: wk }
        }).sort('-date')
        bal = rate ? balances[k].value * rate.value : balances[k].value

        balances[k].wk = wkChange ? bal > wkChange.value : null
        if (wkChange) {
            if (bal > wkChange.value) {
                balances[k].wk = (bal / wkChange.value - 1) * 100
            } else {
                balances[k].wk = (wkChange.value / bal - 1) * 100
            }
        }

        const wks2Rate = await Ticker.findOne({
            name: balances[k].name.toUpperCase(),
            date: { $lte: wks2 }
        }).sort('-date')
        trend.wks2 = wks2Rate ? rate.value > wks2Rate.value : null
        if (wks2Rate) {
            if (rate.value > wks2Rate.value) {
                trend.wks2p = (rate.value / wks2Rate.value - 1) * 100
            } else {
                trend.wks2p = (wks2Rate.value / rate.value - 1) * 100
            } 
        }

        const wks2Change = await Snap.findOne({
            name: balances[k].name.toUpperCase(),
            date: { $lte: wks2 }
        }).sort('-date')
        bal = rate ? balances[k].value * rate.value : balances[k].value

        balances[k].wks2 = wks2Change ? bal > wks2Change.value : null
        if (wks2Change) {
            if (bal > wks2Change.value) {
                balances[k].wks2 = (bal / wks2Change.value - 1) * 100
            } else {
                balances[k].wks2 = (wks2Change.value / bal - 1) * 100
            }
        }

        const mnthRate = await Ticker.findOne({
            name: balances[k].name.toUpperCase(),
            date: { $lte: mnth }
        }).sort('-date')
        trend.mnth = mnthRate ? rate.value > mnthRate.value : null
        if (mnthRate) {
            if (rate.value > mnthRate.value) {
                trend.mnthp = (rate.value / mnthRate.value - 1) * 100
            } else {
                trend.mnthp = (mnthRate.value / rate.value - 1) * 100
            } 
        }

        const mnthChange = await Snap.findOne({
            name: balances[k].name.toUpperCase(),
            date: { $lte: mnth }
        }).sort('-date')
        bal = rate ? balances[k].value * rate.value : balances[k].value

        balances[k].mnth = mnthChange ? bal > mnthChange.value : null
        if (mnthChange) {
            if (bal > mnthChange.value) {
                balances[k].mnthp = (bal / mnthChange.value - 1) * 100
            } else {
                balances[k].mnthp = (mnthChange.value / bal - 1) * 100
            }
        }

        const mnths2Rate = await Ticker.findOne({
            name: balances[k].name.toUpperCase(),
            date: { $lte: mnths2 }
        }).sort('-date')
        trend.mnths2 = mnths2Rate ? rate.value > mnths2Rate.value : null
        if (mnths2Rate) {
            if (rate.value > mnths2Rate.value) {
                trend.mnths2p = (rate.value / mnths2Rate.value - 1) * 100
            } else {
                trend.mnths2p = (mnths2Rate.value / rate.value - 1) * 100
            } 
        }

        trends.push(trend)
    }

    let total = 0
    balances.map(x => total += x.rate ? x.value * x.rate: x.value)

    ctx.render('index', { balances, total: total.toFixed(2), trends })
})

router.post('/add', async (ctx) => {
    const data = ctx.request.body,
          rate = await Ticker.findOne({ name: data.name }).sort('-date')

    await new Balance(data).save()
    await new Snap({
        name: data.name,
        value: rate ? data.value * rate : data.value,
        date: Date.now()
    }).save()

    ctx.redirect('/')
})

router.post('/update', async (ctx) => {
    const data = ctx.request.body,
          rate = await Ticker.findOne({ name: data.name }).sort('-date')

    await Balance.update({ name: data.name }, data)
    await new Snap({
        name: data.name,
        value: rate ? data.value * rate : data.value,
        date: Date.now()
    }).save()
    
    ctx.redirect('/')
})

router.get('/history/:names', async (ctx) => {
    const names = ctx.params.names.split(',')

    const end = new Date()
    let start = moment(end).subtract(1, 'week')

    switch (ctx.query.range) {
        case 'day':
            start = moment(end).subtract(1, 'day')
            break
        case 'week':
            start = moment(end).subtract(1, 'week')
            break
        case '2weeks':
            start = moment(end).subtract(2, 'weeks')
            break
        case 'month':
            start = moment(end).subtract(1, 'month')
            break
        case '2months':
            start = moment(end).subtract(2, 'months')
            break
    }

    const history = []
    
    for (let n of names) {
        const snaps = await Snap.find({
            name: n.toUpperCase(),
            date: { $gte: start, $lte: end }
        })

        history.push({ name: n.toUpperCase(), snaps })
    }

    ctx.body = history
})

module.exports = router