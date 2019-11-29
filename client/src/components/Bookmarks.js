import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchData } from "../redux/actions";

import Header from "./Header";
import RepoList from "./RepoList";

export class Bookmarks extends Component {
	componentDidMount = () => {
		const total_count = this.props.bookmarkState.length;
		if (total_count === 0) {
			const url = "/bookmarks/";
			this.props.fetchData(url, "bookmark");
		}
	};

	render() {
		const items = this.props.bookmarkState;
		const total_count = items.length;

		return (
			<React.Fragment>
				<Header />
				<RepoList
					items={items}
					num={total_count}
					numHeader={"Number of bookmarks: "}
				/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	bookmarkState: state.bookmarkState
});

const mapDispatchToProps = {
	fetchData: fetchData
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
