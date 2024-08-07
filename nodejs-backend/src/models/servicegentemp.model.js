
    module.exports = function (app) {
        const modelName = 'servicegentemp';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            templateLocalFile: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
destFolder: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
destFilename: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
customrelationship: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };