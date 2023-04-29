cms = require("../index.js")
const path = require("path");

conf = {
    staticHome: path.resolve(__dirname, 'static-temp')
}
let data = [1,2,3];
cms.configure(conf);
cms.commit(path.resolve(__dirname, 'templates','hello.ejs'), {data}, "home");

// Open the Git repository

