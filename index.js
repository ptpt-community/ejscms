let ejs = require('ejs');
const fs = require('fs');
const simpleGit = require('simple-git');
const path = require('path');


let configuration;
/*
 * configuration.routePath
 * configuratioon.staticHome
 */



function configure(config) {
    configuration = config;
}
function makeGitCommit() {
    const path = '/media/jisan/C48458B38458A9A6/8th semester/Thesis/cms-dbms-showcase/static-home/home/index.html';
    const message='okay'
    const folderPath=configuration.staticHome

    simpleGit(folderPath).init((err, response) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Repository initialized at ' + JSON.stringify(response));
            // Create a file to commit
            // Stage the file for commit
            simpleGit(folderPath).add(folderPath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('File staged for commit');
                    // Commit the changes
                    simpleGit(folderPath).commit('Sucessfully committed', (err) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log('Changes committed');
                            let sgit = simpleGit(folderPath);
                            sgit.raw(['update-server-info'],
                                (err, result) => {
                                    if (err) {console.error(err);}
                                    else {console.log(result);}
                            });
                        }
                    });
                }
            });
        }

    });


}

/*
 *@deprecated
 */

async function commit(templatePath, data, routePath) {
    try {
        let outputPath = configuration.staticHome + '/' + routePath + '/';
        let template = await fs.readFile(templatePath, 'utf8');
        let html = ejs.render(template, data);

        await fs.mkdir(outputPath, {recursive: true});
        await fs.writeFile(outputPath + "/index.html", html)

        makeGitCommit()

    } catch (e) {
        console.log(e);
    }

}

async function writeFileWithDirectory(filePath, data, options) {
  const directory = path.dirname(filePath);

  try {
    // Create directory if it doesn't exist
    await fs.promises.mkdir(directory, { recursive: true });

    // Write the file
    await fs.promises.writeFile(filePath, data, options);

    console.log('File successfully written!');
  } catch (err) {
    console.error('Error:', err);
  }
}

async function linkToStatic(props) {
	let templatePath = props.templatePath;
	let data = props.templateData;
	let routePath = props.routePath;
	let renderedData = props.renderedData;
        try {
            let outputPath = configuration.staticHome + '/' + routePath;
            if(!props.renderedData) {
                let template = await fs.promises.readFile(templatePath, 'utf8');
                renderedData = ejs.render(template, data);
            }

            if(props.isHTML) outputPath += "/index.html";
            await writeFileWithDirectory(outputPath , renderedData)
            makeGitCommit()

    } catch (e) {
        console.log(e);
    }

}
module.exports = {
    configure, commit, linkToStatic

}
