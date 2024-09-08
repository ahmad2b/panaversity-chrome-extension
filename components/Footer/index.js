import styles from "./Footer.module.css";

export default function Footer() {
	return (
		<footer
			className={styles.footer}
			style={{
				borderTop: "1px solid #eaeaea",
				borderBottom: "1px solid #eaeaea",
				backgroundColor: "#FFF5F5",
			}}
		>
			<a
				href="https://panaversity.com"
				target="_blank"
				rel="noopener noreferrer"
				style={{
					display: "flex",
					alignItems: "center",
					color: "black",
					fontStyle: "italic",
				}}
			>
				info@panaversity.com
				<span className={styles.logo}>
					<img
						src="icons/panaversity.png"
						alt="Logo"
						width={16}
						height={16}
					/>
				</span>
			</a>
		</footer>
	);
}
