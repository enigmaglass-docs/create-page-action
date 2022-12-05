const core = require('@actions/core');
const axios = require('axios');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const name = core.getInput('name');
    const org = core.getInput('org');
    const accessToken = core.getInput('access-token');

    const endpoint = org ? `/repos/${org}/${name}/pages` : `/user/${name}/pages`

    axios.post(
      'https://api.github.com' + endpoint,
      {
        source: {
          branch: "main"
        }
      },
      {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      }
    ).then((response) => {
      core.info('Page created: ' + response.data.html_url);
      //core.setOutput('id', repository.data.node_id);
    }).catch((error) => {
      core.info('Page already exists...');
      // core.setFailed(error.message);
      // core.setOutput('id', null);
    })
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
