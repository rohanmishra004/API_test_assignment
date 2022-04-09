const express = require('express')
// const csv_parse = require('csv-parser')
const csvToJson = require('csvtojson')
const app = express()

const PORT = process.env.PORT || 3500
app.listen(PORT, ()=>console.log('Server running ...'))

app.get('/getCustomers', async (req,res) => {
    try {
        let data = await csvToJson().fromFile('Test_data.csv')
        console.log(data)
        let processed = []
        let unProcessed = []
        let s1 = new Set();
        for (let singleData of data) {
            if (singleData?.Mobile ) {
                if (!s1.has(singleData?.Mobile) || singleData.Mobile === 'null') {
                    processed.push(singleData)
                    s1.add(singleData?.Mobile)
                } else {
                    unProcessed.push(singleData)
                    
                } 
            }
        }
        let jsonOutput = {
            "processed": processed,
            "unProcessed": unProcessed,
        }

        console.log("jsonOutput: ", jsonOutput)
    
    } catch (err) {
        console.log("error", err.message)
        }
        
})



