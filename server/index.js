const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hjcgy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// declare the jobsCollection here to use it after connection
let jobsCollection;
let jobApplicationCollection;;

async function run() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('jobPortal');
    jobsCollection = db.collection('job');
    jobApplicationCollection = db.collection('job_applications');


    // only define routes after connection is established
    app.get('/job', async (req, res) => {
      try {
        const email = req.query.email;
        let query = {};
        if (email) {
          query = { hr_email: email }
        }
        const jobs = await jobsCollection.find(query).toArray();
        res.send(jobs);
      } catch (err) {
        console.error('❌ Failed to fetch jobs:', err);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });

    // for apply
    app.get('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await jobsCollection.findOne(query);
      res.send(result);
    })

    // job application APIS
    app.post('/job-applications', async (req, res) => {
      const application = req.body;
      const result = await jobApplicationCollection.insertOne(application);

      // Not the best way (use aggregate)

      const id = application.job_id
      const query = { _id: new ObjectId(id) }
      const job = await jobsCollection.findOne(query);
      let newCount = 0;
      if (job.applicationCount) {
        newCount = job.applicationCount + 1;
      }
      else {
        newCount = 1;
      }

      // now update the job info
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          applicationCount: newCount
        }
      }
      const updateResult = await jobsCollection.updateOne(filter, updatedDoc);

      res.send(result);

    })

    app.get('/job-application', async (req, res) => {
      const email = req.query.email;

      try {
    
        const applications = await jobApplicationCollection.find({ applicant_email: email }).toArray();

     
        const jobIds = applications.map(app => new ObjectId(app.job_id));

       
        const jobs = await jobsCollection.find({ _id: { $in: jobIds } }).toArray();

       
        const result = applications.map(app => {
          const jobInfo = jobs.find(job => job._id.toString() === app.job_id.toString());
          return {
            ...app,
            job_info: jobInfo || {} 
          };
        });

        res.send(result);
      } catch (error) {
        console.error("Error fetching job applications:", error);
        res.status(500).send({ message: "Failed to fetch applications" });
      }
    });

    // get a specific job application by id
    app.get('/job-application/jobs/:job_id',async(req,res)=>{
      const jobId = req.params.job_id;
      const query = { job_id:jobId } 
      const result = await jobApplicationCollection.find(query).toArray();
      res.send(result)

    })

    app.patch('/job-application/:id', async(req,res)=>{
      const id =req.params.id;
      const data = req.body;
      const filter={_id: new ObjectId(id)};
      const updatedDoc = {

        $set:{
          status:data.status
        }
      }
      const result = await jobApplicationCollection.updateOne(filter,updatedDoc);
      res.send(result)
    })

    // job create
    app.post('/jobs', async (req, res) => {
      const newJob = req.body;
      const result = await jobsCollection.insertOne(newJob);
      res.send(result);
    })

    app.get('/', (req, res) => {
      res.send('Job is falling from the sky');
    });

    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
}

run();
