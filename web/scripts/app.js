const colors = {
    'BTC': 'rgba(255, 192, 0, 1)',
    'BCH': 'rgba(160, 120, 0, 1)',
    'DASH': 'rgba(0, 130, 230, 1)',
    'ETH': 'rgba(60, 60, 60, 1)',
    'ETC': 'rgba(200, 95, 25, 1)',
    'LTC': 'rgba(25, 200, 200, 1)',
    'ZEC': 'rgba(10, 175, 130, 1)',
    'XRP': 'rgba(100, 10, 175, 1)',
    'WAVES': 'rgba(150, 180, 100, 1)',
    'SBER': 'rgba(15, 200, 10, 1)',
    'ROKT': 'rgba(5, 140, 145, 1)'
}

const bgs = {
    'BTC': 'rgba(255, 192, 0, 0)',
    'BCH': 'rgba(160, 120, 0, 0)',
    'DASH': 'rgba(0, 130, 230, 0)',
    'ETH': 'rgba(60, 60, 60, 0)',
    'ETC': 'rgba(200, 95, 25, 0)',
    'LTC': 'rgba(25, 200, 200, 0)',
    'ZEC': 'rgba(10, 175, 130, 0)',
    'XRP': 'rgba(100, 10, 175, 0)',
    'WAVES': 'rgba(150, 180, 100, 0)',
    'SBER': 'rgba(15, 200, 10, 0)',
    'ROKT': 'rgba(5, 140, 145, 0)'
}

const defaultColor = 'rbga(40, 40, 40, 1)',
      defaultBg = 'rbga(40, 40, 40, 0)'

$(document).ready(() => {
    setTimeout(location.reload, 300000)
    if (!localStorage.getItem('range'))
        localStorage.setItem('range', 'week')

    $('#chart-range').val(localStorage.getItem('range'))
    $('#chart-range').change(function() {
        localStorage.setItem('range', $(this).val())
        location.reload()
    })

    const balances = $('#chart-balances').data('balances')
    $.get('/history/' + balances + '?range=' + localStorage.getItem('range'), (res) => {
        const datasets = []
        for (let set of res) {
            const dataset = {
                label: set.name,
                borderColor: colors[set.name] ? colors[set.name] : defaultColor,
                backgroundColor: bgs[set.name] ? bgs[set.name] : defaultBg
            }

            const data = []
            for (let values of set.snaps) {
                data.push({
                    x: values.date,
                    y: values.value
                })
            }

            dataset.data = data
            datasets.push(dataset)
        }

        const ctx = document.getElementById('chart-balances').getContext('2d')
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets
            },
            options: {
                responsive: true,
                scales: {
                    xAxes: [{
                        type: 'time',
                        display: true,
                        time: {
                            unit: 'hour',
                            displayFormats: {
                                'hour': 'MMM.DD | HH:MM'
                            }
                        }
                    }]
                }
            }
        })

        for (let i in balances.split(',')) {
            const ctx = document.getElementById(balances.split(',')[i]).getContext('2d')
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [datasets[i]]
                },
                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            type: 'time',
                            display: true,
                            time: {
                                unit: 'hour',
                                displayFormats: {
                                    'hour': 'MMM.DD | HH:MM'
                                }
                            }
                        }]
                    }
                }
            })
        }
    })
})