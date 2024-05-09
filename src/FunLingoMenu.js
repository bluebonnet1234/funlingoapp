import { PageBorder } from "./PageBorder.js";
import { PageLink } from "./PageLink.js";

//Component to display main message on home page
function MenuMessage() {
	return(
		<div id="fla-message">
			<section>
				<h1 id="fla-message-name">FUNLINGO</h1>
				<p>This is your chance to gain multilingual expertise! Click one of the options to begin the fun.</p>
			</section>
		</div>
	);
}

//Component to display language options on home page
function MenuOptions({languageOptions}) {
	return(
		<div id="fla-options">
		{
			languageOptions.map((item, i) => <PageLink key={i} data={item} />)
		}
		</div>
	);
}

//Component to wrap elements of home page
export function FunLingoMenu({languageOptions}) {
	return (
		<>
			<PageBorder position="top" />	
			<div className="flaWrapper">
				<MenuMessage />
				<MenuOptions languageOptions={languageOptions} />
			</div>
			<PageBorder position="bottom" />
		</>	
	);
}