const express = require("express");
const router = express.Router();
const Data = require("../database/models/data");
const format = require("../lib/format");

router.get("/users/:uid/svg", async (req, res) => {
	const uid = req.params.uid;
	if (!uid || typeof uid !== "string") return res.status(400).json({ error: "UID is a required string." }).end();

	const {
		line1 = "Editing {file}",
		line2 = "Line {currentLine} Col {currentCol} - {size}",
		line3 = "Workspace: {workspaceName} - {debugging}",
		line4 = "Elapsed {elapsedTime}",
		theme = "dark"
	} = req.query;
	const data = await Data.findOne({ uid: uid });

	if (!data || data.uid !== uid) return res.status(404).json({ error: "User not found." }).end();

	const current = data.current;
	const recent = data.recent;

	const status = current ? { ...current, type: "current" } : recent ? { ...recent, type: "recent" } : null;

	const vscodeSVG = `<svg height="70" width="70" viewBox="-11.9 -2 1003.9 995.6" xmlns="http://www.w3.org/2000/svg"><path d="m12.1 353.9s-24-17.3 4.8-40.4l67.1-60s19.2-20.2 39.5-2.6l619.2 468.8v224.8s-.3 35.3-45.6 31.4z" fill="#2489ca"/><path d="m171.7 498.8-159.6 145.1s-16.4 12.2 0 34l74.1 67.4s17.6 18.9 43.6-2.6l169.2-128.3z" fill="#1070b3"/><path d="m451.9 500 292.7-223.5-1.9-223.6s-12.5-48.8-54.2-23.4l-389.5 354.5z" fill="#0877b9"/><path d="m697.1 976.2c17 17.4 37.6 11.7 37.6 11.7l228.1-112.4c29.2-19.9 25.1-44.6 25.1-44.6v-671.2c0-29.5-30.2-39.7-30.2-39.7l-197.7-95.3c-43.2-26.7-71.5 4.8-71.5 4.8s36.4-26.2 54.2 23.4v887.5c0 6.1-1.3 12.1-3.9 17.5-5.2 10.5-16.5 20.3-43.6 16.2z" fill="#3c99d4"/></svg>`;

	// Create the SVG with embedded HTML
	const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" xmlns:xlink="http://www.w3.org/1999/xlink">

      	<foreignObject x="0" y="0" width="400" height="400">

        	<div xmlns="http://www.w3.org/1999/xhtml" style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; background: transparent;">

          		<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2rem; background-color: ${theme === "dark" ? "#191919" : "#fff"}; color: ${theme === "dark" ? "#fff" : "#000"}; border-radius: 1.5rem; gap: 1rem;">

            		<div style="width: 100%;display: flex; flex-direction: row; align-items: center; gap: 1rem;">
						<div style="height: 15px; width: 15px; border-radius: 100px; background-color: ${status ? status.type === "recent" ? "#9ca3af" : "#4ade80" : "#f87171"};"></div>
					
						<h3 style="font-weight: 500; width: 100%; line-height: 1;margin:0;padding:0; color: ${theme === "dark" ? "#d4d4d4" : "#6b7280"};">
							${!status ? "NO CURRENT ACTIVITY" : "VISUAL STUDIO CODE"}
						</h3>
					</div>

            		<div style="width: 100%; display: flex; flex-direction: row; justify-content: start; align-items: center; gap: 1rem;">

                		<div>${vscodeSVG}</div>

                		<div style="display: flex;flex-direction:column;justify-content:start;align-items:start;gap:0;">
                    		<h4 style="display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;  overflow: hidden; margin: 0; padding: 0;font-weight:500;">
								${format(line1, status)}
							</h4>
                    
                    		<h4 style="display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;  overflow: hidden; margin: 0; padding: 0; font-weight: 400;">
								${format(line2, status)}
							</h4>

							<h4 style="display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;  overflow: hidden; margin: 0; padding: 0; font-weight: 400;">
								${format(line3, status)}
							</h4>

							<p style="display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;  overflow: hidden;margin: 0; padding: 0;color: ${theme === "dark" ? "#d4d4d4" : "#6b7280"};">
								${format(line4, status)}
							</p>

                		</div>

            		</div>

          		</div>

        	</div>

    	</foreignObject>
    </svg>
  `;

	// Set the response type and send the SVG
	res.setHeader('Content-Type', 'image/svg+xml');
	res.send(svgContent);
});

module.exports = router;