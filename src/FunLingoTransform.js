import {Link, useParams} from "react-router-dom";
import { useState } from "react";
import { languageOptionsData } from "./funlingo-appdata.js";
import { PageBorder } from "./PageBorder.js";

//Function to reverse words in a text string
const reverseText = text => text.split(' ').reverse().join(' ');

//Component for displaying errors
function LingoTransformError({message}) {
	return(
		<div id="fla-error" className={message ? 'flaErrorShow' : 'flaErrorHide'}>
			<p>{message}</p>
		</div>
	);
}

//ListItem Component for displaying input string in english and 
//translated output string in selected language option
function TransformListItem({listItem, lingo}) {
	return(
		<div className="fla-listitem">
			<p><strong>English:&nbsp;&nbsp;</strong>{listItem.inText}</p>
			<p><strong>{lingo}:&nbsp;&nbsp;</strong>{listItem.outText}</p>
		</div>
	);
}

//List Component for displaying upto three most recent translations
//attempted by user while on the same view
function LingoTransformsList({listItems, lingo}) {
	if (!listItems.length) return <div>&nbsp;</div>
	if (listItems.length > 3) listItems = listItems.slice(0,3);

	return(
		<div id="fla-transformlist">
		{
			listItems.map((item, i) => 
				<TransformListItem
					key={i}
					listItem={item}
					lingo={lingo}
				/>
			)
		}
		</div>
	);
}

//Transform Component displays custom view corresponding to the 
//translation language option selected on home page
//different API endpoints are invoked
export function FunLingoTransform() {
	const [inText, setInText] = useState('');
	const [outList, setOutList] = useState([]);
	const [errorText, setErrorText] = useState('');
	var {typeid} = useParams();

	const [viewInfo] = languageOptionsData.filter((item) => item.id === typeid);

	//onChange handler for input text area
	const textChangeHandler = (e) => {
		setInText(e.target.value);
	}

	//onClick handler for convert button
	const convertHandler = (e) => {
		e.preventDefault();

		if (errorText.length) { setErrorText('') }

		if (!inText) {
			setErrorText('Please enter some text to convert');
			return;
		}

		//Text reverse translation option doesn't use api
		if (!viewInfo.endpoint) {
			let newList = [{
				inText: inText,
				outText: reverseText(inText)
			}, ...outList];
			setInText('');
			setOutList(newList);		
		}
		else {
			//console.log(`https://api.funtranslations.com/translate/${viewInfo.endpoint}?text=${encodeURIComponent(inText)}`);

			fetch(`https://api.funtranslations.com/translate/${viewInfo.endpoint}?text=${encodeURIComponent(inText)}`)
			.then(res => res.json())
			.then(jsondata => {
				//console.log(jsondata);
				let newList = [{
					inText: inText,
					outText: jsondata.contents.translated
				}, ...outList];
				setOutList(newList);
				setInText('');
			})
			.catch((error) => {
				console.log(error);
				setErrorText('Oops something went wrong.');
			});
		}
	}

	return (
		<div id="fla-transform" className={viewInfo.image.replace('cover.png', 'view') + ' flaView'}>
			<PageBorder position="top" />
			<header>
				<nav>
					<Link to="/">Home</Link>
				</nav>
				<h1 id="fla-transform-title">{viewInfo.header}</h1>			
			</header>
			<div id="flaform-wrapper">
				<div id="flaform-input">
					<form>
						<textarea
							className="flaTextArea"
							name="textFrom"
							rows="4"
							value={inText}
							placeholder="Enter text to translate..."
							onChange={textChangeHandler}
						>
						</textarea>
						<button id="fla-convert" onClick={convertHandler}>Convert</button>
					</form>
					<LingoTransformError message={errorText} />
				</div>
				<LingoTransformsList listItems={outList} lingo={viewInfo.title}/>
			</div>
			<PageBorder position="bottom" />
		</div>
	);
}