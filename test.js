cms = require("./index.js")

conf = {
    staticHome: "/media/jisan/C48458B38458A9A6/8th semester/Thesis/Static"
}
let data = [1,2,3];
cms.configure(conf);
cms.commit("/media/jisan/C48458B38458A9A6/8th semester/Thesis/Templates/page.ejs", {data}, "home");

// Open the Git repository

