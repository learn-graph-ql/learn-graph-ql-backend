const express = require('express');
const app = express();
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Now listening for requests on port ${PORT}`);
})

