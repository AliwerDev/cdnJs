import {myCreatElement} from "./functions.js";
import {getLibrary} from "./api.js";


const renderOneLibrary = (library) => {
	console.log(library)
	libraryBox.innerHTML = "";
	const button = myCreatElement("button", {className: "beck", innerHTML: `<i class="fas fa-chevron-left"></i> Beck`}, libraryBox);
	button.addEventListener('click', () => {
		libraryBox.classList.add("d-none");
		libraryBox.innerHTML = "";
	})

	const libraryHeader = myCreatElement("div", {className: "library-header"}, libraryBox);
	const lName = myCreatElement("p", {className: "l-name", innerHTML: library.name}, libraryHeader);
	const lInfo = myCreatElement("p", {className: "info", innerHTML: library.description || ""}, libraryHeader);
	const lTags = myCreatElement("p", {className: "tags" }, libraryHeader);
	myCreatElement("span", {innerHTML: "Tags: "}, lTags);

	library.keywords.map(tag => {
		myCreatElement("span", {innerHTML: tag + ", "}, lTags)
	});

//	Versions
	const versions = myCreatElement("div", {className: "versions"}, libraryBox);
	const col1 = myCreatElement("div", {}, versions);
	myCreatElement("label", {for: "versions", innerHTML: "Version "}, col1);
	const versionsSelect = myCreatElement("select", {id: "versions"}, col1);

	library.versions.slice(-10).map(tag => {
		myCreatElement("option", {innerHTML: tag}, versionsSelect)
	});

//	Links

	const links = myCreatElement("div", {className: "links", }, libraryBox);

	library.assets[library.assets.length - 1].files.map(item => {
		const url = "https://cdnjs.cloudflare.com/ajax/libs/" + item;
		const link = myCreatElement("div", {className: "link"}, links)
		const input = myCreatElement("input", {readOnly: true, value: url}, link);
		const icons = myCreatElement("div", {className: "icons",}, link);

		const copyUrl = myCreatElement("i", {className: "fas fa-link"}, icons);

		copyUrl.addEventListener("click", (e) => {
			navigator.clipboard.writeText(url);
			e.target.className = "fas fa-check";
			setTimeout(() => {
				e.target.className = "fas fa-link";
			}, 1000)
		})

		const copyScript = myCreatElement("i", {className: "fas fa-code"}, icons);

		copyScript.addEventListener("click", (e) => {
			if(url.includes(".css")){
				navigator.clipboard.writeText(`<link href="${url}">`);
			}else if(url.includes(".js")){
				navigator.clipboard.writeText(`<script src="${url}""></script>`);
			}else{
				navigator.clipboard.writeText(` `);
			}
			e.target.className = "fas fa-check";
			setTimeout(() => {
				e.target.className = "fas fa-code";
			}, 1000)
		})
		const copySri = myCreatElement("i", {className: "fas fa-shield"}, icons);
	})

	libraryBox.classList.remove("d-none");

}

function renderLibrariesItem(data, library, father){
	const libraryItem = myCreatElement("div", {className: "library-item"}, father);
	const lHeader = myCreatElement("div", {className: "l-header"}, libraryItem);
	const lName = myCreatElement("p", {
		className: "l-name",
		innerHTML: `${data.name} @ <span>${library.version || "000"}</span>`
	}, lHeader);

	lName.addEventListener('click', () => {
		getLibrary(data.name ,renderOneLibrary);
	})

	const lCopies = myCreatElement("div", {className: "l-copies"},lHeader);
	myCreatElement("i", {className: "fas fa-link"}, lCopies).addEventListener("click", (e) => {
		navigator.clipboard.writeText(data.latest);
		e.target.className = "fas fa-check";
		setTimeout(() => {
			e.target.className = "fas fa-link";
		}, 1000)
	})
	myCreatElement("i", {className: "fas fa-code"}, lCopies).addEventListener("click", (e) => {
		navigator.clipboard.writeText(`<script src="${data.latest}"></script>`);
		e.target.className = "fas fa-check";
		setTimeout(() => {
			e.target.className = "fas fa-code";
		}, 1000)
	})

	const lInfo = myCreatElement("div", {className: "l-info"}, libraryItem);
	myCreatElement("p", {innerHTML: library.description}, lInfo);

	const lFooter = myCreatElement("div", {className: "l-footer"}, libraryItem);
	const tags = myCreatElement("p", {}, lFooter);
	myCreatElement("span", {innerHTML: "Tags: "}, tags);

	library.tags.map(tag => {
		myCreatElement("span", {innerHTML: tag + ", "}, tags)
	})
}

function renderLibraries(data) {
	const row = myCreatElement("div", {className: "row"}, myCreatElement("div", {className: "container py-4"}, librariesBox))

	data.map(item => {
		const col = myCreatElement("div", {className: "col-md-6"}, row);

		getLibrary(item.name, getLibraryVersion);

		function getLibraryVersion(element){
			const obj = {
				description: element.description,
				version: element.version,
				tags: element.keywords || [],
			}
			renderLibrariesItem(item, obj, col);
		}
	})
}

export { renderLibraries, renderOneLibrary };