//Component for top and bottom page border
export function PageBorder({position})
{
	return (
		<div className={"flaBorder" + (position === "top" ?  "" : " flaBorderBottom")}></div>
	);
}