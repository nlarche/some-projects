/*
  We want to build a queueing system that allows us collect from the queue
  guaranteeing the order of insertion, with a FIFO criteria.
  
  ## Feature requirements
 
  - It needs to be possible to pick from the queue 1 only item at a time,
    as well as in batches.
  
  - Events added to the queue can have a priority of 1 (high) or 0 (low).
 
  - High priority events need to always be picked up first, maintaining
    the correct order among them.
   
  ## Interview objectives:
  - assess whether the code satisfies the above requirements
  - suggest improvements for readability, code style, performance optimisation (if you can find any)
 
  ## Tips
  - You can run this using Node.js
  - You can find some usage example at the bottom of this file
  - Remember to speak your thoughts as you go through
*/
 
 
class EventsQueue {
    constructor() {
      this.queue = [];
    }
     
    push(eventData, priority) {
      const event = {
        uid: Math.floor((1 + Math.random()) * 0x10000).toString(16),
        timestamp: new Date().getTime(),
        data: eventData,
        priority: priority === 1 ? 1 : 0,
      };
       
      this.queue.push(event);
    }
     
     
    pop(highPriorityFirst = true) {
      if (this.queue.length === 0) {
        return null;
      }
       
      const elementToPopIndex = this.queue.findIndex(
        (event) => event.priority === Number(highPriorityFirst));
       
      if (elementToPopIndex === -1) {
        return this.pop(false);
      }
       
      return this.queue.splice(elementToPopIndex, 1)[0];
    }
     
     
    popInBatch(length = 5) {
      const popped = [];
      while (popped.length < length) {
        const event = this.pop();
        if (event === null) {
          break;
        }
        popped.push(event);
      }
       
      return popped;
    }
  }
   
  const q1 = new EventsQueue();
   
  q1.push("standard event");
  q1.push("important event", 1);
  q1.push("another standard event");
  q1.push("another important event", 1);
   
  console.log(q1.pop());
  console.log(q1.pop());
  console.log(q1.pop());
  console.log(q1.pop());
  console.log(q1.pop());
   
  q1.push("standard event");
  q1.push("important event", 1);
  q1.push("another important event", 1);
  q1.push("another standard event");
   
  console.log(q1.popInBatch());