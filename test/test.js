// var should = require("should");
// var request = require("request");
// var expect = require("chai").expect;
// var baseURI = "https://swapi.dev/api"
// var util = require("util");
// var endpoint = "/people/1/"

// describe("Get name", function(){
//     it('return lookupService', function(done){
//         request.get({url: baseURI + endpoint},
//             function(error, response, body){
//                     var bodyObj = JSON.parse(body);
//                     expect(bodyObj.name).to.equal("Luke Skywalker");
//                     console.log("received name is >> ", bodyObj.name);
//                     console.log("received hair color is >> ", bodyObj.hair_color);
//                     console.log("received status code is >> ", bodyObj.statusCode);

//                     expect(bodyObj.hair_color).to.equal("blond");
//                     expect(response.statusCode).to.equal(200);
//                     console.log(body);
//                 done();
//             }
//             );
//     });

// });