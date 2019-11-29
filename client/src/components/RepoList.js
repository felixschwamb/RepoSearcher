import React from "react";
import { connect } from "react-redux";

import RepoElement from "./RepoElement";

function RepoList(props) {
	// display number of search results and creation of list elements, as soon as search results are available
	let listContent, numResults;
	if (props.items) {
		numResults = (
			<div className="cont_numResults">
				<p>{props.numHeader}{props.num}</p>
			</div>
		);

		listContent = props.items.map(repo => (
			<RepoElement key={repo.id} repo={repo} />
		));
	}

	return (
		<div className="cont_column">
			{numResults}
			<div id="repoList" className="cont_column">
				{listContent}
			</div>
		</div>
	);
}

const mapStateToProps = state => ({
	repoState: state.repoState
});

export default connect(mapStateToProps)(RepoList);