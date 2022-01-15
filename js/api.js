const getLibrary = (library, callback) => {
	axios.get(`https://api.cdnjs.com/libraries/${library}`)
		.then(response => {
			callback(response.data)
		})
		.catch(err => {
			callback(err)
		})
}

const getLibraries = (n, callback) => {
	axios.get(`https://api.cdnjs.com/libraries/?limit=${n}`)
		.then(response => {
			callback(response.data.results)
		})
		.catch(err => {
			console.log(err)
		})
}

const searchLibrary = (library, callback) => {
	axios.get(`https://api.cdnjs.com/libraries?&search=${library}`)
		.then(response => {
			callback(response.data.results)
		})
		.catch(err => {
			console.log(err)
		})
}

export { getLibrary, getLibraries, searchLibrary }

