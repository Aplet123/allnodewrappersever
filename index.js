function search(word) {
    var promise = new Promise(function (resolve, reject) {
        var request = require("request");
        var cheerio = require("cheerio");
        var url = require("url");
        if(word !== undefined) {
            request("http://wordnetweb.princeton.edu/perl/webwn?s=" + word, function(error, response, body) {
                    var $;
                    try {
                        $ = cheerio.load(body);
                    } catch (err) {
                        reject("could not load site");
                    } 
                    if (!error && response.statusCode == 200 && $("ul").length > 0) {
                       resolve($("ul").text());
                    } else if ($("ul").length === 0) {
                        reject("undefined word");
                    } else {
                        reject("unknown error");
                    }
                });
        } else {
            reject("no word given");
        }
    });
    return promise;
}

module.exports = {
    search
};