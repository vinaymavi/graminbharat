# Basic commands
* Deploy `firebase deploy --only functions`

# Local development 
Run command `nvm use --delete-prefix v8.12.0 --silent` to test node version.


#Firebase export query 
query = `gcloud beta firestore export gs://prod-graminbharat.appspot.com/firestorebackup1 --collection-ids='rows'`

# Application Flow
## Scrapping metadata with firebase cloud funciton
We are scrapping data with firebase cloud function trigger event, we are document in a collection and loop got started.

#### Meta data
data that needed to scrap a vaillage record.

## Import data from Firease firestore to big query
    we import data from firebase firestore to big query 
    command `gcloud beta firestore export gs://prod-graminbharat.appspot.com/firestorebackup1 --collection-ids='<collection_name>'`


## Read Data from Biq Query and push to task queue
