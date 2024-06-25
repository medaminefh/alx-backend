// Import Kue
import kue from "kue"

// Create a queue
const queue = kue.createQueue({name:"push_notification_code"});

const job = queue.create('push_notification_code', {
    phoneNumber: '45454780',
    message: 'Hello world'
})

job.on('enqueue', ()=>
  console.log('Notification job added to the queue')
)
.on('complete', ()=>
  console.log('Notification job completed')
)
.on('failed attempt', ()=>
  console.log('Notification job failed'))

job.save()