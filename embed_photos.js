const getImages = (response) => {
	const { items } = response;
	let container = document.querySelector('#project-contain');

	if (items) {
		const images = items.reduce((images, item) => {
			images = images.concat(item['images']);
			return images;
		}, []);

		container.innerHTML = `
			<div class="all-projects-wrapper">
				${images.map(({ url, alt }) => (`
						<div class="single-project-wrapper">
							<img src="${url}" alt="${alt}"></img>
						</div>
					`)).join('')}
			</div>`

		}
	return container;
}

const handleError = error => {
	console.error(error);
};

const fetchEmbed = () => {
	window.fetch('http://localhost:3000/api/projects')
	.then(response => response.json())
	.then(getImages)
	.catch(handleError);
};

fetchEmbed();
