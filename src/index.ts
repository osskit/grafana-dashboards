import got from 'got';
import fs from 'fs';

(async () => {
    const type = process.env.TYPE?.toLowerCase();
    const host = process.env.GRAFANA_HOST;
    const token = process.env.GRAFANA_DASHBOARD_TOKEN;

    if (!type || !host || !token) {
        throw new Error('missing one of the env vars: host, token, or dashboard type');
    }

    const dashboardFile = `${type === 'worker' ? 'worker' : 'api'}.json`;
    const dashboard = JSON.parse(fs.readFileSync(`./dashboards/${dashboardFile}`, 'utf-8'));

    await got(host, {method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        json: dashboard
    });
})();
