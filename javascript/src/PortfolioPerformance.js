const prices = [
    { effectiveDate: new Date(2021, 8, 1, 5, 0, 0), price: 35464.53 },
    { effectiveDate: new Date(2021, 8, 2, 5, 0, 0), price: 35658.76 },
    { effectiveDate: new Date(2021, 8, 3, 5, 0, 0), price: 36080.06 },
    { effectiveDate: new Date(2021, 8, 3, 13, 0, 0), price: 37111.11 },
    { effectiveDate: new Date(2021, 8, 6, 5, 0, 0), price: 38041.47 },
    { effectiveDate: new Date(2021, 8, 7, 5, 0, 0), price: 34029.61 },
];

const transactions = [
    { effectiveDate: new Date(2021, 8, 1, 9, 0, 0), value: 0.012 },
    { effectiveDate: new Date(2021, 8, 1, 15, 0, 0), value: -0.007 },
    { effectiveDate: new Date(2021, 8, 4, 9, 0, 0), value: 0.017 },
    { effectiveDate: new Date(2021, 8, 5, 9, 0, 0), value: -0.01 },
    { effectiveDate: new Date(2021, 8, 7, 9, 0, 0), value: 0.1 },
];

export function getDailyPortfolioValues() 
// const getDailyPortfolioValues =() =>
{
    const result = []
    let totalBitcoin = 0
    let dailyValue = 0

    // Creates clone of prices array that can be mutated without mutating origin array. 
    let temporaryPricesList = prices.slice()

    let temporaryTransactionsList = transactions.slice()

    // Loops to check the 7 days.
    for (let i = 1; i < 8; i++){

        // Check prices for daily change, want to have a constant daily value. As if it doesn't change,
        // I need the the previous one.

        // As they reassign on change, and are sorted from earliest to latest, any price change on the same day
        // will be set to the most recent.

        dailyValue = getDailyBitcoinValue(i, dailyValue, temporaryPricesList)

        // Keeps a running total of bitcoin in the account.

        totalBitcoin = getCurrentBitcoinTotal(i, totalBitcoin, temporaryTransactionsList)


        result.push({
            effectiveDate: new Date(2021, 8, i, 1, 0, 0),
            value: parseFloat((dailyValue * totalBitcoin).toFixed(5))
        })
    }

    return result;
}

// Subfunction that gets daily Bitcoin value.


const getDailyBitcoinValue = (day, value, temporaryPricesList) => {
    let dailyValue = value

    let pricesList = temporaryPricesList

    let indexToRemove = []

    for (let y = 0; y < Object.keys(pricesList).length; y ++){
        // If statement that breaks if the day of the price change is more that the day indicated.
        // Can only be done as the prices are ordered intially.
        // Will allow the function to skip some unneeded iterations.
        // By using splice, it removes the object that was already used, meaning that future iterations
        // will be quicker.

        if (pricesList[y].effectiveDate.getDate() > day){
            break
        } else if (pricesList[y].effectiveDate.getDate() == day){
            dailyValue = pricesList[y].price
            indexToRemove.push(y)
        }
    }
    if (indexToRemove.length > 0){
        for (let i = 0; i < indexToRemove.length; i++){
            pricesList.splice(indexToRemove[0], 1)
        }
    }
    return dailyValue
}

// Subfunction that gets total of bitcoin in porfolio.

const getCurrentBitcoinTotal = (day, currentBitcoin, temporaryTransactionsList) => {
    let totalBitcoin = currentBitcoin

    let transactionsList = temporaryTransactionsList

    let indexToRemove = []

    for (let x = 0; x < Object.keys(transactionsList).length; x ++){

        if (transactionsList[x].effectiveDate.getDate() > day){
            break
        } else if (transactionsList[x].effectiveDate.getDate() == day){
            totalBitcoin += transactionsList[x].value
            indexToRemove.push(x)
        }
    }
    if (indexToRemove.length > 0){
        for (let i = 0; i < indexToRemove.length; i++){
            transactionsList.splice(indexToRemove[0], 1)
        }
    }
    return totalBitcoin
}

console.log(getDailyPortfolioValues())