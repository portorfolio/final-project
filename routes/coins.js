var express = require('express');
var router = express.Router();
const Coins = require('../models/coins')

//allow coin iterations everytime one is tossed
router.put('/toss/:coin', async function (req, res) {
  try {
    let coinName = req.params.coin
    coinName = coinName.charAt(0).toUpperCase() + coinName.slice(1)

    const coin = await Coins.findOne({ coin: coinName })

    if (!coin) {
      return res.status(404).json({ error: `Coin ${coinName} not found` })
    }
    //coin iteration
    coin.count += 1

    //save it to the database 
    await coin.save();

    const allCoins = await Coins.find()
    let totalValue = 0
    let totalCoins = 0
    const CoinBreakdown = {}
    const val = parseFloat(c.dolVal.toString())

    allCoins.forEach(c => {
      totalValue += c.dolVal * c.count
      totalCoins += c.count
      CoinBreakdown[c.coin] = {
        count: c.count,
        totalValue: (val * c.count).toFixed(2)
      }
    })

    res.json({ totalValue: totalValue.toFixed(2), totalCoins, CoinBreakdown })

  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

//coins thrown statistics
router.get('/stats', async function (req, res) {
  try {
    let coins = await Coins.find()

    //if the user asks for a specific coin, only show the coins from the database that matches the filter
    const selectedCoin = req.query.coin

    if (selectedCoin) {
      coins = coins.filter(c => c.coin === selectedCoin.charAt(0).toUpperCase + selectedCoin.slice(1))
    }

    //initialize variables
    let totalValue = 0;
    let totalCoins = 0;
    let CoinBreakdown = {}

    //for each coin type found in the model
    coins.forEach(c => {

      //turn the dolVal into a string, then turn that string into a number that js could work with, and put it in the val variable
      const val = parseFloat(c.dolVal.toString())

      //calculate the total value by multiplying the value of coins and number of coins 
      totalValue += val * c.count
      totalCoins += c.count

      //for coin details of each coin, put it in an 'array'?, where it shows the type of coin, it's total amount and dollar value 
      CoinBreakdown[c.coin] = {
        count: c.count,
        dolVal: val
      }
    })
    //send that info to the browser as json
    res.json({
      //makes sure it's only 2 decimal places
      totalValue: totalValue.toFixed(2),
      totalCoins,
      CoinBreakdown
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
})


module.exports = router;
