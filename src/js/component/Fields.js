import React from "react";
import Proptypes from "prop-types";

let API = "https://assets.breatheco.de/apis/fake/todos/user/nyarbouh";

export default class Fields extends React.Component {
	constructor() {
		super();
		this.state = {
			anInput: "",
			list: [""]
		};
	}
	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/nyarbouh")
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					console.log("Bad response");
				}
			})
			.then(data => {
				this.setState({ list: data });
			})
			.catch(error => console.log(error));
	}
	deleteElement = sky => {
		let temp = this.state.list;
		temp.splice(sky, 1);
		this.setState({ list: temp });
	};

	render() {
		let arr = this.state.list.map((blue, index) => {
			return (
				<li key={index}>
					<i
						className="far fa-trash-alt"
						onClick={() => this.deleteElement(index)}
					/>
					{blue.label}
				</li>
			);
		});

		return (
			<div className="fields">
				<input
					placeholder="Enter task"
					onChange={e => this.setState({ anInput: e.target.value })}
					onKeyUp={e =>
						e.keyCode == 13
							? this.setState({
									list: this.state.list.concat(
										this.state.anInput
									)
							  })
							: null
					}
				/>
				<div className="list-group">
					<ul className="listinside">{arr}</ul>
					<div className="footer">
						You have&nbsp;
						{this.state.list.length}
						&nbsp;tasks to get done
					</div>
				</div>
			</div>
		);
	}
}
