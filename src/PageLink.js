import { Link } from 'react-router-dom';

//PageLink Component
export function PageLink({data})
{
	return(
		<Link to={"/transform/" + data.id}>
			<div className="flaOption" id={data.id}>
				<p className="flaOptionTitle">{data.title}</p>
			</div>
		</Link>
	);
}