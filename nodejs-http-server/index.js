const http = require("http");
const crypto = require("crypto");

const server = http.createServer((request, response) => {
    console.log("request received", request.url);

    switch (request.url) {
        case "/about":
            if (request.method === "POST")
                response.end("This is about page for POST request");
            else response.end("This is about page");
            break;

        case "/contactus":
            response.end("This is aboutus page");
            break;

        case "/profile":
            console.log("Starting asynchronous hash generation...\n");
            const start = Date.now();
            for (let i = 0; i < 50; i++) {
                crypto.pbkdf2("password", "salt", 100000, 64, "sha512", () => {
                    const timeTaken = Date.now() - start;
                    console.log(`Hash ${i + 1} done in ${timeTaken}ms`);
                    if (i === 49) response.end("This is profile page");
                });
            }
            break;

        default:
            response.end("hello");
    }
});

server.listen(8080, () => {
    console.log("Server is running on port 8080");
});
