const express = require('express');
const app = express();
var exec = require('child_process').exec;
var cors = require('cors')
const fs = require('fs')

app.use(cors({
    origin: '*'
}))

const fileUpload = require('express-fileupload')
app.use(fileUpload())

app.use(express.json());

const PORT = 3000;
app.post('/convert/json', (req, res) => {
    let { name } = req.body;
    req.files.file.mv('uploaded_files/' + name + '.lpo'
    );

    // FILE SAVED AS 'uploaded_files/NAME.lpo'

    const output = exec('./decoder.sh /uploaded_files/' + name + ' converted/', { encoding: 'utf-8' });  // the default is 'buffer'
    let data = JSON.parse(fs.readFile("converted/file.json")) //PUT THE JSON DATA IN HERE
    res.send(data);
});

app.post('/convert/lpo', (req, res) => {
    let { name, data } = req.body;

    // SAVE THE DATA TO 'uploaded_files/NAME.lpo'

    res.download('lpo_files/' + name + '.lpo');
});

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
}
);