import request from "supertest";
import * as chai from 'chai';
import chaiHttp from "chai-http";
import express from "express";
import router from '../src/routes.js';
import simpleHashSet from '../src/hashset.js';


const { expect } = chai;
chai.use(chaiHttp);

// Create an Express app instance to test the router
const app = express();
app.use(express.json()); // Enable JSON body parsing
app.use("/api", router);

const usernames = new simpleHashSet();

describe("Usernames API", function () {
    beforeEach(() => {
        // Reset the usernames instance before each test
        usernames.buckets = Array.from({ length: usernames.size }, () => []);
    });

    it("should register a new username", (done) => {
        request(app)
            .post("/api/register")
            .send({ username: "testuser" })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("message", "Username registered successfully");
                done();
            });
    });

    it("should not register an existing username", async () => {
            // First registration - should succeed
            await request(app).post("/api/register").send({ username: "testuser" });
    
          ;
        
  // Second registration - should fail with 409
            const res = await request(app).post("/api/register").send({ username: "testuser" });
    
            expect(res.status).to.equal(409); // ✅ Expecting 409 Conflict
            expect(res.body).to.have.property("error", "Username already exists");
        });
        

        it("should return all usernames as an array", function (done) {
            request(app)
                .get("/api/usernames") // ✅ Ensure correct path
                .expect(200)
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property("usernames").that.is.an("array"); // ✅ Correct check
                    done();
                });
        });

        it("should remove a username from usernames", function (done) {
            const testUsername = "testuser";
    
            // Step 1: Add a username first to ensure it exists
            request(app)
                .post("/api/register")
                .send({ username: "testUsername" })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
    
                    // Step 2: Delete the username
                    request(app)
                        .delete("/api/remove")
                        .send({ username: "testUsername" })
                        .expect(200)
                        .expect("Content-Type", /json/)
                        .end((err, res) => {
                            if (err) return done(err);
    
                            expect(res.body).to.have.property("message", "Username removed successfully");
    
                            // Step 3: Verify that username no longer exists
                            request(app)
                                .get("/api/exists")
                                .send({ username: "testUsername" })
                                .expect(200)
                                .end((err, res) => {
                                    if (err) return done(err);
    
                                    expect(res.body.exists).to.be.false;
                                    done(); // ✅ Ensure done() is called
                                });
                        });
                });
            });

            it("should update a username", function (done) {
                const oldUsername = "olduser";
                const newUsername = "newuser";
        
                // Step 1: Add the old username first to ensure it exists
                request(app)
                    .post("/api/register")
                    .send({ username: oldUsername })
                    .expect(200)
                    .end((err, res) => {
                        if (err) return res.status(404).done(err);
        
                        // Step 2: Update the username
                        request(app)
                            .put("/api/update")
                            .send({ oldUsername, newUsername })
                            .expect(200)
                            .expect("Content-Type", /json/)
                            .end((err, res) => {
                                if (err) return done(err);
        
                                expect(res.body).to.have.property("message", "Username updated successfully");
        
                                // Step 3: Verify the username has been updated
                                request(app)
                                    .get("/api/exists")
                                    .send({ username: newUsername })
                                    .expect(200)
                                    .end((err, res) => {
                                        if (err) return res.status(404).done(err);
                                        expect(res.body.exists).to.be.true;
                                        done(); // ✅ Ensure done() is called
                                    });
                            });
                    });
            });
    });

          
    