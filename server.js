const http = require('http');
var snoowrap = require('snoowrap');

const hostname = '127.0.0.1';
const port = 3000;

const reddit = new snoowrap({
	userAgent: 'Reddit Rewind',
	clientId: 'H7q-VgszU43xdw',
	clientSecret: '5yC84krS2y03k9KEtKsgThDe7vIaQA',
	refreshToken: '14546719-MzirzYqb_MJuYLgJGrvVuDMcTPDg9A'
});

var array = [];

reddit.getSubmission('jpsm1a').expandReplies().then(com => {
	sortComments(com.comments)
})

function sortComments(comments) {
	comments.sort((a, b) => (a.created_utc - b.created_utc))
	comments.forEach(com => {
		console.log(com.body)
	});
}

