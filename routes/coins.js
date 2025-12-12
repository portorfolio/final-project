var express = require('express');
var router = express.Router();
const Coins = require('../models/coins')

//get data from model and turn it into json
router.get('/', async function (req, res, next) {
  try {
    const coins = await Coins.find()
    res.render('index', { coins })
  } catch (err) {
    next(err)
  }
});

//allow coin iterations
router.put('/toss/:coin', async function (req, res) {
  try {
    const coinName = req.params.coin

    const coin = await Coins.findOne({ coin: coinName })
    coin.count += 1
    await coin.save();
    res.json('Coin tossed: ', coin)

  } catch (error) {
    console.log(error)
    res.send('Something went wrong')
  }
})

//coins thrown statistics
router.get('/stats', async function (req, res) {
  try {
    const coins = await Coins.find()

    let totalValue = 0;
    let totalCoins = 0;

    coins.forEach(c => {
      const val = parseFloat(c.dolVal.toString())
      totalValue += val * c.count
      totalCoins += c.count
    })
    res.json({
      totalValue: totalValue.toFixed(2),
      totalCoins,
      CoinBreakdown: {
        coin: c.coin,
        count: c.count,
      }
    })
  } catch (error) {
    console.log(error)
    res.send('Unable to calculate stats')
  }
})

module.exports = router;
