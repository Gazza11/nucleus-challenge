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

// export function getDailyPortfolioValues() {
//     return [];
// }

// export function getDailyPortfolioValues() 
const getDailyPortfolioValues =() =>
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

        for (let y = 0; y < Object.keys(prices).length; y ++){
            if (prices[y].effectiveDate.getDate() == i){
                dailyValue = prices[y].price
            }
        }

        // Keeps a running total of bitcoin in the account.
        // Current issue with adding floats together and getting a random decimal which is messing with the
        // tests.

        for (let x = 0; x < Object.keys(transactions).length; x ++){
            if (transactions[x].effectiveDate.getDate() == i){
                totalBitcoin += transactions[x].value
                // console.log(totalBitcoin, i)
            }
        }

        result.push({
            effectiveDate: new Date(2021, 8, i, 1, 0, 0),
            value: parseFloat(dailyValue * totalBitcoin).toFixed(5)
        })
    }

    return result;
}

console.log(getDailyPortfolioValues())