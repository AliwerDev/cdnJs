import {renderLibraries, renderOneLibrary} from "./renders.js";
import {getLibraries, getLibrary, searchLibrary} from "./api.js";
import {myCreatElement} from "./functions.js";

function searchLibraryMin (value) {
	searchLibrary(value, renderSearchResult);
}

function renderSearchResult(data){
	console.log(data)
	inputResultBox.innerHTML = "";
	data.slice(0, 5).map(item => {
		const p = myCreatElement("p", {className: "item", innerHTML: item.name}, inputResultBox);
		p.addEventListener('click', () => {
			getLibrary(item.name, renderOneLibrary)
		})
	})
}

searchBox.addEventListener("submit", (e) => {
	e.preventDefault();
	console.log("ddd")
	searchLibraryMin(searchBox.searchedRes.value);
})
searchBox.addEventListener("keyup", (e) => {
	e.preventDefault();

	console.log("dddd")
	searchLibraryMin(searchBox.searchedRes.value);
})

getLibraries(20, renderLibraries);