const express = require("express");
const router = express.Router();

// GET
router.get("/", async (req, res) => {
    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>VSCode Status by snehasishcodes</title>
            <link rel="shortcut icon" href="https://i.imgur.com/se56QbR.png" type="image/png">

            <style>
                body {
                    box-sizing: border-box;
                    min-height: 80vh;
                    background-color: black;
                    color: white;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                }

                main {
                    width: 100%;
                    min-height: 80vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: start;
                    align-items: center;
                    margin: 0 0 8rem 0;
                }

                nav {
                    width: 600px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    padding: 2rem 1rem;
                }

                nav img {
                    width: 60px;
                    height: 60px;
                }

                nav .vscode-status {
                    font-family: monospace;
                    color: rgb(120, 185, 255);
                    font-size: 20px;
                }

                nav .snehasish {
                    font-family: monospace;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 18px;
                }

                section {
                    width: 600px;
                    padding: 1rem;
                }

                section p {
                    font-family: monospace;
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 18px;
                }

                a {
                    color: rgb(120, 185, 255);
                }

                .blue {
                    color: rgb(120, 185, 255);
                }

                .link {
                    background: rgba(255, 255, 255, 0.8);
                    color: #000;
                    padding: 0.5rem 1rem;
                    font-family: monospace;
                    text-align: center;
                    text-decoration: none;
                    font-size: 18px;
                }

                .link:hover {
                    background: #fff;
                }

                @media only screen and (max-width: 600px) {
                    nav {
                        width: 100%;
                    }

                    section {
                        width: 100%;
                    }
                }
            </style>
        </head>

        <body>
            <main>
                <nav>
                    <p class="vscode-status">vscode-status</p>

                    <p class="snehasish">by <a href="https://snehasish.xyz">snehasish</a></p>
                </nav>

                <section>
                    <p>expose your current (and most recent) activity on visual studio code to a public api and access it any
                        time.</p>
                    <br>
                    <br>
                    <p class="blue">GET /api/users/[UID]</p>
                    <p>get your current and most recent visual studio code activity data.</p>
                    <p>example url: <span class="blue">https://vscode.snehasish.xyz/api/users/205525171733502843163</span></p>
                    <br>
                    <hr>
                    <br>
                    <h2>how to use</h2>
                    <p>1. download the vscode-status entension from the visual studio code marketplace.</p>
                    <a href="" class="link">download vscode-status extension</a>
                    <br>
                    <p>2. activate the extension and then click the extension button on the status bar.</p>
                    <p>3. you will be redirected to your create UID API URL endpoint.</p>
                    <br>
                    <p>if not: open extension settings and grab your UID. place the UID in place of the API URL endpoint.</p>
                </section>
            </main>
        </body>

        </html>    
    `);
});

module.exports = router;