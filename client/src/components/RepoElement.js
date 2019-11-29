import React, { Component } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { postOne, deleteOne } from "../redux/actions";

export class RepoElement extends Component {
	constructor() {
		super();
		this.state = {
			bookmark: false
		};
	}

	componentDidMount = () => {
		const check = this.checkBookmark();
		if (!check) {
			this.setState({ bookmark: true });
		}
	};

	checkBookmark = () => {
		const arr = this.props.bookmarkState;
		return arr.every(item => item.id !== this.props.repo.id);
	};

	bookmarkActionAdd = () => {
		this.props.postOne("/bookmarks", this.props.repo);
		this.setState({
			bookmark: true
		});
	};

	bookmarkActionRemove = () => {
		const id = this.props.repo.id;
		const url = `/bookmarks/${id}`;
		this.props.deleteOne(url, id);
		this.setState({
			bookmark: false
		});
	};

	render() {
		let bookmark;
		if (this.state.bookmark) {
			bookmark = (
				<FontAwesomeIcon
					className="icon_bookmark active"
					icon={faBookmarkSolid}
					onClick={this.bookmarkActionRemove}
				/>
			);
		} else {
			bookmark = (
				<FontAwesomeIcon
					className="icon_bookmark inactive"
					icon={faBookmark}
					onClick={this.bookmarkActionAdd}
				/>
			);
		}

		const transformDate = date => {
			const year = date.substr(0, 4);
			const month = date.substr(5, 2);
			const day = date.substr(8, 2);

			return `${day}.${month}.${year}`;
		};
		return (
			<div className="cont_repoElement">
				<div>{bookmark}</div>
				<div className="cont_repoContent">
					<div className="cont_repoName">
						<p className="content_repoName">{this.props.repo.full_name}</p>
					</div>
					<div className="cont_row content_repoSubline">
						<div>
							<p className="content_repoDate">
								Last update on {transformDate(this.props.repo.updated_at)}
							</p>
						</div>
						<div className="cont_row">
							<FontAwesomeIcon className="icon_star" icon={faStar} />
							<p>{this.props.repo.stargazers_count}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// export default RepoElement;
const mapStateToProps = state => ({
	bookmarkState: state.bookmarkState
});

const mapDispatchToProps = {
	postOne: postOne,
	deleteOne: deleteOne
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoElement);