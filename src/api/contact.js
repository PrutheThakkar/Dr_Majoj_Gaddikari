export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};

    const { firstName, lastName, email, phone, message } = body;

    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required form fields",
      });
    }

    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const n8nResponse = await fetch(
      "https://pruthe.app.n8n.cloud/webhook/3cde56f8-f64d-480f-8c9c-3aad619e3707",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          // camelCase fields for n8n old expressions
          firstName,
          lastName,
          email,
          phone,
          message,
          submittedAt,

          // Excel column fields
          "First Name": firstName,
          "Last Name": lastName,
          Email: email,
          Phone: phone,
          Message: message,
          "Submitted At": submittedAt,
        }),
      }
    );

    const n8nText = await n8nResponse.text();

    console.log("n8n status:", n8nResponse.status);
    console.log("n8n response:", n8nText);

    if (!n8nResponse.ok) {
      return res.status(502).json({
        success: false,
        message: "n8n webhook failed",
        details: n8nText,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("contact api error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while sending data",
      details: error.message,
    });
  }
}