import express from "express";
import pkg from "agora-access-token";

const { RtcTokenBuilder, RtcRole } = pkg;

const app = express();

app.get("/token", (req, res) => {
  const { userId, roomId, expire = 3600 } = req.query;

  if (!userId || !roomId) {
    return res.status(400).json({ error: "missing_params" });
  }

  const token = RtcTokenBuilder.buildTokenWithUid(
    process.env.AGORA_APP_ID,
    process.env.AGORA_APP_CERTIFICATE,
    roomId,
    Number(userId),
    RtcRole.PUBLISHER,
    Math.floor(Date.now() / 1000) + Number(expire)
  );

  res.json({ token });
});

const PORT = process.env.PORT || 3000;  

app.listen(PORT, () => {
  console.log("Agora token server running on port ", PORT);
});
