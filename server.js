
const xlsx = require("xlsx");
const fs = require('fs');
const bodyParser = require('body-parser');

const filePath = "C:\\Users\\monst\\OneDrive\\JavaScript\\hangman\\Book1.xlsx";
//const newFilePath = "C:\\Users\\monst\\OneDrive\\JavaScript\\hangman\\updated.xlsx";
// Reading data from Excel file
const book = xlsx.readFile(filePath);
const list = book.Sheets["Sheet1"];
const data = xlsx.utils.sheet_to_json(list);




const express = require('express');
const app = express();
const port = 8484;


app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.json());

app.get('/data', (req, res) => {
    res.status(200).json(data)
    //console.log(res, req);
    //const key = req.query
    //console.log(key);
    //const { dynamic } = req.params
})

app.post('/', (req, res) => {
    //console.log(req.body);
    const book = xlsx.readFile(filePath);
    const list = book.Sheets["Sheet1"];
    const data = xlsx.utils.sheet_to_json(list);
    const entry = req.body;
    const a = entry.Answer.toLowerCase()
    const c = entry.Category.toLowerCase()
    const h = entry.Hint.toLowerCase()
    let repeat = false;
    for(const element of data){
        if((a == element.Answer.toLowerCase() && c == element.Category.toLowerCase())){
            repeat = true;
        }
    }
    if(!entry.Answer){
        return res.status(400).send({status: 'failed'})
    }
    if(a && c && h && !repeat){
        res.status(200).send({status: 'success'});
        data.push(entry);
        const sheet = xlsx.utils.json_to_sheet(data);
        book.Sheets["Sheet1"] = sheet;
        xlsx.writeFile(book, filePath);
    }

})


app.listen(port, () => console.log(`server has started running on port: ${port}`));
