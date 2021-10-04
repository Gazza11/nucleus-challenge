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

    // Loops to check the 7 days.
    for (let i = 1; i < 8; i++){

        // Check prices for daily change, want to have a constant daily value. As if it doesn't change,
        // I need the the previous one.

        // As they reassign on change, and are sorted from earliest to latest, any price change on the same day
        // will be set to the most recent.

        dailyValue = getDailyBitcoinValue(i, dailyValue)

        // Keeps a running total of bitcoin in the account.

        totalBitcoin = getCurrentBitcoinTotal(i, totalBitcoin)


        result.push({
            effectiveDate: new Date(2021, 8, i, 1, 0, 0),
            value: parseFloat((dailyValue * totalBitcoin).toFixed(5))
        })
    }

    return result;
}

// Subfunction that gets daily Bitcoin value.


const getDailyBitcoinValue = (day, value) => {
    let dailyValue = value

    for (let y = 0; y < Object.keys(prices).length; y ++){
        // If statement that breaks if the day of the price change is more that the day indicated.
        // Can only be done as the prices are ordered intially.
        // Will allow the function to skip some unneeded iterations.

        if (prices[y].effectiveDate.getDate() > day){
            break
        } else if (prices[y].effectiveDate.getDate() == day){
            dailyValue = prices[y].price
        }
    }
    return dailyValue
}

// Subfunction that gets total of bitcoin in porfolio.

const getCurrentBitcoinTotal = (day, currentBitcoin) => {
    let totalBitcoin = currentBitcoin

    for (let x = 0; x < Object.keys(transactions).length; x ++){

        if (transactions[x].effectiveDate.getDate() > day){
            break
        } else if (transactions[x].effectiveDate.getDate() == day){
            totalBitcoin += transactions[x].value
        }
    }
    return totalBitcoin
}

console.log(getDailyPortfolioValues())