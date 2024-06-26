import createPushNotificationsJobs from "./8-job.js";
import Sinon from "sinon";
import { expect } from "chai";
import { createQueue } from "kue";


describe('createPushNotificationsJobs', () => {
    const queue = createQueue({name: 'push_notification_code_3_test'});
    const spy = Sinon.spy(console);

    before(() => {
        queue.testMode.enter(true)
    });

    after(() => {
        queue.testMode.clear()
        queue.testMode.exit();
    });

    afterEach(() => {
        spy.log.resetHistory();
    });

    it('should be a function', () => {
        expect(createPushNotificationsJobs).to.be.a('function');
    });

    it('should create jobs', () => {
        const data = [
            {
                phoneNumber: '4153518780',
                message: 'This is the code 1234 to verify your account'
            },
            {
                phoneNumber: '4153518781',
                message: 'This is the code 4562 to verify your account'
            }
        ];
        createPushNotificationsJobs(data, queue);
        expect(spy.log.args[0][0]).to.equal('Notification job created 1');
        expect(spy.log.args[1][0]).to.equal('Notification job created 2');
    });

    it('should not create jobs', () => {
        const data = [];
        createPushNotificationsJobs(data, queue);
        expect(spy.log.args[0][0]).to.equal('Jobs is not an array');
    })

    it('should not create jobs', () => {
        const data = 'test';
        createPushNotificationsJobs(data, queue);
        expect(spy.log.args[0][0]).to.equal('Jobs is not an array');
    })

    it('should not create jobs', () => {
        const data = null;
        createPushNotificationsJobs(data, queue);
        expect(spy.log.args[0][0]).to.equal('Jobs is not an array');
    })
    
})