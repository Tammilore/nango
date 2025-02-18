import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities.js';
import type { ContinuousSyncArgs, InitialSyncArgs } from './models/Worker';

const DEFAULT_TIMEOUT = '90 minutes';

const { routeSync, scheduleAndRouteSync } = proxyActivities<typeof activities>({
    startToCloseTimeout: DEFAULT_TIMEOUT,
    scheduleToCloseTimeout: DEFAULT_TIMEOUT,
    retry: {
        initialInterval: '5m',
        maximumAttempts: 3
    }
});

export async function initialSync(args: InitialSyncArgs): Promise<boolean | object> {
    return routeSync(args);
}

export async function continuousSync(args: ContinuousSyncArgs): Promise<boolean | object> {
    return scheduleAndRouteSync(args);
}
