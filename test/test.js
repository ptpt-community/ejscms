cms = require("../index.js")
const path = require("path");

conf = {
    staticHome: path.resolve(__dirname, 'static-temp')
}
let data = [1,2,3, 4];
cms.configure(conf);
console.log({data})
cms.linkToStatic({
    templatePath:path.resolve(__dirname, 'templates','hello.ejs'),
    templateData: {data},
    routePath: "home",
    isHTML: true
});

// Open the Git repository

