import express from "express";
const router = express.Router();

// GET	/api/broadcast	hämta alla meddelanden som skickats till broadcast kanalen
router.get("/api/broadcast");

// POST	/api/broadcast	skapa ett nytt meddelande i broadcast kanalen
router.post("/api/broadcast");

// GET	/api/channel/	hämtar en lista över kanaler.
router.get("/api/channel");

// GET	/api/channel/:id	hämtar alla meddelanden i specifik kanal
router.get("/api/channel/:id");

// PUT	/api/channel/	skapar en ny kanal. Kanalens namn ska skickas med.
router.put("/api/channel");

// POST	/api/channel/:id	skapa ett nytt meddelande i en specifik kanal som tidigare har skapats. Innehållet i ett meddelande bör vara minst anvsändare och innehåll.
router.post("/api/channel/:id");

// DELETE	/api/channel/:id	tar bort en identiferad kanal som tidigare annonserats ut. (kräver auth) VG
router.delete("/api/channel/:id");

export default router;
