const azureStorage = require('azure-storage');

const writeBlobStorage = async function (context, req) {
  // Azure Blob Service
  const blobService = azure.createBlobService();
  
  // Azure Container and name of Blob to write
  const containerName = 'azterwatblogwpentries2';
  const date = new Date.today();
  const blobName = `wpentries + ${date.toString()}`;

  // Check the number of blobs in the container
  const result = await blobService.listBlobsSegmented(containerName, null, (err, result) => {
    if (err) {
      context.log('Error:', err);
      context.res = {
        status: 500,
        body: 'Error listing blobs'
      };
    } else {
      return result;
    }
  });
  
  // Check if the number of blobs is 5 or more
  if (result.entries.length >= 5) {
    // Overwrite the existing entry
    await blobService.createBlockBlobFromText(containerName, blobName, JSON.stringify(data), (err, result) => {
      if (err) {
        context.log('Error:', err);
        context.res = {
          status: 500,
          body: 'Error overwriting data to blob'
        };
      } else {
        context.log('Data overwritten to blob');
        context.res = {
          status: 200,
          body: 'Data overwritten to blob'
        };
      }
    });
  } else {
    // If <5, write the data to the blob
    await blobService.createBlockBlobFromText(containerName, blobName, JSON.stringify(data), (err, result) => {
      if (err) {
        context.log('Error:', err);
        context.res = {
            status: 500,
            body: 'Error writing data to blob'
        };
      } else {
        context.log('Data written to blob');
        context.res = {
            status: 200,
            body: 'Data written to blob'
        };
      }
    });
  }
};

modules.exports = writeBlobStorage;