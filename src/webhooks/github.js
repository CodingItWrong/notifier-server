const handleIncoming = require('../handleIncoming');

const actionsToNotify = [
  // PRs
  'opened',
  'closed',
  'reopened',

  // check runs
  'created',
  'completed',
  'rerequested',
];

const webhookRoute = (req, res) => {
  console.log(JSON.stringify(req.body));

  const {
    repository: { name: repoName },
    action,
    pull_request,
    check_run,
  } = req.body;

  let message;
  if (pull_request) {
    const { title, html_url: url } = pull_request;
    message = {
      text: `${repoName} PR ${action}: ${title}`,
      url,
    };
  } else if (check_run) {
    const { name, conclusion, url } = check_run;
    message = {
      text: `${repoName} Check ${name}: ${conclusion || action}`,
      url,
    };
  }

  console.log(message);

  if (!actionsToNotify.includes(action)) {
    console.log(`${action} not included in ${actionsToNotify}; skipping`);
    res.end('Received ' + JSON.stringify(message));
    return;
  }

  handleIncoming(message)
    .then(() => {
      res.end('Received ' + JSON.stringify(message));
    })
    .catch(e => {
      console.error(e);
      res.status(500);
      res.end(e.message);
    });
};

module.exports = webhookRoute;
