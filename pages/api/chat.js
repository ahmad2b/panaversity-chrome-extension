export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { messages } = req.body;
	const messagesLength = messages.length;

	console.log("messages", messages);
	console.log("messages", messages[messagesLength - 1].content);

	try {
		const response = await fetch(
			`https://c15e-34-106-76-61.ngrok-free.app/langchain?input=${
				messages[messagesLength - 1].content
			}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					// Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
				},
				// body: JSON.stringify({
				// 	model: "gpt-3.5-turbo",
				// 	messages: messages,
				// }),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to get response from OpenAI");
		}

		const data = await response.json();

		// {
		//   "question": "hi",
		//   "chat_history": [],
		//   "output": "Hello! How can I assist you today?"
		// }

		// res.status(200).json({ content: data.choices[0].message.content });
		res.status(200).json({ content: data.output });
	} catch (error) {
		console.error("Error:", error);
		res
			.status(500)
			.json({ error: "An error occurred while processing your request." });
	}
}
