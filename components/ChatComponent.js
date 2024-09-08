// import { useChat } from "ai/react";
// import styles from "../styles/Pages.module.css";

// export default function ChatComponent() {
// 	const { messages, input, handleInputChange, handleSubmit } = useChat();

// 	return (
// 		<>
// 			<div className={styles.chatContainer}>
// 				{messages.map((m, index) => (
// 					<div
// 						key={index}
// 						className={
// 							m.role === "user" ? styles.userMessage : styles.aiMessage
// 						}
// 					>
// 						{m.content}
// 					</div>
// 				))}
// 			</div>
// 			<form
// 				onSubmit={handleSubmit}
// 				className={styles.inputForm}
// 			>
// 				<input
// 					value={input}
// 					onChange={handleInputChange}
// 					placeholder="Say something..."
// 					className={styles.input}
// 				/>
// 				<button
// 					type="submit"
// 					className={styles.button}
// 				>
// 					Send
// 				</button>
// 			</form>
// 		</>
// 	);
// }

import { useState } from "react";
import styles from "../styles/Pages.module.css";

export default function ChatComponent() {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");

	const handleInputChange = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!input.trim()) return;

		// Add user message to the chat
		const userMessage = { role: "user", content: input };
		setMessages((prevMessages) => [...prevMessages, userMessage]);
		setInput("");

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ messages: [...messages, userMessage] }),
			});

			if (!response.ok) {
				throw new Error("Failed to get response");
			}

			const data = await response.json();
			setMessages((prevMessages) => [
				...prevMessages,
				{ role: "assistant", content: data.content },
			]);
		} catch (error) {
			console.error("Error:", error);
			setMessages((prevMessages) => [
				...prevMessages,
				{ role: "assistant", content: "Sorry, I encountered an error." },
			]);
		}
	};

	return (
		<>
			<div className={styles.chatContainer}>
				{messages.map((m, index) => (
					<div
						key={index}
						className={
							m.role === "user" ? styles.userMessage : styles.aiMessage
						}
					>
						{m.content}
					</div>
				))}
			</div>
			<form
				onSubmit={handleSubmit}
				className={styles.inputForm}
			>
				<input
					value={input}
					onChange={handleInputChange}
					placeholder="Say something..."
					className={styles.input}
				/>
				<button
					type="submit"
					className={styles.button}
				>
					Send
				</button>
			</form>
		</>
	);
}
