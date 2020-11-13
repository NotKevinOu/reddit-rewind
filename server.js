/*
	TODO:
	- Start time
	- Pause button
	- HTML/CSS
*/

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

var waitTime = 0;

const eze = 'jpsm1a'
const england = 'jt21oz'

reddit.getSubmission(eze).expandReplies().then(com => {
	sortComments(com.comments)
})

function sortComments(comments) {
	comments.sort((a, b) => (a.created_utc - b.created_utc))
	for (var i = 0; i < comments.length; i++) {
		displayComment(comments, i)
	}
}

function displayComment(comments, i) {
	if (i > 0 && i != comments.length) {
		waitTime += (comments[i].created_utc - comments[i - 1].created_utc) * 1000
		setTimeout(function () {
			printComment(comments, i);
		}, waitTime)
	} else {
		printComment(comments, i);
	}
}

function displayReply(comment, replies, i) {
	var waitReplyTime = 0;
	if (i != replies.length) {
		waitReplyTime += (replies[i].created_utc - comment.created_utc) * 1000 
		setTimeout(function () {
			printComment(replies, i);
		}, waitReplyTime)
	} else {
		printComment(replies, i);
	}
}

async function printComment(comments, i) {
	if (comments[i].body != '[deleted]') {
		const date = new Date(comments[i].created_utc * 1000)
		// prints user flair if available 
		if (comments[i].author_flair_text == null) {
			console.log(`${comments[i].author.name} | ${date}`)

		} else {
			console.log(`${comments[i].author.name} [${comments[i].author_flair_text}] | ${date}`)
		}
		console.log()
		console.log(comments[i].body)

		if (comments[i].parent_id.substring(0, 2) == "t1") {
			// if comment is a reply to another comment
			console.log()
			console.log(`     ====================`)
			console.log()
			console.log("     REPLYING TO:")
			await reddit.getComment(comments[i].parent_id).fetch().then(parent => {
				const date = new Date(parent.created_utc * 1000)
				if (parent.author_flair_text == null) {
					console.log(`${parent.author.name} | ${date}`)

				} else {
					console.log(`${parent.author.name} [${parent.author_flair_text}] | ${date}`)
				}
				console.log()
				console.log(`${parent.body}`)
				console.log()
				console.log(`     ====================`)
			})
		}
		console.log()
		console.log(`==========================================`)
		console.log()

		// process all replies to the comment, if any
		if (comments[i].replies.length > 0) {
			for (var j = 0; j < comments[i].replies.length; j++) {
				displayReply(comments[i], comments[i].replies, j)
			}
		}
	}
}

