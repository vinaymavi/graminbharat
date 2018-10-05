# Basic commands 
* Deploy `firebase deploy --only functions`

# Local development 
Run command `nvm use --delete-prefix v8.12.0 --silent` to test node version.


#Firebase export query 
query = `gcloud beta firestore export gs://prod-graminbharat.appspot.com/firestorebackup1 --collection-ids='rows'`