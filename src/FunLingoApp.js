import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { languageOptionsData } from "./funlingo-appdata.js";
import { FunLingoMenu } from "./FunLingoMenu.js";
import { FunLingoTransform } from "./FunLingoTransform.js";


//App Home Page Component
function FunLingoAppHome()
{
	return(
		<>
			<FunLingoMenu languageOptions={languageOptionsData}/>
		</>
	);
}

//App Routes Component
function FunLingoAppRoutes()
{
	return(
		<>
			<Routes>
				<Route path="/" element={<FunLingoAppHome />} />
				<Route path="/transform/:typeid" element={<FunLingoTransform />} />
			</Routes>
		</>
	);
}

export function FunLingoApp() {
	return(
		<Router>
			<FunLingoAppRoutes />
		</Router>
	);
}