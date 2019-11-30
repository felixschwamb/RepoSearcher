import React, { Component } from "react";
import { connect } from "react-redux";

import InputMessage from "./InputMessage";

import { fetchData, clearSearch } from "../redux/actions";

export class SearchInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: "",
			inputError: false
		};
	}

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
			inputError: false
		});
	};

	clearSearch = () => {
		this.setState({
			search: ""
		});
	};

	validateInput = () => {
		if (!this.state.search) {
			this.setState({
				inputError: true
			});
			return false;
		} else {
			return true;
		}
	};

	sendSearch = e => {
		e.preventDefault();

		this.props.clearSearch();

		const check = this.validateInput();
		if (check) {
			const url = "/api/repositories/" + this.state.search;

			this.props.fetchData(url, "repo");

			this.setState({
				inputError: false
			});
		}
	};

	information = message => {
		let msg = <InputMessage message={message} />;
		return msg;
	};

	render() {
		let infoMessage;
		if (this.state.inputError) {
			infoMessage = this.information("Please enter a repo name");
		} else if (this.props.loading) {
			infoMessage = this.information("Loading...");
		} else if (this.props.loadingError) {
			infoMessage = this.information("Error, please try again");
		}

		return (
			<div id="searchInput" className="cont_column">
				<div className="cont_searchInput_content cont_column">
					<input
						type="text"
						name="search"
						placeholder="Enter repo name"
						value={this.state.search}
						onChange={this.onChange}
						onFocus={this.clearSearch}
					></input>
				</div>
				<div className="cont_searchInput_content cont_column">
					<button onClick={this.sendSearch}>Search</button>
				</div>
				{infoMessage}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loadingError: state.errorState,
	loading: state.loadingState,
	repoState: state.repoState
});

const mapDispatchToProps = {
	fetchData: fetchData,
	clearSearch: clearSearch
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
