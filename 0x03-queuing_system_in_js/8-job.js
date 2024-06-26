function createPushNotificationsJobs(jobs, queue) {
    if(!Array.isArray(jobs) || jobs.length === 0) throw new Error('Jobs is not an array');
    jobs.forEach((data) => {
        const job = queue
            .create('push_notification_code_3', data);
        job.on('enqueue', () => {
            console.log('Notification job created', job.id);
        })
        .on('complete', () => {
            console.log('Notification job', '#'+job.id, 'completed');
        })
        .on('failed', (err) => {
            console.log('Notification job', '#'+job.id, 'failed', err.message || err);
        })
        .on('progress', (progress, _) => {
            console.log('Notification job', '#'+job.id, progress+'%', 'complete');
        })
        .save();
    })
}


export default createPushNotificationsJobs