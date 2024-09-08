import { useEffect, useState } from "react";
import styles from "../../styles/Pages.module.css";

export default function Index({ navigateToPage }) {
	const [ChatComponent, setChatComponent] = useState(null);

	useEffect(() => {
		import("../ChatComponent").then((module) => {
			setChatComponent(() => module.default);
		});
	}, []);

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<div className={styles.container}>
					<main className={styles.main}>
						{ChatComponent && <ChatComponent />}{" "}
					</main>
				</div>
			</main>
		</div>
	);
}
