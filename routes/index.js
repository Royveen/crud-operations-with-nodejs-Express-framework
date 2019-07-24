var express = require('express');
var router = express.Router();
var mongo = require('mongodb');


/* Fetch all Work Orders */
router.get('/work_orders', function(req, res, next) {
  var db = req.db;
  var workOrderCollection = db.get('workOrderCollection');

  workOrderCollection.find({}).then((data,err) => {
    if(err)
      return 'Error Encountered while fetching data'

    res.send(data);
  })
});


/* Create a Work Order */
router.post('/work_order', function(req, res, next) {
  var db = req.db;
  var workOrderDetailsBody = req.body;

  var workOrderCollection = db.get('workOrderCollection');

  workOrderCollection.insert(workOrderDetailsBody).then((workOrderData,err) => {
    if(err)
      return 'Error Encountered while removing worker data';

    res.send(workOrderData);
  })
});

/* Fetch all Workers */
router.get('/workers', function(req, res, next) {
  var db = req.db;
  var workerCollection = db.get('workerCollection');

  workerCollection.find({}).then((data,err) => {
    if(err)
      return 'Error Encountered while fetching data'

    res.send(data);
  })
});

/* create a Worker */
router.post('/worker', function(req, res, next) {
  var db = req.db;
  var workerDetailBody = req.body;
  var workerCollection = db.get('workerCollection');

  workerCollection.insert(workerDetailBody).then((workerData,err) => {
    if(err)
      return 'Error Encountered while inserting worker data';

    res.send({ message: "Worker inserted successfully", data: workerData});
  })
});

/* Delete a Worker */
router.delete('/worker/:id', function(req, res, next) {
  var db = req.db;
  var workerDetailId = req.param('id');
  var workerCollection = db.get('workerCollection');

  workerCollection.remove({_id: workerDetailId}).then((workerData,err) => {
    if(err)
      return 'Error Encountered while removing worker data';

    res.send({ message: "Worker Deleted successfully", data: workerData});
  })
});


/* Assign a worker to work order*/
router.patch('/work_order/:oid/worker/:wid', function(req, res, next) {
  var db = req.db;
  var workerDetailId = req.param('wid');
  var workOrderDetailId = req.param('oid');
  var workOrderCollection = db.get('workOrderCollection');

  workOrderCollection.find({_id: workOrderDetailId}).then((workOrderData,err) => {
    if(err)
      return 'Error Encountered while fetching work order data';

    if(workOrderData.workers && workOrderData.workers.length > 5) {
      return 'Work order already has max 5 workers, Worker limit cannot exceed 5 workers.';
    }else if(workOrderData.workers && workOrderData.workers.indexOf(workerDetailId) > -1) { 
      return 'Worker already assigned to specified work order';
    }else{

      workOrderCollection.update({_id: workOrderDetailId},{$push:{"workers" : workerDetailId}}).then((updateResponse,err)=> {
        if(err)
          return 'Error Encountered while updating record';

        res.send({ message: "Worker assigned successfully", data: updateResponse});
      })
      
    
    }
  })
});


/* Fetching worker orders for a specific worker with sorting order descending*/
router.get('/work_order/worker/:wid', function(req, res, next) {
  var db = req.db;
  var workerDetailId = req.param('wid');
  var workOrderCollection = db.get('workOrderCollection');

  workOrderCollection.find({'workers': workerDetailId },{sort: {deadline: -1}}).then((workOrderData,err) => {
    if(err)
      return 'Error Encountered while fetching work order data';

      res.send({ message: "Work order fetched successfully", data: workOrderData})
  });
})



module.exports = router;
