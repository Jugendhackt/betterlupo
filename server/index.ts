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
app.post('/convert/json', async (req, res) => {
    let { name } = req.body;
    req.files.file.mv('uploaded_files/' + name + '.lpo'
    );

    // FILE SAVED AS 'uploaded_files/NAME.lpo'

    const output = await exec('./decoder.sh ./uploaded_files/' + name + '.lpo ./converted/', { encoding: 'utf-8' });  // the default is 'buffer'
    setTimeout(async () => {
        let data = JSON.parse(await fs.readFileSync('./converted/file.json','utf8', (err, data) => {
            if (err) {
            console.error(err);
            return;
            }
            console.log(data);
        }));
        console.log(data)
        res.status(200).send(data);
    }, 500)
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