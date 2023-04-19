let ejs = require('ejs');
const fs = require('fs').promises;

let configuration;

function configure (config){
   configuration = config;
}

async function commit(templatePath, data, routePath){
    try {
    let outputPath = configuration.staticHome+'/'+routePath;
    let template = await fs.readFile(templatePath, 'utf8');
    let html = ejs.render(template, data);
    
    await fs.writeFile(outputPath, html)


    }
    catch(e){
        console.log(e);
    }

}


module.exports={
    configure, commit

}
