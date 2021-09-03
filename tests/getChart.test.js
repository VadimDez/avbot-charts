const fs = require('fs');
const getChart = require('../app/getChart');

const playbooks_dir = `${process.cwd()}/playbooks`;
const uriRegEx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

jest.setTimeout(60000);

async function getChartWrapper(country, icao) {
  const _playbook = fs.readFileSync(`${playbooks_dir}/${country}.json`, 'utf8');
  const playbook = JSON.parse(_playbook);
  return await getChart(playbook, icao);
}

describe('IN', () => {
  test('Found', async () => {
    expect(await getChartWrapper('IN', 'VABB')).toMatch(uriRegEx);
  });

  test('Not Found', async () => {
    expect(await getChartWrapper('IN', 'IN-0030')).toMatch('error');
  });
});

describe('US', () => {
  test('Found', async () => {
    expect(await getChartWrapper('US', 'KJFK')).toMatch(uriRegEx);
  });

  // test('Not Found', async () => {
  //   expect(await getChartWrapper('US', '00AZ')).toMatch('error');
  // });
});
