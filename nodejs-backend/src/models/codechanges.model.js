
    module.exports = function (app) {
        const modelName = 'codechanges';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            editor: { type: Schema.Types.ObjectId, ref: "appgentemp" },
location: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
filename: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
templateLocalFile: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },

            
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