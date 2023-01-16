let should = require("should");
let request = require("request");
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let expect = require("chai").expect;
chai.use(require('chai-string'));
let util = require("util");
let token = "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"
let new_gist_id = ""
var commentId = ""
let baseURI = "https://api.github.com"
let endpoint = ""

describe("Create a new gist on Github", function () {
  it("Post()", function (done) {
    chai.request(baseURI).post("/gists")
      .set({ "Authorization": `Bearer ${token}` })
      .set('content-type', 'application/json')
      .send(
        {
          description: "This is a sample gist created to check Github APIs",
          files: {
            "TestFile1.txt": {
              "content": "Sample text file"
            },
            "TestFile2.txt": {
              "content": "Sample text file."
            }
          }
          ,
          public: true
        })
      .then((res) => {
        expect(res).to.have.status(201)
        const body = res.body
        console.log(body.files)
        new_gist_id = body.id
        console.log("new gist id = " + new_gist_id)
        done();
      }).catch((err) => done(err))
  });
});

describe("Get file names of the created gist", function () {
  it("Get()", function (done) {
    chai.request(baseURI).get("/gists/" + new_gist_id)
      .set({ "Authorization": `Bearer ${token}` })
      .then((res) => {
        expect(res).to.have.status(200)
        const body = res.body
        console.log(body.files)
        expect(body.files).to.be.all.keys("TestFile1.txt", "TestFile2.txt")
        done();
      }).catch((err) => done(err))
  });
});


let comment = "Adding a test comment from Automation - " + Date.now()
describe("Post a comment on the gist", function () {
  it("Post()", async function () {
    await chai.request(baseURI).post("/gists/" + new_gist_id + "/comments")
      .set({ "Authorization": `Bearer ${token}` })
      .set('content-type', 'application/json')
      // .send({ "body": "Testing second comment from Automation" })
      .send({ "body": comment })
      .then((res) => {
        expect(res).to.have.status(201)
        const body = res.body
        console.log("Response status code is - " + res.status)
        console.log(body)
        commentId = body.id
        console.log(commentId)
      }).catch((err) => done(err))
  });
});


endpoint = "/gists/" + new_gist_id + "/comments/" + commentId
describe("Get last posted comment on gist", function () {
  it("Get()", function (done) {
    chai.request(baseURI).get("/gists/" + new_gist_id + "/comments/" + commentId)
      .set({ "Authorization": `Bearer ${token}` })
      .then((res) => {
        expect(res).to.have.status(200)
        const responseBody = res.body
        //  console.log(body) 
        console.log(responseBody.body)
        expect(responseBody.body).to.equalIgnoreCase(comment);
        done();
      }).catch((err) => done(err))
  });
});

