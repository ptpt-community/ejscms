cms = require("./index.js")

conf = {
    staticHome: "/home/labnan/start/more-projects/thesis/ejscms/temps/static"
}
let data = [1,2,3];
cms.configure(conf);
cms.commit("/home/labnan/start/more-projects/thesis/ejscms/temps/templates/hello.ejs", {data}, "home");
