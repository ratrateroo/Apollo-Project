const shortId = require('shortid');
const path = require('path');
//root directory __dirname
//file upload directory /public/images

const storeFileSystem = ({ stream, filename, mimetype }) => {
	const id = shortId.generate();

	const storedFileName = `${id}-${filename}`;
	const newurl = new URL(path.join(__dirname, './public/images'));
	console.log(newurl.href);
	console.log(new URL(path.join(__dirname, './public/images')).href);

	const storedFileUrl = path.join(
		__dirname,
		`./public/images/${storedFileName}`
	);

	console.log(storedFileUrl);

	//storedFileUrl - file upload directory + filename
};

module.exports = storeFileSystem;
