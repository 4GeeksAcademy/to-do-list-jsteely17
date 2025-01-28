import React, {useState} from "react";
import AddTask from "./AddTask";

//create your first component
const Home = () => {
	const [header, setHeader] = useState("Hello")
	return (
		<div className="text-center">
			<h1 className="text-center mt-5">ToDo List</h1>
			<input type="text" onChange={e => setHeader(e.target.value)} value={header} >
			</input>
			<button onClick="{addTask}">Add</button>
		</div>
	);
};

export default Home;