const myCreatElement = (elementName, attrs = {}, father) => {
	const element = document.createElement(elementName);

	for (const attrsKey in attrs) {
		element[attrsKey] = attrs[attrsKey];
	}

	father && father.append(element);

	return element;
}

export {myCreatElement}