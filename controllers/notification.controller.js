const axios = require('axios');

const pushNotification = async (req, res) => {
    try {
        const { title, body ,large_picture} = req.body;
        if (!title || !body) {
            return res.status(400).json({ message: "Both 'title' and 'body' are required in the request body." });
        }

        const response = await axios.post("https://onesignal.com/api/v1/notifications", {
            app_id: process.env.ONESIGNAL_APP_ID,
            included_segments: ["All"],
            headings: {
              en: title,
            },
            contents: {
                en: body,
            },
            large_icon: large_picture || "https://lh3.googleusercontent.com/bG8S6dXujrCPmathGprlTRY8HZaFDJ8mdSrWHrmgrtdXQAkjY-ciDR0Q-UYPUJuI7d56=h100",
        }, {
            headers: {
                Authorization: `Bearer ${process.env.ONESIGNAL_REST_API_KEY}`
            }
        });

        res.status(200).json({ message: "Notification sent" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    pushNotification
};
