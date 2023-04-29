let ejs = require('ejs');
const fs = require('fs').promises;
const simpleGit = require('simple-git');


let configuration;
/*
 * configuration.routePath
 * configuratioon.staticHome
 */



function configure(config) {
    configuration = config;
}
function nodeLibraryGit() {
    const path = '/media/jisan/C48458B38458A9A6/8th semester/Thesis/cms-dbms-showcase/static-home/home/index.html';
    const message='okay'
    const folderPath='/media/jisan/C48458B38458A9A6/8th semester/Thesis/cms-dbms-showcase/static-home/home'

    simpleGit(folderPath).init((err, response) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Repository initialized at ' + JSON.stringify(response));
            // Create a file to commit
            // Stage the file for commit
            simpleGit().add(path, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('File staged for commit');
                    // Commit the changes
                    simpleGit().commit('Initial commit', (err) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log('Changes committed');
                        }
                    });
                }
            });
        }
    });


}
async function commit(templatePath, data, routePath) {
    try {
        let outputPath = configuration.staticHome + '/' + routePath + '/';
        let template = await fs.readFile(templatePath, 'utf8');
        let html = ejs.render(template, data);

        await fs.mkdir(outputPath, {recursive: true});
        await fs.writeFile(outputPath + "/index.html", html)

        nodeLibraryGit()

    } catch (e) {
        console.log(e);
    }

}


module.exports = {
    configure, commit

}
