import React from "react";
import { connect } from "react-redux";

import Header from "./Header";
import SearchInput from "./SearchInput";
import RepoList from "./RepoList";

function Home(props) {
	const { items, total_count } = props.repoState;
	return (
		<div>
			<Header />
			<SearchInput />
			<RepoList
				items={items}
				num={total_count}
				numHeader={"Number of repos found: "}
			/>
		</div>
	);
}

const mapStateToProps = state => ({
	repoState: state.repoState
});

export default connect(mapStateToProps)(Home);
