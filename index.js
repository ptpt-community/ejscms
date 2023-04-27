let ejs = require('ejs');
const fs = require('fs').promises;

let configuration;
/*
 * configuration.routePath
 * configuratioon.staticHome
 */

function configure (config){
   configuration = config;
}

async function commit(templatePath, data, routePath){
    try {
    let outputPath = configuration.staticHome+'/'+routePath+'/';
    let template = await fs.readFile(templatePath, 'utf8');
    let html = ejs.render(template, data);
    
    await fs.mkdir(outputPath, {recursive:true});
    await fs.writeFile(outputPath+"/index.html", html)


    }
    catch(e){
        console.log(e);
    }

}


module.exports={
    configure, commit

}
