const express = require('express');
const app = express();
var exec = require('child_process').exec;

const fileUpload = require('express-fileupload')
app.use(fileUpload())

const PORT = 3000;
app.post('/convert/json', (req, res) => {
    let { name } = req.body;
    req.files[0].mv('uploaded_files/' + name + '.lpo', function (err) {
        if (err)
            return res.status(500).send(err);
    }
    );

    // FILE SAVED AS 'uploaded_files/NAME.lpo'

    const output = exec('./decoder.sh ' + name + ' converted', { encoding: 'utf-8' });  // the default is 'buffer'
    let data = {} //PUT THE JSON DATA IN HERE
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